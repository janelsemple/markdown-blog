// src/app/components/LightBoxImage.tsx

"use client";

import { useState, FC } from 'react';

interface LightBoxImageProps {
  src: string;
  alt: string;
}

const LightBoxImage: FC<LightBoxImageProps> = ({ src, alt }) => {
  const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);

  const toggleOverlay = () => setOverlayVisible(!isOverlayVisible);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src={`/api/photos?size=medium&src=${encodeURIComponent(src)}`}
        alt={alt}
        onClick={toggleOverlay}
        style={{ cursor: 'pointer', maxHeight: '400px', objectFit: 'contain', width: '100%' }}
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
            flexDirection: 'column'
          }}
        >
          <img
            src={`/api/photos?size=large&src=${encodeURIComponent(src)}`}
            alt={alt}
            style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }}
          />
          <p style={{ color: 'white' }}>{alt}</p>
        </dialog>
      )}
    </div>
  );
};

export default LightBoxImage;
