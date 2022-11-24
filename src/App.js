import React from "react";
import Difficulty from "./Pages/Difficulty";
import SudokuPageEasy from "./Pages/SudokuPageEasy";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import SudokuPageMedium from "./Pages/SudokuPageMedium";
import SudokuPageHard from "./Pages/SudokuPageHard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element ={<Difficulty />} />
          <Route path='/sudokuMedium' element ={<SudokuPageMedium />} />
          <Route path='/sudokuHard' element ={<SudokuPageHard />} />
          <Route path="/sudokuEasy" element ={<SudokuPageEasy/>} />
       </Routes>
      </Router>
    </div>
  );
}

export default App;
