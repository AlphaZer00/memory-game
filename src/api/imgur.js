const clientId = import.meta.env.VITE_IMGUR_CLIENT_ID;

export const fetchImages = async (albumId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${clientId}`);

    const formdata = new FormData();

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            `https://api.imgur.com/3/album/${albumId}/images`,
            requestOptions
        );

        if (response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching images from Imgur:", error);
        throw error;
    }
};
