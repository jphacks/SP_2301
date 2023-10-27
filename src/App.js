import React,  { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./component/Home";
import Load from "./component/Load";
import Music from "./component/Music";
import Music_test from "./component/Music_test";
import Navbar from "./component/Navbar";


function App() {

  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path ="/" element={<Home />}></Route>
        <Route path ="/load" element={<Load />}></Route>
        <Route path ="/musictest" element={<Music />}></Route>
        <Route path ="/music" element={<Music_test />}></Route>
      </Routes>
    </Router>
  )
}

export default App;

