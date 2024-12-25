import { fetchAlbumWithDescriptions } from "../api/imgur";

let cachedImages = null;

export const fetchAndStoreImages = async (albumId) => {
    if (cachedImages) {
        console.log("Using caches images");
        return cachedImages;
    }

    try {
        cachedImages = await fetchAlbumWithDescriptions(albumId);
        return cachedImages;
    } catch (error) {
        throw new Error(`Error fetching images: ${error.message}`);
    }
};
