import { useEffect, useState } from "react";
import { fetchAlbumWithDescriptions } from "../api/imgur";

const TestAPI = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albumId = "eagllze";
                const fetchedImages = await fetchAlbumWithDescriptions(albumId);
                setImages(fetchedImages);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Fetched Images</h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "10px",
                }}
            >
                {images.map((image) => (
                    <div key={image.id}>
                        <img
                            src={image.link}
                            alt={image.title || "Image"}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "5px",
                            }}
                        />
                         {image.description || "No description available"}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestAPI;
