import React, { useEffect, useState } from "react";
import "./SudokuHeader.css";
import { Link } from "react-router-dom";
import TimerIcon from '@mui/icons-material/Timer';

function SudokuHeader(props) {
  return (
    <div className="sudokuPage-header">
      <div className="timer-container">
        <button className="btn" onClick={props.resetSudoku} >RESET</button>
        <p className="timer">
          <TimerIcon sx={{height : "2rem" ,width : "2rem"}}/>
          {props.minutes < 10 ? "0" + props.minutes : props.minutes}:
          {props.seconds < 10 ? "0" + props.seconds : props.seconds}
        </p>
      </div>
      <img className="logooo" src="logo.png" />
      <div className="res-score">
        <button className="btn" onClick={props.clickHint}>
          HINTS
        </button>
        <button className="btn" onClick={props.clickSolve}>
          SOLVE
        </button>
      </div>
    </div>
  );
}

export default SudokuHeader;
