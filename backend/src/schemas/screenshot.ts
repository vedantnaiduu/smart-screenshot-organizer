import { z } from 'zod';

// Screenshot upload schema
export const ScreenshotUploadSchema = z.object({
  // For multipart file upload
  file: z.any().optional(),
  
  // For URL-based upload
  url: z.string().url().optional(),
  
  // Optional metadata
  takenAt: z.string().datetime().optional(),
  deviceType: z.string().optional(),
  sourceApp: z.string().optional(),
  
  // User ID (will come from auth token)
  userId: z.string().uuid().optional()
}).refine(
  (data) => data.file || data.url,
  {
    message: "Either file or url must be provided",
    path: ["file", "url"]
  }
);

// Screenshot update schema
export const ScreenshotUpdateSchema = z.object({
  takenAt: z.string().datetime().optional(),
  deviceType: z.string().optional(),
  sourceApp: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

// Screenshot query filters
export const ScreenshotQuerySchema = z.object({
  q: z.string().optional(), // Search query
  tags: z.string().optional(), // Comma-separated tag IDs
  date_from: z.string().datetime().optional(),
  date_to: z.string().datetime().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sort_by: z.enum(['createdAt', 'takenAt', 'updatedAt']).default('createdAt'),
  sort_order: z.enum(['asc', 'desc']).default('desc')
});

// OCR trigger schema
export const OcrTriggerSchema = z.object({
  screenshotId: z.string().uuid(),
  force: z.boolean().default(false) // Force re-processing
});

// Tag attachment schema
export const TagAttachmentSchema = z.object({
  screenshotId: z.string().uuid(),
  tagIds: z.array(z.string().uuid()).min(1)
});

// Tag removal schema
export const TagRemovalSchema = z.object({
  screenshotId: z.string().uuid(),
  tagId: z.string().uuid()
});

// Tag creation schema
export const TagCreateSchema = z.object({
  name: z.string().min(1).max(50),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  isSystemTag: z.boolean().default(false)
});

// Tag update schema
export const TagUpdateSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional()
});

// Response schemas
export const ScreenshotResponseSchema = z.object({
  id: z.string().uuid(),
  originalFilePath: z.string(),
  thumbnailUrl: z.string().optional(),
  fullSizeUrl: z.string().optional(),
  fileSize: z.number(),
  width: z.number(),
  height: z.number(),
  createdAt: z.string().datetime(),
  takenAt: z.string().datetime().optional(),
  deviceType: z.string().optional(),
  sourceApp: z.string().optional(),
  aiProcessed: z.boolean(),
  isDeleted: z.boolean(),
  metadata: z.record(z.any()).optional(),
  tags: z.array(z.object({
    id: z.string().uuid(),
    name: z.string(),
    color: z.string().optional()
  })),
  ocr: z.object({
    extractedText: z.string().optional(),
    confidenceScore: z.number().optional(),
    processedAt: z.string().datetime()
  }).optional()
});

export const ScreenshotListResponseSchema = z.object({
  ok: z.boolean(),
  data: z.array(ScreenshotResponseSchema),
  pagination: z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    hasMore: z.boolean()
  })
});

export const TagResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().optional(),
  isSystemTag: z.boolean(),
  createdAt: z.string().datetime(),
  screenshotCount: z.number()
});

export const TagListResponseSchema = z.object({
  ok: z.boolean(),
  data: z.array(TagResponseSchema)
});

// Type exports
export type ScreenshotUpload = z.infer<typeof ScreenshotUploadSchema>;
export type ScreenshotQuery = z.infer<typeof ScreenshotQuerySchema>;
export type ScreenshotResponse = z.infer<typeof ScreenshotResponseSchema>;
export type TagCreate = z.infer<typeof TagCreateSchema>;
export type TagResponse = z.infer<typeof TagResponseSchema>;
