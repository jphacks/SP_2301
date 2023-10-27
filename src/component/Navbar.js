import React from "react";
import "./Navbar"
import testtitle from '../img/title.png';
import axios from 'axios';
import querystring from 'querystring';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

const navbarStyle = {
    backgroundColor: '#ab00fa',  // 背景色
    padding: '5px',  // 余白
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',  // 影
    display: 'flex',
    justifyContent: 'space-between',  // コンテンツを左端と右端に配置
    alignItems: 'center',  // コンテンツを中央に配置
    //textAlign: 'right',//位置
  };

  const testTitleStyle = {
    width: '10%', 
    marginTop: '5px',
    };


const Navbar = () => {

    return (
        <nav style={navbarStyle}>
            <Link to="/">
                <img src={testtitle} style={testTitleStyle}></img>
            </Link>
            <Link >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                ログイン
            </Link>
        </nav>
    )
};

export default Navbar;