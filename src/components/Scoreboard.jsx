const Scoreboard = ({ currentScore, highestScore }) => {
    return (
        <div className="bg-black bg-opacity-50 text-white p-4 rounded-lg shadow-md flex justify-between items-center mb-2 w-[300px]">
            <div className="text-xl font-bold">Score: {currentScore}</div>
            <div className="text-xl font-bold">High Score: {highestScore}</div>
        </div>
    );
};

export default Scoreboard;
