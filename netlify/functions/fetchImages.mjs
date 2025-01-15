const API_URL = "https://api.imgur.com/3";
const CLIENT_ID = process.env.IMGUR_CLIENT_ID;

exports.handler = async (event) => {
    const { albumId } = event.queryStringParameters;
    if (!albumId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Album ID is required" }),
        };
    }

    try {
        // Fetch list of images from album
        const albumResponse = await fetch(
            `${API_URL}/album/${albumId}/images`,
            {
                method: "GET",
                headers: {
                    Authorization: `Client-Id ${CLIENT_ID}`,
                },
            }
        );

        if (!albumResponse.ok) {
            throw new Error(
                `Imgur API error (album): ${albumResponse.statusText} (${albumResponse.status})`
            );
        }

        const albumData = await albumResponse.json();
        const imageHashes = albumData.data.map((image) => image.id);

        // Fetch image descriptions
        const imageDetailsPromise = imageHashes.map(async (hash) => {
            const imageResponse = await fetch(`${API_URL}/image/${hash}`, {
                method: "GET",
                headers: {
                    Authorization: `Client-Id ${CLIENT_ID}`,
                },
            });

            if (!imageResponse.ok) {
                throw new Error(
                    `Imgur API error (image): ${imageResponse.statusText} (${imageResponse.status})`
                );
            }

            const imageData = await imageResponse.json();
            return imageData.data;
        });

        const imageDetails = await Promise.all(imageDetailsPromise);

        //Return image details to client
        return {
            statusCode: 200,
            body: JSON.stringify(imageDetails),
        };
    } catch (error) {
        console.error("Error in fetchImages function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
