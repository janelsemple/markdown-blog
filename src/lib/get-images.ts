import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
const photosDirectory = path.join(process.cwd(), 'photos');
type ImageSize = 'small' | 'medium' | 'large';

const sizeDimensions: { [key in ImageSize]: { width: number, height: number } } = {
  small: { width: 400, height: 400 },
  medium: { width: 800, height: 800 },
  large: { width: 1600, height: 1600 },
};

const sizes = {
    small: 300,
    medium: 600,
    large: 1000,
  };

async function resizeImage(filePath: string, size: ImageSize): Promise<Buffer> {
  const dimensions = sizeDimensions[size];
  return sharp(filePath)
    .resize(dimensions.width, dimensions.height, { fit: 'inside' })
    .toBuffer();
}

/**
 * Extracts image URLs and alt text from the markdown content using a regular expression.
 * @param {string} markdown - The markdown content.
 * @param {string} postId - The ID of the post.
 * @returns {Array<{ url: string, alt: string, postId: string }>} - An array of objects with image URLs, alt text, and post ID.
 */
export function extractImagesFromMarkdown(markdown: string, postId: string): { url: string; alt: string; postId: string }[] {
  const images: { url: string; alt: string; postId: string }[] = [];
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
  let match;

  while ((match = imageRegex.exec(markdown)) !== null) {
    images.push({ alt: match[1], url: match[2], postId });
  }
  return images;
}

export async function getImages(imageResults: { url: string; alt: string; postId: string }[], size: ImageSize): Promise<{ [key: string]: string }> {
  const images: { [key: string]: string } = {};

  for (const result of imageResults) {
    const filePath = path.join(__dirname, 'posts', result.url);
    if (fs.existsSync(filePath)) {
      images[result.postId] = await fetchImage(result.url, size);
    } else {
      console.warn(`Image not found: ${filePath}`);
    }
  }

  return images;
}

export async function extractAndResizeImages(markdown: string, postId: string): Promise<{ [key: string]: string }> {
  const imageResults = extractImagesFromMarkdown(markdown, postId);
  return getImages(imageResults, 'medium');
}

export async function fetchImage(name: string, size: ImageSize): Promise<string> {
    const filePath = path.join(photosDirectory, `${name}.jpg`);
    const buffer = await resizeImage(filePath, size);
    const base64Image = buffer.toString('base64');
    return `data:image/jpeg;base64,${base64Image}`;
  }