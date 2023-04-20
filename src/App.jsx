import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Movies from './Components/Movies';


function App() {

  return ( 
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
  )
}

export default App
