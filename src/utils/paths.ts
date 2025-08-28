// Utility to handle image paths with base URL for GitHub Pages
export function getImagePath(imagePath: string): string {
  const baseUrl = import.meta.env.BASE_URL || '/';
  // Remove leading slash from imagePath if it exists, and ensure baseUrl ends with /
  const cleanImagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  
  return cleanBaseUrl + cleanImagePath;
}

// Alternative approach using URL constructor
export function getAssetPath(assetPath: string): string {
  return new URL(assetPath, import.meta.env.BASE_URL).pathname;
}