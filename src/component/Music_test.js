import React, { useState } from "react";
import YouTube from "react-youtube";
import backgroundImage from "../img/background.png"; // 画像ファイルのパスを指定
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const { data } = location.state;

  console.log(data);
  /*
  const jsonData = [
    {
      name: "specials",
      artist: "King gne",
      videoId: "fhzKLBZJC3w",
      emotion: "joy"
    },
    {
      name: "一途",
      artist: "King gne",
      videoId: "hm1na9R2uYA",
      emotion: "joy"
    },
  ]*/

  const [selectedDataId, setSelectedDataId] = useState(0)
 
  const selectData = data[selectedDataId];

  const videoId = selectData.videoID;
  const songName = selectData.name;

  const artistName = selectData.artist;
  

  const onPlayerReady = (event) => {
    const player = event.target;
    player.pauseVideo();
  };

  const onPlayerStateChange = (event) => {
    const player = event.target;
    player.playVideo();
  };

  const opts = {
    playerVars: {
      autoplay: 0, // 自動再生を無効にする
    },
  };

  const nextSong = () => {
    setSelectedDataId((prevIndex) => (prevIndex + 1) % data.length);
  };

  const backSong = () => {
    setSelectedDataId((prevIndex) => (prevIndex - 1) % data.length);
  }

  console.log(data.length)
  const containerStyle = {
    position: "relative",
    width: "100vw",
    height: "88vh",
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `url(${backgroundImage}) center/cover no-repeat fixed`,
    zIndex: -1,
  };

  const videoContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 0,
  };

  const rectangleStyle = {
    position: "absolute",
    top: "21.4%",
    left: "25.9%",
    width: "48%",
    height: "56.5%",
    border: "1px solid #fff",
    zIndex: -1,//枠
  };

  const songdetails = {
    position: "absolute",
    top: "12%",
    left: "38%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: "50px",
    textAlign: "center",
  };//曲の詳細

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <div style={videoContainerStyle}>
        <YouTube
          videoId={videoId}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>
      <div style={rectangleStyle}></div>
      <div style={songdetails}>
        <p>{songName}/{artistName}</p>
        <button onClick={nextSong}><FontAwesomeIcon icon={faAnglesRight} /></button>
        <button className="backSongbtn" onClick={backSong}><FontAwesomeIcon icon={faAnglesRight} /></button>
      </div>
    </div>
  );
}

export default App;







