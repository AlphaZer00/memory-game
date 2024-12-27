import { useState, useEffect } from "react";
import { fetchAndStoreImages } from "../utils/storeImages";
import shuffleArray from "../utils/shuffleArray";

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [displayedCards, setDisplayedCards] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);
    const [error, setError] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const albumId = "eagllze";

    // Fetch cards from API
    useEffect(() => {
        const loadCards = async () => {
            try {
                const fetchedCards = await fetchAndStoreImages(albumId);
                setCards(fetchedCards);
                setDisplayedCards(shuffleArray(fetchedCards).slice(0, 12));
            } catch (err) {
                setError(err.message);
            }
        };

        loadCards();
    }, []);

    const handleCardClick = (cardId) => {
        // Check if card has been selected previously
        if (clickedCards.includes(cardId)) {
            // If it has, then game over
            setGameOver(true);
            return;
        }

        // Add selected card to list of clicked cards
        const newClickedCards = [...clickedCards, cardId];
        setClickedCards(newClickedCards);

        // Shuffle cards, ensure previously clicked cards are included

        // Create a new array that excludes clickedCards
        const remainingCards = cards.filter(
            (card) => !newClickedCards.includes(card.id)
        );

        // Determine how many unclicked cards needed to fill the display
        const neededCardNum = Math.max(12-newClickedCards.length, 0);
        // displayedCards must be an array of objects containing card info
        const displayedCards = [
            // newClickedCards only contains the ids, so we .map and .find to create an array of the card objects with matching ids
            ...newClickedCards.map((id) => cards.find((card) => card.id === id)), 
            ...shuffleArray(remainingCards).slice(0, neededCardNum),
        ];

        // Update displayed cards
        setDisplayedCards(shuffleArray(displayedCards));
    };

    if (error) return <div>Error:{error}</div>;
    if (gameOver) return <div>Game Over! You Clicked the same card twice!</div>;
    if (!displayedCards.length) return <div>Loading...</div>;

    return (
        <div>
            <h1>Memory Game</h1>
            <p>Click a card to start the game, don&apos;t click the card twice!</p>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax (150px, 1fr))",
                    gap: "10px",
                }}
            >
                {displayedCards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        style={{
                            cursor: "pointer",
                            border: "2px solid #ccc",
                            borderRadius: "8px",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={card.link}
                            alt={card.description || "Memory card"}
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemoryGame;
