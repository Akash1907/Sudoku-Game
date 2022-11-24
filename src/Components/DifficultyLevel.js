import React from 'react'
import { Link } from 'react-router-dom';
import "./DifficultyLevel.css";


function DifficultyLevel() {
  return (
    <div className='diffLevel'>
      <div className='diffLevel2'>
        <div className='diffHead'>
          <p className='diffHead2'>DIFFICULTY</p>
        </div>
        <div className='diffs'>
          <Link to = '/sudokuEasy'style={{ textDecoration: 'none' }}>
            <p className='diffs2'>EASY</p>
          </Link>
          <Link to = '/sudokuMedium'style={{ textDecoration: 'none' }}>
            <p className='diffs2'>MEDIUM</p>
          </Link>
          <Link to = '/sudokuHard'style={{ textDecoration: 'none' }}>
            <p className='diffs2'>HARD</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DifficultyLevel