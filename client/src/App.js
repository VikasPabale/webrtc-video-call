import React from 'react';
import Home from './pages/Home';
import Call from './pages/Call';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/call/:roomId" element={<Call />} />
      </Routes>
    </BrowserRouter>
  );
}
