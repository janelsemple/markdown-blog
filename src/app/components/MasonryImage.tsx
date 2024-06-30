import { fetchImage } from "../../lib/get-images";

/**
 * Props for the MasonryImage component.
 */
interface MasonryImageProps {
  image: ImageSearchResult;
}

/**
 * MasonryImage component to display a single image.
 * 
 * @param {MasonryImageProps} props - The props for the component.
 * @param {ImageSearchResult} props.image - The image to be displayed.
 * @returns {JSX.Element} The rendered MasonryImage component.
 */
const MasonryImage = async ({ image }: MasonryImageProps) => {
    const imageData = await fetchImage(image.url, 'small');
    return(
        <div key={image.postId} className="relative group">
          <a href={`http://localhost:3000/posts/${image.postId}`} className="block">
            <img src={imageData}  alt={image.alt} className="w-full block" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {image.alt}
            </div>
          </a>
        </div>
      );
}



export default MasonryImage;
