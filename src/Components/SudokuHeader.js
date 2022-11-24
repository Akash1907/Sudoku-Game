import React, { useEffect, useState } from 'react'
import './SudokuHeader.css';
import { Link } from 'react-router-dom';

function SudokuHeader(props) {

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  console.log(props)
  var timer;
    useEffect(() =>{
      const timer = setInterval(() =>{
      setSeconds(seconds+1);
      if(seconds === 59){
        setMinutes(minutes+1);
        setSeconds(0);
      }
    },1000)    
    return ()=>{
      clearInterval(timer)
    }
  })
  

  return (
    <div className='sudokuPage-container'>
        
        
        <div className='timer-container'>
          <Link to = '/'>
           <button className='btn'>PLAY AGAIN</button>
          </Link>
          <p className='timer'>{minutes <10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>
        </div>
        <img className='logooo' src='logo.png' />
        <div className='res-score'>
            <button className='btn' onClick={props.clickHint}>HINTS</button>
            <button className='btn' onClick={props.clickSolve}>SOLVE</button>
        </div>
    </div>
  )
}

export default SudokuHeader