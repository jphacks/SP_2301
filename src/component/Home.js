import React from "react";
import background from '../img/background.png';
import testtitle from '../img/title.png';
import button from '../img/button_start.png';
import { useNavigate } from "react-router-dom"; 

const Home = () => {    
    const navigate = useNavigate();

    const style = {
        background: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const testTitleStyle = {
        width: '60%', // 画像の幅を3分の1に設定
        marginTop: '20px',
    };

    const goCam = () => {
        navigate("/Cam");
    };

    const buttonStyle = {
        width: '600px', // ボタンの幅を指定
        height: '300px', // ボタンの高さを指定
        background: `url(${button})`,
        backgroundSize: 'cover',
        position: "absolute",
        border: 'none', // ボーダーを非表示に設定
        top: '65%',
    };

    return (
        <div style={style}>
            <img src={testtitle} style={testTitleStyle} alt="Title" />
            <button onClick={goCam} style = {buttonStyle}></button>
        </div>
    );
};
    
export default Home;