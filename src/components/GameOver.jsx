const GameOver = ({currentScore, onRestart}) => {
    return (
        <div className="game-over-screen">
            <h1 className="text-3xl font-bold mb-4"> Game Over!</h1>
            <p className="text-lg mb-4">Your final score: {currentScore}</p>
            <button onClick={onRestart} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Play Again</button>
        </div>
    )
}

export default GameOver