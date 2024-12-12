import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_API_KEY,
});

/**
 *
 * @param {{}} image
 * @param {"full" | "raw" | "regular" | "small" | "small_s3" | "thumb"} src_type
 * @returns {{ id: string, src: string, alt: string, width: number, height: number }}
 */
export function mapData(image, src_type = "small") {
  return {
    id: image.id,
    src: image.urls[src_type],
    alt: image.alt_description,
    width: 400,
  };
}

export default unsplash;
