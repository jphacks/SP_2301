import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigation,  Route, Routes, useNavigate } from "react-router-dom";
import happy from '../img/happy.png';
import angry from '../img/angry.png';
import sad from '../img/sadness.png';
import surprise from '../img/surprise.png';

const Load = () => {
  const navigate = useNavigate();
  const images = [happy, angry, sad, surprise];
  const [position, setPosition] = useState(0);
  const location = useLocation();
  const emotion = location.state.emotion;
  const [dots, setDots] = useState("....");
  const [animationStopped, setAnimationStopped] = useState(false);
  const [jsonDataReceived, setJsonDataReceived] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // フェードアウトの状態
  const [showHappyImage, setShowHappyImage] = useState(false); // happy画像を表示するフラグ
  const [ loading, setLoading ] = useState(true);//初回のローディングを判定する

  useEffect(() => {

    const interval = setInterval(() => {
      if (!animationStopped) {
        setPosition((position + 1) % images.length);
        if (dots === "....") {
          setDots(".");
        } else if (dots === "...") {
          setDots("....");
        } else if (dots === "..") {
          setDots("...");
        } else {
          setDots("..");
        }
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [position, dots, animationStopped, emotion]);

  useEffect(() => {
    if (fadeOut) {
      // フェードアウトが開始したらアニメーションを停止
      setAnimationStopped(true);
    }
  }, [fadeOut]);

  const stopAnimation = () => {
    setFadeOut(true); // フェードアウトを開始
    setTimeout(() => {
      setShowHappyImage(true); // happy画像を表示
    }, 500); // You can adjust the delay as needed

  };

  const sleep = (waitTime)=>{
    const startTime = Date.now();
    while( Date.now() - startTime < waitTime );
  };

useEffect(() => {
      console.log(emotion)
      if(!loading){
        return;
      }
      // リクエストボディを作成
      const requestBody = {
        emotion_type: emotion,
        // 他に必要なデータがあればここで追加
      };
      // POST リクエストを送信
      fetch('http://localhost:5000/api/random', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
        
      })
      .then((data) => {
        console.log(data);
        // レスポンスデータに対する処理を行う
        //let img = emotion;
        console.log(emotion)
        //setLoading(false);
        setTimeout(() => {
          setLoading(false);
        }, 6000);
        //stopAnimation();
        setTimeout(() => {
          stopAnimation();
        }, 10000);
      // 非同期処理を使用して待機し、処理が完了したら navigate を呼び出す
      setTimeout(() => {
        navigate('/music', { state: { data } });
      }, 13000);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      }, [loading, emotion]); // emotionが変更された際に再実行
      //console.log(emotion)
} )

  const imageStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '45vh',
    display: 'flex',
    backgroundColor: 'black',
    justifyContent: 'center',
  };

  const centerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const text_style = {
    color: "white",
    fontSize: "100px",
    margin: "70px",
    transition: "opacity 0.5s", // よりゆっくりとフェードアウトさせるためにトランジションの持続時間を長く設定
    opacity: fadeOut ? 0 : 1, // フェードアウトの状態に応じて不透明度を設定
  };

  const face_text_style = {
    color: "white",
    fontSize: "80px",
    margin: "50px",
    opacity: showHappyImage ? 1 : 0, // Apply the fade-in effect
    transition: "opacity 0.5s", // Increase the duration of the fade-in to 2 seconds
    position: "absolute",
    top: '15%', // Adjust the value to move the text higher
  };

  const happyImageStyle = {
    height: "400px", // Set the desired height
    width: "400px", // Set the desired width
    opacity: showHappyImage ? 1 : 0, // Apply the fade-in effect
    transition: "opacity 2s", // Increase the duration of the fade-in to 2 seconds
    position: "absolute",
    top: '45%',
  };

  let number;
  if(emotion === "happy"){
    number = 0;
  }else if(emotion === "angry"){
    number = 1;
  }else if(emotion === "sad"){
    number = 2;
  }else if(emotion === "surprise"){
    number = 3;
  }
  console.log(number)
  
  return (
    <div>
      <div style={imageStyle}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              background: `url(${image}) center /200px no-repeat`,
              position: 'relative',
              top: 80,
              flex: 1,
              transform: `translateY(${index === position ? '-40px' : '0'})`,
              transition: 'transform 0.5s',
              opacity: fadeOut ? 0 : 1, // フェードアウトの状態に応じて不透明度を設定
            }}
          ></div>
        ))}
      </div>
      <div style={imageStyle}>
        {showHappyImage ? (
          <div style={centerContentStyle}>
            <p style={{ ...face_text_style}}>あなたの表情は{emotion}です！</p>
            <img src={ images[number] } alt="emotion" style={happyImageStyle} />
          </div>
        ) : (
          <div style={centerContentStyle}>
            <p style={text_style}>Loading{dots}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Load;