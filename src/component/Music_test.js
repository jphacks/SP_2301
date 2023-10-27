import React from "react";
import YouTube from "react-youtube";
import backgroundImage from "../img/background.png"; // 画像ファイルのパスを指定

function App() {
    const videoId = "fhzKLBZJC3w";

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
      // ここにビデオの再生に関する設定を追加できます
      autoplay: 0, // 自動再生を有効にする
    },
  };

  const containerStyle = {
    position: "relative",
    width: "100vw", // 画面の幅いっぱい
    height: "100vh", // 画面の高さいっぱい
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `url(${backgroundImage}) center/cover no-repeat fixed`, // 背景画像を設定
    zIndex: -1, // YouTubeビデオの下に配置
  };

  const videoContainerStyle = {
    position: "absolute",
    top: "50%", // 画面の中央より下に配置
    left: "50%",
    transform: "translate(-50%, -50%)", // 中央配置
    zIndex: 0, // 背景画像の上に配置
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div> {/* 背景画像 */}
      <div style={videoContainerStyle}>
        <YouTube
          videoId={videoId} 
          //opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>
    </div>
  );
}

export default App;
