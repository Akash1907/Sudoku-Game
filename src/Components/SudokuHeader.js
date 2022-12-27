import React, { useEffect, useState } from "react";
import "./SudokuHeader.css";
import { Link } from "react-router-dom";
import TimerIcon from '@mui/icons-material/Timer';

function SudokuHeader(props) {
  return (
    <div className="sudokuPage-header">
      <div className="timer-container">
        <div className="timer">
          <TimerIcon sx={{height : "3rem", width : "3rem"}} className= 'timer-icon'/>
          <div className='time'><p className= 'time-p'>{props.hour < 10 ? "0" + props.hour : props.hour}</p></div>
          <div className= 'midDot'>:</div>
          <div className= 'time'><p className= 'time-p'>{props.minutes < 10 ? "0" + props.minutes : props.minutes}</p></div>
          <div className= 'midDot'>:</div>
          <div className= 'time'><p className= 'time-p'>{props.seconds < 10 ? "0" + props.seconds : props.seconds}</p></div>
        </div>
      </div>
      <img className="logooo" src="logo.png" />
      <div className="res-score">
        <button className="btn" onClick={props.resetSudoku} >RESET</button>
        <Link to="/"><button className="btn">REPLAY</button></Link>
      </div>
    </div>
  );
}

export default SudokuHeader;
