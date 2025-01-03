const Scoreboard = ({ currentScore, highestScore }) => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div className="text-xl font-bold">Score: {currentScore}</div>
            <div className="text-xl font-bold">High Score: {highestScore}</div>
        </div>
    );
};

export default Scoreboard;
