import React, { useEffect, useRef, useState } from "react";
import background from '../img/background.png';

const Music = () => {
  const style = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const playerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const playerRef = useRef(null);
  const TIMEOUT_MS = 5000;
  const [playerLoaded, setPlayerLoaded] = useState(false);

  useEffect(() => {
    if (!window.YT || !window.YT.Player) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';

      script.onload = () => {
        if (window.YT && window.YT.Player) {
          playerRef.current = new window.YT.Player('youtube-player', {
            height: '360',
            width: '640',
            videoId: "fhzKLBZJC3w",
            playerVars: {
              autoplay: 1,
              controls: 1,
            },
          });
          setPlayerLoaded(true);
        } else {
          console.error("YouTube Player APIが正しく読み込まれていません。");
        }
      };

      document.body.appendChild(script);

      const timeoutId = setTimeout(() => {
        console.error("YouTube Player APIの読み込みがタイムアウトしました。");
      }, TIMEOUT_MS);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <div style={style}> 
      <div id="youtube-player" style={playerStyle}></div>
    </div>
  );
};

export default Music;
