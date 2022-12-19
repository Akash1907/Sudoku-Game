import React, { useState } from "react";
import About from "../Pages/About";
import Help from "../Pages/Help";
import DifficultyLevel from "./DifficultyLevel";
import "./Header.css";
function Header() {
  const [aboutPopup, setAboutPopup] = useState(false);
  const [helpPopup, setHelpPopup] = useState(false);
  function aboutClick() {
    setAboutPopup(true);
    setHelpPopup(false);
  }
  function helpClick() {
    setAboutPopup(false);
    setHelpPopup(true);
  }

  return (
    <div className="container">
      <div className="header">
        <button className="btn" onClick={aboutClick}>
          About
        </button>
        <img className="logo" src="logo.png" />
        <button className="btn" onClick={helpClick}>
          Help!
        </button>
      </div>
      {!aboutPopup && helpPopup ? (
        <Help trigger2={helpPopup} setTrigger2={setHelpPopup} />
      ) : (
        ""
      )}
      {!helpPopup && aboutPopup ? (
        <About trigger={aboutPopup} setTrigger={setAboutPopup} />
      ) : (
        ""
      )}

      {!aboutPopup && !helpPopup ? <DifficultyLevel /> : ""}
    </div>
  );
}

export default Header;
