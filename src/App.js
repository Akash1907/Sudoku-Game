import React from "react";
import Difficulty from "./Pages/Difficulty";
import SudokuPage from "./Pages/SudokuPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScorePage from "./Pages/ScorePage";

function App() {
  const initialEasy = [
    [6, -1, 9, 1, 5, -1, -1, 3, -1],
    [7, 4, -1, -1, -1, 6, -1, 9, 1],
    [3, -1, -1, 9, 4, -1, -1, 6, 5],
    [2, -1, -1, 7, 1, 3, 9, -1, -1],
    [-1, 9, 3, -1, -1, 2, 5, -1, 7],
    [-1, 1, 7, 5, -1, -1, 6, -1, 3],
    [5, -1, 2, 4, -1, 9, 1, -1, -1],
    [-1, 3, -1, -1, 7, 1, -1, 5, 6],
    [-1, 7, 8, -1, 6, -1, 3, 4, -1],
  ];

  const initialMed = [
    [-1, -1, 2, -1, -1, 8, 5, -1, -1],
    [3, 8, -1, 7, -1, -1, -1, -1, -1],
    [-1, 5, -1, -1, -1, 1, -1, 2, -1],
    [5, 1, -1, -1, -1, 3, -1, -1, 6],
    [-1, 3, -1, 5, -1, -1, -1, -1, 8],
    [-1, 2, -1, -1, -1, 9, 7, 5, -1],
    [1, -1, -1, -1, -1, -1, -1, 6, -1],
    [6, -1, -1, 9, 4, -1, -1, -1, 5],
    [-1, 9, 8, -1, 5, -1, -1, 7, -1],
  ];

  const initialHard = [
    [-1, -1, -1, -1, 3, -1, -1, -1, 9],
    [-1, -1, -1, -1, -1, 5, -1, 6, -1],
    [-1, -1, -1, -1, -1, 7, 5, -1, 8],
    [-1, -1, 6, -1, -1, -1, -1, -1, -1],
    [3, 2, -1, -1, -1, -1, 6, -1, -1],
    [-1, -1, -1, -1, 8, -1, -1, 5, 4],
    [-1, 3, -1, -1, 5, -1, -1, -1, -1],
    [8, 1, -1, 9, 4, 3, -1, -1, -1],
    [9, -1, -1, -1, -1, 8, -1, -1, -1],
  ];

  const scoreEasy = 500;
  const scoreMed = 600;
  const scoreHard = 700;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Difficulty />} />
          <Route
            path="/sudokuMedium"
            element={<SudokuPage initial={initialMed} score={scoreMed} />}
          />
          <Route
            path="/sudokuHard"
            element={<SudokuPage initial={initialHard} score={scoreHard} />}
          />
          <Route
            path="/sudokuEasy"
            element={<SudokuPage initial={initialEasy} score={scoreEasy} />}
          />
          <Route path="/scores" element={<ScorePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
