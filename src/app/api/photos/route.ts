import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const photosDirectory = path.join(process.cwd(), 'photos');

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const size = searchParams.get('size');
    const src = searchParams.get('src');

    if (!size || !['small', 'medium', 'large'].includes(size)) {
      console.error('Invalid size parameter');
      return NextResponse.json({ error: 'Invalid size parameter' }, { status: 400 });
    }

    if (!src) {
      console.error('Missing src parameter');
      return NextResponse.json({ error: 'Missing src parameter' }, { status: 400 });
    }

    const sizes = {
      small: 300,
      medium: 600,
      large: 1000,
    };

    const filePath = path.join(photosDirectory, `${src}.jpg`);

    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Read file manually to ensure it's accessible
    const fileContent = fs.readFileSync(filePath);

    const image = await sharp(filePath)
      .resize({ width: sizes[size as keyof typeof sizes] })
      .jpeg()
      .toBuffer();

    return new NextResponse(image, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
