/* eslint-disable no-unused-vars */


import React, { useState } from 'react';
import Home from './Components/Home';
import TransferImage from './Components/TransferImage';
import BackgroundRemover from './Components/BackgroundRemover';
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import ModelViews from './Components/ModelViews';
import ImageQuality from './Components/ImageQuality';
import RemoveText from './Components/RemoveText';

const App = () => {
  
  return (
  <>
  <Navbar/>
  <hr className='bg-slate-400 h-[1px]'/>
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<ModelViews />} />
        <Route path="/models/styleTransfer" element={<TransferImage />} />
        <Route path="/models/backgroundRemover" element={<BackgroundRemover />} />
        <Route path="/models/imageQuality" element={<ImageQuality />} />
        <Route path="/models/removeText" element={<RemoveText/>} />
  </Routes>
  
  {/* // <BackgroundRemover/> */}

  </>
  
  
  );
  
};

export default App;

