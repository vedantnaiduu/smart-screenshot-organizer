interface ScreenshotDetectionParams {
  fileName: string;
  width?: number;
  height?: number;
}

interface DetectionResult {
  isScreenshot: boolean;
  confidence: number;
  reasons: string[];
}

// Common screenshot filename patterns in multiple languages
const SCREENSHOT_KEYWORDS = [
  'screenshot',
  'スクリーンショット', // Japanese
  '屏幕截图', // Chinese Simplified
  '화면 캡처', // Korean
  'captura de pantalla', // Spanish
  'capture d\'écran', // French
  'screenshot', // English
  'screencap',
  'screen cap',
  'screen-capture',
  'screen_capture'
];

// Common device aspect ratios (with 1% tolerance)
const COMMON_ASPECT_RATIOS = [
  { ratio: 19.5/9, name: 'iPhone X/11/12/13/14' },
  { ratio: 20/9, name: 'Ultra-wide phones' },
  { ratio: 16/9, name: 'Standard widescreen' },
  { ratio: 3/2, name: 'Traditional 4:6' },
  { ratio: 4/3, name: 'Traditional 3:4' },
  { ratio: 1/1, name: 'Square' }
];

const ASPECT_TOLERANCE = 0.01; // 1% tolerance

export function isLikelyScreenshot({ fileName, width, height }: ScreenshotDetectionParams): DetectionResult {
  const reasons: string[] = [];
  let confidence = 0;

  // Check filename for screenshot keywords
  const fileNameLower = fileName.toLowerCase();
  const hasScreenshotKeyword = SCREENSHOT_KEYWORDS.some(keyword => 
    fileNameLower.includes(keyword.toLowerCase())
  );

  if (hasScreenshotKeyword) {
    confidence += 0.6;
    reasons.push('Filename contains screenshot keyword');
  }

  // Check aspect ratio if dimensions are provided
  if (width && height) {
    const aspectRatio = width / height;
    const hasCommonAspectRatio = COMMON_ASPECT_RATIOS.some(({ ratio }) => 
      Math.abs(aspectRatio - ratio) < (ratio * ASPECT_TOLERANCE)
    );

    if (hasCommonAspectRatio) {
      confidence += 0.3;
      reasons.push('Aspect ratio matches common device ratios');
    }

    // Additional confidence for very common ratios
    if (Math.abs(aspectRatio - 16/9) < (16/9 * ASPECT_TOLERANCE)) {
      confidence += 0.1;
      reasons.push('16:9 aspect ratio (very common)');
    }
  }

  // Check file extension
  const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.heic'];
  const fileExtension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  if (validExtensions.includes(fileExtension)) {
    confidence += 0.1;
    reasons.push('Valid image file extension');
  }

  const isScreenshot = confidence >= 0.3; // Threshold for detection

  return {
    isScreenshot,
    confidence: Math.min(confidence, 1.0),
    reasons
  };
}

// Helper function to get aspect ratio name
export function getAspectRatioName(width: number, height: number): string {
  const ratio = width / height;
  
  for (const { ratio: commonRatio, name } of COMMON_ASPECT_RATIOS) {
    if (Math.abs(ratio - commonRatio) < (commonRatio * ASPECT_TOLERANCE)) {
      return name;
    }
  }
  
  return 'Custom';
}
