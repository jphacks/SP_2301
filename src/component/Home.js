import React from "react";
import background from '../img/background.png';
import testtitle from '../img/title.png';


const Home = () => {    
    const style = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };

    const testTitleStyle = {
        width: '60%', // 画像の幅を3分の1に設定
        marginTop: '20px',
    };

      return (
        <div style={style}>
          <img src={testtitle} style={testTitleStyle}></img>
        </div>
      );
};
    
  
export default Home;