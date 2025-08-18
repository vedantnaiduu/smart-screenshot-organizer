export interface OcrResult {
  text: string;
  confidence?: number;
  boxes?: any[];
  language?: string;
  processingTime?: number;
}

export interface OcrService {
  processImage(filePath: string): Promise<OcrResult>;
  processImageBuffer(buffer: Buffer): Promise<OcrResult>;
}

// Mock OCR implementation for Phase 1
export async function runOcrMock(filePath: string): Promise<OcrResult> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    text: `Mock OCR text extracted from ${filePath}`,
    confidence: 0.85,
    boxes: [],
    language: 'en',
    processingTime: 100
  };
}

export async function runOcrMockBuffer(buffer: Buffer): Promise<OcrResult> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return {
    text: `Mock OCR text from buffer (${buffer.length} bytes)`,
    confidence: 0.82,
    boxes: [],
    language: 'en',
    processingTime: 150
  };
}

// Future implementation will use Google Vision API
export class GoogleVisionOcrService implements OcrService {
  async processImage(filePath: string): Promise<OcrResult> {
    // TODO: Implement Google Vision API integration
    throw new Error('Google Vision OCR not implemented yet');
  }

  async processImageBuffer(buffer: Buffer): Promise<OcrResult> {
    // TODO: Implement Google Vision API integration
    throw new Error('Google Vision OCR not implemented yet');
  }
}
