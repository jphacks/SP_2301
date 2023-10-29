import React, { useState }  from "react";
import background from '../img/background.png';
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import "../App.css";
import axios from 'axios'; // axiosをインポート
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import button_scan from '../img/button_scan.png';
import button_back from '../img/button_back.png'
import Load from './Load'; 


const CamCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { capturedImage } = location.state;

  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
 
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zindex: 1, 
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end', // 下部にボタンを表示
    zIndex: 2,
  };
  
  const sendToBackend = async () => {
    try {
      // capturedImageをバックエンドに送信
      const response = await axios.post('http://localhost:5000/detect-emo', {
        capturedImage: capturedImage,
      });
  
      // リクエストが成功した場合の処理

      const receivedEmotion = response.data;
      console.log('送信成功', receivedEmotion);

      const emotion = receivedEmotion.emotion;

      navigate("/load", { state: { emotion} });
    } catch (error) {
      // エラーハンドリング
      console.error('送信エラー', error);
    }
}

    const goBack = () => {
        // ボタンがクリックされたときに"Cam.js"に戻る
        navigate("/cam");
    };

    const button_scan_Style = {
      width: '500px',
      height: '250px',
      background: `url(${button_scan})`,
      backgroundSize: 'cover',
      border: 'none',
      top: '68%', // Adjust this value for the scan button
      left: '54%', // Adjust this value for the scan button
      backgroundPosition: 'center center',
      position: "absolute",
    };
    
    const button_back_Style = {
      width: '500px',
      height: '250px',
      background: `url(${button_back})`,
      backgroundSize: 'cover',
      border: 'none',
      top: '68%', // Adjust this value for the back button
      left: '14%', // Adjust this value for the back button
      backgroundPosition: 'center center',
      position: "absolute",
    };
    

    return (
      <div style={containerStyle}>
        <div style={overlayStyle}>
          <div style={contentStyle}>
            <img src={capturedImage} alt="Captured Image" className="capturedImg" />
            <button onClick={sendToBackend} style={button_scan_Style}></button>
            <button onClick={goBack} style={button_back_Style}></button>
          </div>
        </div>
      </div>
    );
};

export default CamCheck;