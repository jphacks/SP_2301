import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import background from '../img/background.png'
import Webcam from "react-webcam";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Cam = () => {
  const navigate = useNavigate();
  const style = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', 
    position: 'absolute',
    width: '100%',
  };

  const videoConstraints = {
    width: 720,
    height: 360,
    facingMode: "user"
  };

  const webcamRef = React.useRef(null);
  const [capturedImage, setCapturedImages] = useState(null);

  const capture = React.useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    setCapturedImages(imgSrc);

    navigate("/camcheck", { state: { capturedImage: imgSrc } });
  }, [webcamRef, navigate]);

  const WebcamCapture = () => {
    return (
      <div style={{ position: 'absolute', top: -250 }}>
        <Webcam
          audio={false}
          mirrored={true}
          height={360}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={720}
          videoConstraints={videoConstraints}
        />
      </div>
    );
  }
  
  

  return (
    <div style={style}>
      <h1>顔を撮影しよう</h1>
      <div className="webcam"><WebcamCapture /></div>
      <button className="cambtn" onClick={capture}><FontAwesomeIcon icon={faCamera} /></button>
      {capturedImage && <img src={capturedImage} alt="" />}
    </div>
  );

}

export default Cam;