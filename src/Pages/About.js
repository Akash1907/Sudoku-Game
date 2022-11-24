import React from 'react'
import './About.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
function About(props) {
  return ( props.trigger)? (
    <div className='about-container'>
        <div className='about-container2'>
            <div className='about-head'>
                <p className='about-head2'>ABOUT</p>
                <button className='close-btn' onClick={() => props.setTrigger(false)}><CloseRoundedIcon sx ={{color: "white"}}/></button>
                {/* {props.children} */}
            </div>
            <div className='about-content'>
                <p className='about-content2'>
                Sudoku (/suːˈdoʊkuː, -ˈdɒk-, sə-/; Japanese: 数独, romanized: sūdoku, lit. 'digit-single'; originally called Number Place) is a logic-based,combinatorial number-placement puzzle. The sole purpose of this game is having fun with mental exercise. Soduko is one of the famous mind games. We are solving problems like boredom, mental fatigue through this game. 
                </p>
                <p className='about-content2'>HAPPY PLAYING!</p>
            </div>
        </div>
    </div>
  ) : "";
}

export default About