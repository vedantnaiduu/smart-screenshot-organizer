// Simple test script for screenshot detection
import { isLikelyScreenshot, getAspectRatioName } from './dist/utils/screenshotDetection.js';

console.log('🧪 Testing Screenshot Detection...\n');

// Test 1: Screenshot with keyword
const test1 = isLikelyScreenshot({
  fileName: 'screenshot_2024_01_15.png',
  width: 1920,
  height: 1080
});
console.log('Test 1 - Screenshot with keyword:');
console.log('Result:', test1);
console.log('');

// Test 2: Japanese filename
const test2 = isLikelyScreenshot({
  fileName: 'スクリーンショット_2024.png',
  width: 1170,
  height: 2532
});
console.log('Test 2 - Japanese filename:');
console.log('Result:', test2);
console.log('');

// Test 3: No keyword, but common aspect ratio
const test3 = isLikelyScreenshot({
  fileName: 'IMG_1234.jpg',
  width: 1920,
  height: 1080
});
console.log('Test 3 - No keyword, common aspect ratio:');
console.log('Result:', test3);
console.log('');

// Test 4: Aspect ratio names
console.log('Test 4 - Aspect ratio names:');
console.log('16:9 ->', getAspectRatioName(1920, 1080));
console.log('19.5:9 ->', getAspectRatioName(1170, 2532));
console.log('3:2 ->', getAspectRatioName(3000, 2000));
console.log('Custom ->', getAspectRatioName(1000, 800));
