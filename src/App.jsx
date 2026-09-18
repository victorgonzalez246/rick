import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import './styles/index.css';

function App() {
  const [totalCharacters, setTotalCharacters] = useState(0);

  return (
    <div className="app-container">
      <Navbar totalCharacters={totalCharacters} />
      
      <Routes>
        <Route path="/" element={<Home setTotalCharacters={setTotalCharacters} />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </div>
  );
}

export default App;
