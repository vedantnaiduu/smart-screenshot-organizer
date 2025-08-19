import { PrismaClient, Screenshot, Tag, OcrContent } from '@prisma/client';
import { ScreenshotQuery, ScreenshotResponse } from '../schemas/screenshot.js';
import { isLikelyScreenshot } from '../utils/screenshotDetection.js';
import { generateThumbnail, getImageMetadata } from './image.js';
import { runOcrMock } from './ocr.js';

const prisma = new PrismaClient();

export interface ScreenshotWithRelations extends Screenshot {
  tags: Array<{
    id: string;
    name: string;
    color: string | null;
  }>;
  ocr: OcrContent | null;
}

export interface CreateScreenshotData {
  originalFilePath: string;
  userId: string;
  fileName: string;
  fileSize: number;
  width?: number;
  height?: number;
  takenAt?: Date;
  deviceType?: string;
  sourceApp?: string;
  metadata?: Record<string, any>;
}

export interface ScreenshotFilters {
  q?: string;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  limit?: number;
  offset?: number;
  sortBy?: 'createdAt' | 'takenAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export class ScreenshotService {
  /**
   * Create a new screenshot record
   */
  static async createScreenshot(data: CreateScreenshotData): Promise<Screenshot> {
    const { fileName, width, height, ...screenshotData } = data;
    
    // Detect if this is likely a screenshot
    const detection = isLikelyScreenshot({ 
      fileName, 
      width, 
      height 
    });
    
    // Generate thumbnail
    const thumbnailUrl = await generateThumbnail(data.originalFilePath);
    
    // Create screenshot record
    const screenshot = await prisma.screenshot.create({
      data: {
        ...screenshotData,
        thumbnailUrl,
        width: width || 1920, // Default fallback
        height: height || 1080, // Default fallback
        metadata: {
          ...screenshotData.metadata,
          isScreenshot: detection.isScreenshot,
          detectionConfidence: detection.confidence,
          detectionReasons: detection.reasons,
          fileName,
          aspectRatio: width && height ? width / height : null
        }
      }
    });

    return screenshot;
  }

  /**
   * Get screenshots with filtering and pagination
   */
  static async listScreenshots(filters: ScreenshotFilters): Promise<{
    screenshots: ScreenshotWithRelations[];
    total: number;
    hasMore: boolean;
  }> {
    const { q, tags, dateFrom, dateTo, limit = 20, offset = 0, sortBy = 'createdAt', sortOrder = 'desc' } = filters;

    // Build where conditions
    const where: any = {
      isDeleted: false
    };

    // Text search in OCR content
    if (q) {
      where.OR = [
        {
          ocr: {
            extractedText: {
              contains: q,
              mode: 'insensitive'
            }
          }
        }
      ];
    }

    // Tag filtering
    if (tags && tags.length > 0) {
      where.tags = {
        some: {
          tagId: {
            in: tags
          }
        }
      };
    }

    // Date range filtering
    if (dateFrom || dateTo) {
      where.OR = [
        { takenAt: {} },
        { createdAt: {} }
      ];
      
      if (dateFrom) {
        where.OR[0].takenAt.gte = dateFrom;
        where.OR[1].createdAt.gte = dateFrom;
      }
      
      if (dateTo) {
        where.OR[0].takenAt.lte = dateTo;
        where.OR[1].createdAt.lte = dateTo;
      }
    }

    // Get total count
    const total = await prisma.screenshot.count({ where });

    // Get screenshots with relations
    const screenshots = await prisma.screenshot.findMany({
      where,
      include: {
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                color: true
              }
            }
          }
        },
        ocr: true
      },
      orderBy: {
        [sortBy]: sortOrder
      },
      take: limit,
      skip: offset
    });

    // Transform the data to match our response schema
    const transformedScreenshots: ScreenshotWithRelations[] = screenshots.map(screenshot => ({
      ...screenshot,
      tags: screenshot.tags.map(st => st.tag),
      ocr: screenshot.ocr
    }));

    return {
      screenshots: transformedScreenshots,
      total,
      hasMore: offset + limit < total
    };
  }

  /**
   * Get a single screenshot by ID
   */
  static async getScreenshotById(id: string): Promise<ScreenshotWithRelations | null> {
    const screenshot = await prisma.screenshot.findFirst({
      where: {
        id,
        isDeleted: false
      },
      include: {
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                color: true
              }
            }
          }
        },
        ocr: true
      }
    });

    if (!screenshot) return null;

    return {
      ...screenshot,
      tags: screenshot.tags.map(st => st.tag),
      ocr: screenshot.ocr
    };
  }

  /**
   * Attach tags to a screenshot
   */
  static async attachTags(screenshotId: string, tagIds: string[]): Promise<void> {
    // Verify screenshot exists
    const screenshot = await prisma.screenshot.findFirst({
      where: { id: screenshotId, isDeleted: false }
    });
    
    if (!screenshot) {
      throw new Error('Screenshot not found');
    }

    // Create tag relationships
    const tagRelations = tagIds.map(tagId => ({
      screenshotId,
      tagId,
      createdAt: new Date()
    }));

    await prisma.screenshotTag.createMany({
      data: tagRelations,
      skipDuplicates: true
    });
  }

  /**
   * Remove a tag from a screenshot
   */
  static async removeTag(screenshotId: string, tagId: string): Promise<void> {
    await prisma.screenshotTag.delete({
      where: {
        screenshotId_tagId: {
          screenshotId,
          tagId
        }
      }
    });
  }

  /**
   * Trigger OCR processing for a screenshot
   */
  static async triggerOcr(screenshotId: string, force: boolean = false): Promise<OcrContent> {
    // Check if OCR already exists and force is false
    if (!force) {
      const existingOcr = await prisma.ocrContent.findUnique({
        where: { screenshotId }
      });
      
      if (existingOcr) {
        return existingOcr;
      }
    }

    // Get screenshot file path
    const screenshot = await prisma.screenshot.findUnique({
      where: { id: screenshotId }
    });

    if (!screenshot) {
      throw new Error('Screenshot not found');
    }

    // Run OCR (mock for MVP)
    const ocrResult = await runOcrMock(screenshot.originalFilePath);

    // Store OCR result
    const ocrContent = await prisma.ocrContent.upsert({
      where: { screenshotId },
      update: {
        extractedText: ocrResult.text,
        confidenceScore: ocrResult.confidence,
        processedAt: new Date()
      },
      create: {
        screenshotId,
        extractedText: ocrResult.text,
        confidenceScore: ocrResult.confidence,
        processedAt: new Date()
      }
    });

    // Update screenshot as AI processed
    await prisma.screenshot.update({
      where: { id: screenshotId },
      data: { aiProcessed: true }
    });

    return ocrContent;
  }

  /**
   * Delete a screenshot (soft delete)
   */
  static async deleteScreenshot(id: string): Promise<void> {
    await prisma.screenshot.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      }
    });
  }
}
