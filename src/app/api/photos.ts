import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const photosDirectory = path.join(process.cwd(), 'photos');

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const size = searchParams.get('size');

  if (!size || !['small', 'medium', 'large'].includes(size)) {
    return NextResponse.json({ error: 'Invalid size parameter' }, { status: 400 });
  }

  const sizes = {
    small: 150,
    medium: 500,
    large: 1000,
  };

  const files = fs.readdirSync(photosDirectory).filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
  if (files.length === 0) {
    return NextResponse.json({ error: 'No photos found' }, { status: 404 });
  }

  const randomIndex = Math.floor(Math.random() * files.length);
  const randomFile = files[randomIndex];
  const filePath = path.join(photosDirectory, randomFile);

  const image = await sharp(filePath)
    .resize({ width: sizes[size as keyof typeof sizes] })
    .toBuffer();

  return new NextResponse(image, {
    headers: {
      'Content-Type': 'image/jpeg',
    },
  });
}
