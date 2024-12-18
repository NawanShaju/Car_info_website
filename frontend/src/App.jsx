import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import './css/navbar.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import AddCar from './pages/AddCar';
import CarPage from './pages/CarPage';
import CarDetails from './pages/CarDetails';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/carPage" element={<CarPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/addCar" element={<AddCar />} />
        <Route path="/carDetails" element={<CarDetails />} />
      </Routes>
    </>
  )
}

export default App
