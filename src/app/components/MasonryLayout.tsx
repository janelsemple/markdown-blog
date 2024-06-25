import Masonry from 'react-masonry-css';

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
const MasonryLayout: React.FC<MasonryLayoutProps> = ({ images }: MasonryLayoutProps): JSX.Element => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  console.log('images in masonry: ' + images);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex -ml-6 w-auto"
      columnClassName="pl-6 bg-clip-padding"
    >
      {images.map(({postId, url, alt}) => (
        <div key={postId} className="relative mb-6 group">
          <a href={`http://localhost:3000/posts/${postId}`} className="block">
            <img src={`/api/photos?size=small&src=${encodeURIComponent(url)}`} alt={alt} className="w-full block" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {alt}
            </div>
          </a>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
