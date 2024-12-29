import { fetchAlbumWithDescriptions } from "./imgur";

let cachedImages = null;

export const fetchAndStoreImages = async (albumId) => {
    if (cachedImages) {
        console.log("Using cached images");
        return cachedImages;
    }

    try {
        cachedImages = await fetchAlbumWithDescriptions(albumId);
        return cachedImages;
    } catch (error) {
        throw new Error(`Error fetching images: ${error.message}`);
    }
};
