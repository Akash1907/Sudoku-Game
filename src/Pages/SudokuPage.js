import React, { useState , useEffect} from "react";
import SudokuHeader from "../Components/SudokuHeader";
import {useNavigate,Outlet,Link } from 'react-router-dom';
import "./SudokuPage.css";
import Confetti from "../Components/Confetti";



function SudokuPage(props) {

  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(props.initial));

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }
 
  function onInputChange(e, row, col) {
    var tempArray = [];
    let rowCol = []
    var val = parseInt(e.target.value) || -1;
    var grid = getDeepCopy(sudokuArr);
    if (val === -1 || (val >= 1 && val <= 9)) {
      grid[row][col] = val;
    }
    setSudokuArr(grid);
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    if(val !== sudoku[row][col])
    {
      alert('you are doing wrong');
      rowCol = [row,col];
      tempArray.push(rowCol);
    }
    else if(val == sudoku[row][col])
    {
      alert('you are doing right');
    }
    console.log(tempArray);

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
  
  const [checkSolve, setCheckSolve] = useState(false);
  function solveSudoku() {
    alert('Are you sure?')
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    setSudokuArr(sudoku);
    setCheckSolve(true);
  }

  //funtion to reset the sudoku
  function resetSudoku() {
    // alert('Are You Sure?')
    let sudoku = getDeepCopy(props.initial);
    setSudokuArr(sudoku);
    setSeconds(0);
    setMinutes(0);
    setCheckSolve(false);
    // setCheckIn(false);
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
        if(currentSudoku[i][j] !== solvedSudoku[i][j])
        {
          if(currentSudoku[i][j] !== -1)
          {
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }

  // const[checkIn, setCheckIn] = useState(false);
  // var checkIn = getDeepCopy(sudokuArr);
  // var checkIn = new Array(2);
  // checkIn.fill = false;
  // const[checkinput, setCheckInput] = useState(objInput);
  // var objInput = {};

  // function checkInput(e,row, col){
  //   var val = parseInt(e.target.value) || -1;
  //   let sudoku = getDeepCopy(props.initial);
  //   solver(sudoku);
  //       if(val !== sudoku[row][col])
  //       {
  //         // setCheckIn(true);
  //         // checkIn[row][col] = true;
  //         alert('you are doing wrong');
  //         objInput = {row,col}
  //       }
  //       else if(val == sudoku[row][col])
  //       {
  //         // setCheckIn(false);
  //         // checkIn[row][col] = false;
  //         alert('you are doing right');
  //       }
  // }
  //function to check the sudoku is valid or not
  function checkSudoku(){
    let sudoku = getDeepCopy(props.initial);
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

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  var timer;
    useEffect(() =>{
       timer = setInterval(() =>{
      setSeconds(seconds+1);
      if(seconds === 59){
        setMinutes(minutes+1);
        setSeconds(0);
      }
    },1000)    
    return ()=> clearInterval(timer)
  })


  let check;
  function clickSubmit(){
    
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    let compare = compareSudoku(sudokuArr, sudoku);
    if(!compare.isComplete)
    {
      check = true;
    }
    else {
      check = false;
    }
  }
   
  
  var score;
  function setScore() {
    var min = minutes
    var sec = seconds;
    if(!checkSolve)
    {
      score = (props.score)-((min*10) + Math.floor(sec/10));
    }
    else
    score = 0;
  }
  setScore();

  const[triggerConfetti, setTriggerConfetti] = useState(false);
  const handleSubmit = (event) => {
    clickSubmit();
    if(check)
    {
      alert('Your SUDOKU is either not completed or is wrong, Keep Trying!');
    }
    else
    {
      setTriggerConfetti(!triggerConfetti);
      setTimeout(() =>{
        event.preventDefault()
      console.log('User-Score:', score)
      fetch('https://scores-data-58325-default-rtdb.firebaseio.com/.json',
          {
              method : 'POST',
              headers : {'Content-Type' : 'application/json'},
              body : JSON.stringify(
                  {
                      userScore : score,
                      userName : 'anonymous'
                  }
              )
          }
      ).then(() => NavigateToScore())
      },3500);
    }
}

const navigate=useNavigate();
 const NavigateToScore=()=>{
  navigate('/scores');
 }
//  function checkInputBorder(){

//  }
  return (
    <>
      <SudokuHeader clickSolve ={solveSudoku} clickHint = {checkSudoku} minutes = {minutes} seconds = {seconds} resetSudoku = {resetSudoku}/>
      {triggerConfetti && <Confetti/>}
      
      
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
                          className={(col + 1) % 3 === 0 ? "rBorder" : "" }
                        >
                          <input  autoComplete="off" 
                            onChange={(e) => onInputChange(e, row, col)}
                            value={
                              sudokuArr[row][col] === -1
                                ? ""
                                : sudokuArr[row][col]
                            }
                            id="cellInput"
                            disabled={props.initial[row][col] !== -1}
                            className = {(row <=2 && col <=2) || ((col <= 8 && col > 5) && row <=2) || ((col >=3  && col <= 5) && (row >=3  && row <= 5)) || (col <= 2   && row > 5) || (col > 5   && row > 5)? 'colorId' : ''}
                            // className = {checkIn[row][col] ?'checkInput':""}
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
        <Link to="/">
          <button className="btn">REPLAY</button>
        </Link>          
        <button className="btn" onClick={handleSubmit}>SUBMIT</button> 
        </div>
      </div>
      <Outlet/>
    </>
  );
}

export default SudokuPage;
