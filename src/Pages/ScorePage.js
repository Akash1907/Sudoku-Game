import React from "react";
import "./ScorePage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";


function ScorePage() {
  const imgArr = [{img:'avatar3.webp', nam : 'Akash'}, {img: 'avatar4.webp', nam : 'Vikash'}, {img: 'avatar5.webp', nam : 'Shyam'}, {img: 'avatar6.webp', nam : 'Rahul'}, {img: 'avatar7.webp', nam : 'Shobhit'}, {img: 'avatar8.webp', nam : 'Rocky'}, {img: 'avatar9.webp', nam : 'Sameer'}, {img: 'avatar10.webp', nam : 'Tina'}]
  const randomIndex = Math.floor(Math.random() * imgArr.length);
  const randomIndex1 = Math.floor(Math.random() * imgArr.length);
  const randomIndex2 = Math.floor(Math.random() * imgArr.length);
  const randomIndex3 = Math.floor(Math.random() * imgArr.length);
  const randomIndex4 = Math.floor(Math.random() * imgArr.length);
  const randomIndex5 = Math.floor(Math.random() * imgArr.length);

  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState([]);
  const getScores = async () => {
    const response = await fetch(
      "https://sudoku-score-default-rtdb.firebaseio.com/.json"
    );
    const data = await response.json();
    setScores(data);
    setLoading(false);
  };
  useEffect(() => {
    getScores();
  }, []);

  var arrayObjects = Object.values(scores);
  var arrayScores = [];
  arrayObjects.forEach((e) => {
    arrayScores.push(e.userScore);
  });
  console.log(arrayScores);

  const sortArray = [];

  for (var i = 0; i < arrayScores.length; i++) {
    if (!sortArray.includes(arrayScores[i])) 
    sortArray.push(arrayScores[i]);
  }
  sortArray.sort();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="scorePage">
            <div className="scorePage-container">
              <div className="logo-container">
                <img src="logo.png" alt="no img found" className="logop" />
              </div>
              <div className="score-board">
                <div className="score-board-container">
                  <div className="stars">
                    <img className="five-star" src="5-star.png" alt="no-img found" />
                  </div>
                  <div className="completed-container">
                    <img src="completed.jpeg" alt="no-img found" className="completed" />
                  </div>
                </div>
                <div className="inside-score-container">
                  <div className="profile-pic">
                    <img src={imgArr[randomIndex].img} className="avatar-img" alt="no img found" />
                  </div>
                  <div className="player-name">
                    <p className="user-name">USER NAME</p>
                    <p className="player-name2">{imgArr[randomIndex].nam} </p>
                  </div>
                  <div className="score-display">
                    <p className="onlyScore">SCORE</p>
                    <div className="score-display2">
                      <img src="coin.png" className="coin-img" />
                      <div className="main-score">
                        <p className="main-score2">{arrayScores[arrayScores.length - 1]}</p>
                      </div>
                    </div>
                  </div>
                  <div className="replay-btn">
                    <Link to="/">
                      <button className="replay-btn2">REPLAY</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className= 'lead-container'>
              <a href= '#leaderboard'><button className= 'lead-btn'>LEADERBOARD</button></a>
              </div>
            </div>
            <div className="leaderboard-container" id= 'leaderboard'>
              <div className="leaderboard-banner">
                <p className="leaderboard">LEADERBOARD</p>
              </div>
              <div className="top-scorer-container">
                <div className="top-scorer">
                  <p className="rank">#1</p>
                  <img src={imgArr[randomIndex1].img} alt="no img found" className="avatar-leader-img"/>
                  <p className="player-leader-name">{imgArr[randomIndex1].nam}</p>
                  <div className="leader-score-container">
                    <img src="coin.png" className="coin-img" />
                    <p className="player-leader-score">{sortArray[sortArray.length - 1]}</p>
                  </div>
                </div>
                <div className="top-scorer">
                  <p className="rank">#2</p>
                  <img src={imgArr[randomIndex2].img} alt="no img found" className="avatar-leader-img"/>
                  <p className="player-leader-name">{imgArr[randomIndex2].nam}</p>
                  <div className="leader-score-container">
                    <img src="coin.png" className="coin-img" />
                    <p className="player-leader-score">{sortArray[sortArray.length - 2]}</p>
                  </div>                </div>
                <div className="top-scorer">
                  <p className="rank">#3</p>
                  <img src={imgArr[randomIndex3].img} alt="no img found" className="avatar-leader-img"/>
                  <p className="player-leader-name">{imgArr[randomIndex3].nam}</p>
                  <div className="leader-score-container">
                    <img src="coin.png" className="coin-img" />
                    <p className="player-leader-score">{sortArray[sortArray.length - 3]}</p>
                  </div>                </div>
                <div className="top-scorer">
                  <p className="rank">#4</p>
                  <img src={imgArr[randomIndex4].img} alt="no img found" className="avatar-leader-img"/>
                  <p className="player-leader-name">{imgArr[randomIndex4].nam}</p>
                  <div className="leader-score-container">
                    <img src="coin.png" className="coin-img" />
                    <p className="player-leader-score">{sortArray[sortArray.length - 4]}</p>
                  </div>                </div>
                <div className="top-scorer">
                  <p className="rank">#5</p>
                  <img src={imgArr[randomIndex5].img} alt="no img found" className="avatar-leader-img"/>
                  <p className="player-leader-name">{imgArr[randomIndex5].nam}</p>
                  <div className="leader-score-container">
                    <img src="coin.png" className="coin-img" />
                    <p className="player-leader-score">{sortArray[sortArray.length - 5]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ScorePage;
