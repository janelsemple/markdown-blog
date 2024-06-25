// src/app/components/CustomImage.tsx

"use client";  // This marks the file as a client component

import React, { useState, FC } from 'react';

interface CustomImageProps {
  src: string;
  alt: string;
}

const CustomImage: FC<CustomImageProps> = ({ src, alt }) => {
  const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);

  const toggleOverlay = () => setOverlayVisible(!isOverlayVisible);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src={`/api/photos?size=medium&src=${encodeURIComponent(src)}`}
        alt={alt}
        onClick={toggleOverlay}
        style={{ cursor: 'pointer', maxHeight: '400px', objectFit: 'contain' }}
      />
      {isOverlayVisible && (
        <dialog
          open
          onClick={toggleOverlay}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          <img
            src={`/api/photos?size=large&src=${encodeURIComponent(src)}`}
            alt={alt}
            style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }}
          />
        </dialog>
      )}
    </div>
  );
};

export default CustomImage;
