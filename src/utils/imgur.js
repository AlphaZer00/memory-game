const clientId = import.meta.env.VITE_IMGUR_CLIENT_ID;

const fetchImages = async (albumId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${clientId}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            `https://api.imgur.com/3/album/${albumId}/images`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        return result.data.map((image) => image.id);
    } catch (error) {
        console.error("Error fetching images from Imgur:", error);
        throw error;
    }
};

const fetchImageDescriptions = async (imageHash) => {
    const clientId = import.meta.env.VITE_IMGUR_CLIENT_ID;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${clientId}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            `https://api.imgur.com/3/image/${imageHash}`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (!result.success || !result.data) {
            throw new Error(
                "Unexpected response structure or missing data field."
            );
        }

        console.log(result);

        // Return the image details (including description)
        return result.data;
    } catch (error) {
        console.error(`Error fetching image details for ${imageHash}:`, error);
        throw error;
    }
};

export const fetchAlbumWithDescriptions = async (albumId) => {
    try {
        // Fetch the list of image hashes from the album
        const imageHashes = await fetchImages(albumId);

        // Fetch the details for each image (including description)
        const imageDescPromises = imageHashes.map((hash) =>
            fetchImageDescriptions(hash)
        );

        // Wait for all the details to be fetched
        const imageDesc = await Promise.all(imageDescPromises);

        // Return the detailed image data (with descriptions)
        return imageDesc;
    } catch (error) {
        console.error("Error fetching album with descriptions:", error);
        throw error;
    }
};
