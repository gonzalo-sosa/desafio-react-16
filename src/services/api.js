import { createApi } from 'unsplash-js';
import config from '../config';

const unsplash = createApi({
  accessKey: config.VITE_API_KEY,
});

/**
 * Map data from api to image
 * @param {{}} image
 * @param {"full" | "raw" | "regular" | "small" | "small_s3" | "thumb"} src_type
 * @returns {{ id: string, src: string, alt: string, width: number, height: number }}
 */
export function mapData(image, src_type = 'small') {
  const style = image.height > 4000 ? { gridRow: 'span 2' } : {};

  return {
    id: image.id,
    src: image.urls[src_type],
    alt: image.alt_description,
    width: 400,
    created_at: image.created_at,
    style,
  };
}

export default unsplash;
