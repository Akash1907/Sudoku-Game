import React, { useState } from "react";
import SudokuHeader from "../Components/SudokuHeader";
import "./SudokuPageEasy.css";
const initial = [
  [4, 9, -1, 1, 5, 7, -1, -1, -1],
  [-1, 1, 8, -1, 9, -1, -1, -1, -1],
  [7, 5, -1, 2, 8, 4, 1, -1, 6],
  [-1, 6, -1, 4, 1, 5, -1, 7, -1],
  [1, -1, -1, 7, -1, -1, 4, -1, -1],
  [-1, -1, -1, 9, -1, 8, -1, 6, 1],
  [-1, -1, 7, 5, -1, -1, -1, 1, 3],
  [6, 4, -1, -1, -1, -1, 2, -1, -1],
  [5, -1, 1, -1, 7, -1, -1, 8, -1],
];
function SudokuPageEasy() {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));
  const [valtime,setvaltime]=useState(0)

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }
  function onInputChange(e, row, col) {
    var val = parseInt(e.target.value) || -1;
    var grid = getDeepCopy(sudokuArr);
    if (val === -1 || (val >= 1 && val <= 9)) {
      grid[row][col] = val;
    }
    setSudokuArr(grid);
  }

  function checkRow(grid, row, num) {
    return grid[row].indexOf(num) === -1;
  }

  //check  num is unique in column
  function checkCol(grid, col, num) {
    return grid.map(row => row[col]).indexOf(num) === -1;
  }

  //check num is uniques in box
  function checkBox(grid, row, col, num) {
    let boxArr = [],
      rowStart = row - (row % 3),
      colStart = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        //get all the cell numbers and push to boxArr
        boxArr.push(grid[rowStart + i][colStart + j]);
      }
    }
    return boxArr.indexOf(num) === -1;
  }
  function checkValid(grid, row, col, num) {
    //num should be unique in row, col and in the square 3x3.
    if (
      checkRow(grid, row, num) &&
      checkCol(grid, col, num) &&
      checkBox(grid, row, col, num)
    ) {
      return true;
    }
    return false;
  }

  function getNext(row, col) {
    //if col reaches 8 increase row number
    //if row reaches 8 and col reaches 8 , next will be [0, 0]
    //if col doesn't reach 8, increase col number
    return col !== 8 ? [row, col + 1] : row != 8 ? [row + 1, 0] : [0, 0];
  }
  //recursive fn to solve sudoku
  function solver(grid, row = 0, col = 0) {
    //if the current cell is already filled, move to next cell
    if (grid[row][col] !== -1) {
      // for last cell, don't solve it
      let isLast = row >= 8 && col >= 8;
      if (!isLast) {
        let [newRow, newCol] = getNext(row, col);
        return solver(grid, newRow, newCol);
      }
    }
    for (let num = 1; num <= 9; num++) {
      //check if this number is satisfying sudoku constraints
      if (checkValid(grid, row, col, num)) {
        //fill the num in that cell
        grid[row][col] = num;
        //get next cell and repeat the function
        let [newRow, newCol] = getNext(row, col);
        if (!newRow && !newCol) {
          return true;
        }
        if (solver(grid, newRow, newCol)) {
          return true;
        }
      }
    }
    //if it is invalid fill with -1
    grid[row][col] = -1;
    return false;
  }

  

  function solveSudoku() {
    alert('Are you sure?')
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    setSudokuArr(sudoku);
  }

  //funtion to reset the sudoku
  function resetSudoku() {
    let sudoku = getDeepCopy(initial);
    setSudokuArr(sudoku);
    setvaltime(valtime+1)
  }
  //funtion to compare sudoku
  function compareSudoku(currentSudoku, solvedSudoku){
    let res = {
      isComplete: true,
      isSolvable: true
    }
    for(let i=0; i<9; i++)
    {
      for(var j=0; j<9; j++)
      {
        if(currentSudoku[i][j] != solvedSudoku[i][j])
        {
          if(currentSudoku[i][j] != -1)
          {
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }
  //function to check the sudoku is valid or not
  function checkSudoku(){
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    let compare = compareSudoku(sudokuArr, sudoku);
    if(compare.isComplete)
    {
      alert('Congratulations! You have completely solved the sudoku')
    }
    else if (compare.isSolvable)
    {
      alert('Keep Going');
    }
    else
    alert("Sudoku can't be solved, Try Again!");
  }
  return (
    <>
      <SudokuHeader clickSolve ={solveSudoku} clickHint = {checkSudoku} />
      <div className="sudoku-container">
        <div className="App-header">
          <table>
            <tbody>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                return (
                  <tr
                    key={rIndex}
                    className={(row + 1) % 3 === 0 ? "bBorder" : ""}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                      return (
                        <td
                          key={rIndex + cIndex}
                          className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                        >
                          <input
                            onChange={(e) => onInputChange(e, row, col)}
                            value={
                              sudokuArr[row][col] === -1
                                ? ""
                                : sudokuArr[row][col]
                            }
                            className="cellInput"
                            disabled={sudokuArr[row][col] !== -1}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="background">
            <div className="back-top1"></div>
            <div className="back-top2"></div>
            <div className="back-mid"></div>
            <div className="back-bottom1"></div>
            <div className="back-bottom2"></div>
          </div>
        </div>
        <div className="submit-btn">
          <button className="btn" onClick={resetSudoku}>RESET</button>
          <button className="btn" >SUBMIT</button>
        </div>
      </div>
    </>
  );
}

export default SudokuPageEasy;
