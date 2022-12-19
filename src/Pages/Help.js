import React from "react";
import "./Help.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
function Help(props) {
  return props.trigger2 ? (
    <div className="Help-container">
      <div className="Help-container2">
        <div className="Help-head">
          <p className="Help-head2">HELP</p>
          <button
            className="close-btn"
            onClick={() => props.setTrigger2(false)}
          >
            <CloseRoundedIcon sx={{ color: "white" }} />
          </button>
          {/* {props.children} */}
        </div>
        <div className="Help-content">
          <p className="Help-content2"><FiberManualRecordRoundedIcon sx = {{height: '15px'}} />Sudoku grid consists of 9×9 spaces. You can use only numbers from 1 to 9.</p>
          <p className="Help-content2"><FiberManualRecordRoundedIcon sx = {{height: '15px'}} />Each 3×3 block can only contain numbers from 1 to 9.</p>
          <p className="Help-content2"><FiberManualRecordRoundedIcon sx = {{height: '15px'}} />Each vertical column can only contain numbers from 1 to 9.</p>
          <p className="Help-content2"><FiberManualRecordRoundedIcon sx = {{height: '15px'}} />Each horizontal row can only contain numbers from 1 to 9.</p>
          <p className="Help-content2"><FiberManualRecordRoundedIcon sx = {{height: '15px'}} />Each number in the 3×3 block, vertical column or horizontal row can <span className="rest">be used only once.</span></p> 
          <p className="Help-content2"><FiberManualRecordRoundedIcon sx = {{height: '15px'}} />The game is over when the whole Sudoku grid is correctly filled with <span className="rest">numbers.</span> </p> 
          
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Help;
