import { useState } from "react";
import "./App.css";
import TestAPI from "./components/testAPI";
import MemoryGame from "./components/MemoryGame";

function App() {
    return (
        <div className="App">
            <MemoryGame />
        </div>
    );
}

export default App;
