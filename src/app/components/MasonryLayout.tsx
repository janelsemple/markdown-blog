import React from 'react';
import MasonryImage from './MasonryImage';

/**
 * Props for the MasonryLayout component.
 */
interface MasonryLayoutProps {
  images: ImageSearchResult[];
}

/**
 * MasonryLayout component to display images in a masonry layout.
 * 
 * @param {MasonryLayoutProps} props - The props for the component.
 * @param {ImageSearchResult[]} props.images - Array of image search results to be displayed.
 * @returns {JSX.Element} The rendered MasonryLayout component.
 */
const MasonryLayout: React.FC<MasonryLayoutProps> = ({ images }) => {
  const firstColumn = images.filter((_, index) => index % 3 === 0);
  const secondColumn = images.filter((_, index) => index % 3 === 1);
  const thirdColumn = images.filter((_, index) => index % 3 === 2);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-20">
      <div className="gap-4 flex flex-col" >
        {firstColumn.map((image) => (
          <MasonryImage key={image.postId} image={image} />
        ))}
      </div>
      <div className="gap-4 flex flex-col">
        {secondColumn.map((image) => (
          <MasonryImage key={image.postId} image={image} />
        ))}
      </div>
      <div className="gap-4 flex flex-col">
        {thirdColumn.map((image) => (
          <MasonryImage key={image.postId} image={image} />
        ))}
      </div>
    </div>
  );
};

export default MasonryLayout;
