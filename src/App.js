import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import SelectOpponentPage from './pages/SelectOpponentPage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/selectopponent" element={<SelectOpponentPage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;