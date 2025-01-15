export const fetchAlbumWithDescriptions = async (albumId) => {
    try {
        const response = await fetch(
            `/.netlify/functions/fetchImages?albumId=${albumId}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Image details with descriptions
    } catch (error) {
        console.error("Error fetching album with descriptions:", error);
        throw error;
    }
};
