import React, { useState, useEffect } from "react";
import SudokuHeader from "../Components/SudokuHeader";
import { useNavigate, Link } from "react-router-dom";
import "./SudokuPage.css";
import Confetti from "../Components/Confetti";
import GameOver from "../Components/GameOver";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SudokuPage(props) {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(props.initial));

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
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    var arr = store;
    let filteredArr = arr.filter((el) => !(el[0] === row && el[1] === col));
    setStore(filteredArr);
    // checkHint(e);
  }


  function checkRow(grid, row, num) {
    return grid[row].indexOf(num) === -1;
  }

  //check  num is unique in column
  function checkCol(grid, col, num) {
    return grid.map((row) => row[col]).indexOf(num) === -1;
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

  const [checkSolve, setCheckSolve] = useState(false);
  function solveSudoku() {
    alert("Are you sure?");
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    setSudokuArr(sudoku);
    setCheckSolve(true);
    setStore([]);
  }

  //funtion to reset the sudoku
  function resetSudoku() {
    let sudoku = getDeepCopy(props.initial);
    let sudokuArray = getDeepCopy(sudokuArr);
    if (sudokuArr === sudoku) {
      alert("Your sudoku is already");
    } else {
      alert("Are You Sure?");
    }
    setSudokuArr(sudoku);
    setSeconds(0);
    setMinutes(0);
    setHour(0);
    setCheckSolve(false);
    setStore([]);
  }

  //funtion to compare sudoku
  function compareSudoku(currentSudoku, solvedSudoku) {
    let res = {
      isComplete: true,
      isSolvable: true,
    };
    for (let i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
          if (currentSudoku[i][j] !== -1) {
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }

  //function to check the sudoku is valid or not
  // function checkSudoku() {
  //   let sudoku = getDeepCopy(props.initial);
  //   solver(sudoku);
  //   let compare = compareSudoku(sudokuArr, sudoku);
  //   if (compare.isComplete) {
  //     alert("Congratulations! You have completely solved the sudoku");
  //   } else if (compare.isSolvable) {
  //     alert("Keep Going");
  //   } else alert("Sudoku can't be solved, Try Again!");
  // }

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hour, setHour] = useState(0);
  var timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
      if (minutes == 59) {
        setHour(hour + 1);
        setMinutes(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  let check;
  function clickSubmit() {
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    let compare = compareSudoku(sudokuArr, sudoku);
    if (!compare.isComplete) {
      check = true;
    } else {
      check = false;
    }
  }

  var score;
  function setScore() {
    var min = minutes;
    var sec = seconds;
    if (!checkSolve) {
      score = props.score - (min * 10 + Math.floor(sec / 10));
    } else score = 0;
  }
  setScore();

  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [triggerGameOver, setTriggerGameOver] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    clickSubmit();
    incorrectInput();
    if (check) {
      setOpen(true);
    } else {
      if (!checkSolve) {
        setTriggerConfetti(!triggerConfetti);
        setTimeout(() => {
          event.preventDefault();
          console.log("User-Score:", score);
          fetch("https://sudoku-score-default-rtdb.firebaseio.com/.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userScore: score,
              userName: "anonymous",
            }),
          }).then(() => NavigateToScore());
        }, 3500);
      } else if (checkSolve) {
        setTriggerGameOver(!triggerGameOver);
        setTimeout(() => {
          event.preventDefault();
          console.log("User-Score:", score);
          fetch("https://sudoku-score-default-rtdb.firebaseio.com/.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userScore: score,
              userName: "anonymous",
            }),
          }).then(() => NavigateToScore());
        }, 1700);
      }
    }
  };
// console.log(score);
  const navigate = useNavigate();
  const NavigateToScore = () => {
    navigate("/scores");
  };

  const [store, setStore] = useState([]);
  function incorrectInput() {
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudokuArr[i][j] !== sudoku[i][j] && sudokuArr[i][j] !== -1) {
          let rowCol = [i, j];
          var arr = store;
          arr.push(rowCol);
          setStore(arr);
        }
      }
    }
  }
  function checkWrong(row, col) {
    let containsElement = store.some((el) => el[0] === row && el[1] === col);
    return containsElement;
  }


  function checkHint(row, col){
    var mainOut = [];
    var colArray = [];
    var rowArray  = [];
    if(props.initial[row][col] === -1)
    {
      for(let i=0; i<9; i++)
      {
        rowArray.push(sudokuArr[row][i]);
      }
      for(let i=0; i<9; i++)
      {
        colArray.push(sudokuArr[i][col]);
      }
      for(let i=0; i<9; i++)
      {
        let flag = false;
        for(let j=0; j<9; j++)
        {
          if((rowArray[j] === (i+1)) || (colArray[j] === (i+1)))
          {
            flag = true;
          }
        }
        if(flag != true)
        {
          mainOut.push(i+1);
        }
      }
    }
    return mainOut;
  }
  

  return (
    <>
      <SudokuHeader
        // clickHint={checkSudoku}
        minutes={minutes}
        seconds={seconds}
        hour={hour}
        resetSudoku={resetSudoku}
      />
      {triggerConfetti && <Confetti />}
      {triggerGameOver && <GameOver />}
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
                            autoComplete="off"
                            onChange={(e) => onInputChange(e, row, col)}
                            value={
                              sudokuArr[row][col] === -1
                                ? ""
                                : sudokuArr[row][col]
                            }

                            id="cellInput"
                            style={
                              checkWrong(row, col)
                                ? { boxShadow: "inset 0 0 10px red"}
                                : { borderColor: "black" }
                            }
                            placeholder = {checkHint(row, col)}
                            disabled={props.initial[row][col] !== -1}
                            className={
                              (row <= 2 && col <= 2) ||
                              (col <= 8 && col > 5 && row <= 2) ||
                              (col >= 3 && col <= 5 && row >= 3 && row <= 5) ||
                              (col <= 2 && row > 5) ||
                              (col > 5 && row > 5)
                                ? "colorId"
                                : ""
                            }
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="submit-btn">
          <button className="btn" onClick={solveSudoku}>
            SOLVE
          </button>
          <div>
            <Button
              variant="outlined"
              onClick={handleSubmit}
              sx={{
                fontFamily: "Bebas Neue",
                backgroundColor: "#1F191B",
                color: "white",
                height: "3.5rem",
                width: "9rem",
                fontSize: "2rem",
                borderRadius: "15px",
                "&:hover": {
                  background: "white",
                  color: "black",
                  border: "4px solid black",
                  fontWeight: "600",
                },
              }}
            >
              SUBMIT
            </Button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {"Your SUUDOKU is either not completed or wrong. Keep Trying!"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>OKAY</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        {/* <button className = 'hint-btn' onClick = {(e)=>{checkHint(e)}}>Hint</button> */}
      </div>
    </>
  );
}

export default SudokuPage;
