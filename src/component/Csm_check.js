import React, { useState }  from "react";
import background from '../img/background.png';
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import "../App.css";
import axios from 'axios'; // axiosをインポート
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
    zindex: 2,
  };

  const sendBtnStyle = {
    position: 'absolute',
    left: 750,
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

      navigate('/Load', { state: { emotion} });
    } catch (error) {
      // エラーハンドリング
      console.error('送信エラー', error);
    }
}

    const goBack = () => {
        // ボタンがクリックされたときに"Cam.js"に戻る
        navigate("/Cam");
    };



  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <div style={contentStyle}>
            <button onClick={goBack}><FontAwesomeIcon icon={faArrowLeft} /></button> {/* "Cam.js"に戻るボタン */}
            <img src={capturedImage} alt="Captured Image" className="capturedImg"/>
            <div style={sendBtnStyle}>
                <button onClick={sendToBackend}>感情を判定</button>
            </div>
            <div  className="emoe">
            </div>
        </div>
      </div>
    </div>
  );
};

export default CamCheck;