import LightBoxImage from "./LightBoxImage";
import { fetchImage } from "../../lib/get-images";

interface ImageWithFetchProps {
  src: string;
  alt: string;
}

/**
 * helps render a lightbox image with pre-fetched image data
 */
const ImageWithFetch = async ({ src, alt }: ImageWithFetchProps) => {
    const data = await fetchImage(src, 'medium');

  return  <LightBoxImage data={data} src={src} alt={alt} />;
};

export default ImageWithFetch;