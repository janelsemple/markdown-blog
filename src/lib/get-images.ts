import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const photosDirectory = path.join(process.cwd(), 'photos');
type ImageSize = 'small' | 'medium' | 'large';

const sizeDimensions: { [key in ImageSize]: { width: number, height: number } } = {
  small: { width: 400, height: 400 },
  medium: { width: 800, height: 800 },
  large: { width: 1600, height: 1600 },
};

/**
 * A function that resizes an image to the desired size using sharp.
 * 
 * @param filePath the path to the image file
 * @param size the desired size of the image
 * @returns the resized image as a buffer
 */
async function resizeImage(filePath: string, size: ImageSize): Promise<Buffer> {
  const dimensions = sizeDimensions[size];
  return sharp(filePath)
    .resize(dimensions.width, dimensions.height, { fit: 'inside' })
    .toBuffer();
}

/**
 * A function that fetches an image from the file system and resizes it to the desired size, returning it in base64 format.
 * 
 * @param name The name of the image file
 * @param size The desired size of the image
 * @returns the image as a base64 string in the format `data:image/jpeg;base64,${base64Image}`
 */
export async function fetchImage(name: string, size: ImageSize): Promise<string> {
  try {
    const filePath = path.join(photosDirectory, `${name}.jpg`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Image not found: ${filePath}`);
    }
    const buffer = await resizeImage(filePath, size);
    const base64Image = buffer.toString('base64');
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error; // Re-throw the error after logging it
  }
}

/**
 * A function that processes multiple images, resizing them and returning them as base64 strings.
 * 
 * @param imageResults an array of objects containing image details (url, alt, postId)
 * @param size the desired size of the images
 * @returns an object where the keys are postId and the values are base64-encoded image URLs
 */
export async function getImages(imageResults: { url: string; alt: string; postId: string }[], size: ImageSize): Promise<{ [key: string]: string }> {
  const images: { [key: string]: string } = {};

  for (const result of imageResults) {
    try {
      const filePath = path.join(__dirname, 'posts', result.url);
      if (!fs.existsSync(filePath)) {
        console.warn(`Image not found: ${filePath}`);
        continue; // Skip to the next image if the file is not found
      }
      const resizedImageBuffer = await resizeImage(filePath, size);
      const base64Image = resizedImageBuffer.toString('base64');
      const mimeType = getMimeType(filePath);
      images[result.postId] = `data:${mimeType};base64,${base64Image}`;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to process image ${result.url}: ${error.message}`);
      } else {
        console.error(`Failed to process image ${result.url}: An unknown error occurred`, error);
      }
      continue; // Skip to the next image if there is an error
    }
  }

  return images;
}

/**
 * 
 *  a function that returns the MIME type of an image based on its file extension.
 * 
 * @param filePath the path to the image file
 * @returns the MIME type of the image
 */
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}
