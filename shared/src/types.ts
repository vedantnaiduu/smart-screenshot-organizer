export interface Screenshot {
  id: string;
  userId: string;
  originalFilePath: string;
  thumbnailUrl?: string;
  fullSizeUrl?: string;
  fileSize?: number;
  width?: number;
  height?: number;
  createdAt: Date;
  takenAt?: Date;
  deviceType?: string;
  sourceApp?: string;
  aiProcessed: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  metadata?: Record<string, any>;
  ocr?: OcrContent;
  tags: ScreenshotTag[];
}

export interface Tag {
  id: string;
  userId: string;
  name: string;
  color?: string;
  isSystemTag: boolean;
  createdAt: Date;
  screenshots: ScreenshotTag[];
}

export interface ScreenshotTag {
  screenshotId: string;
  tagId: string;
  confidenceScore?: number;
  isAiGenerated: boolean;
  createdAt: Date;
}

export interface OcrContent {
  id: string;
  screenshotId: string;
  extractedText?: string;
  language?: string;
  confidenceScore?: number;
  boundingBoxes?: Record<string, any>;
  processedAt: Date;
}

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  screenshots: Screenshot[];
  tags: Tag[];
}
