import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage'; 
import Movies from './Components/Movies';

export const AppContext = createContext(null)

function App() {
  const [requestToken, setRequestToken] = useState(null);

  const getRequestToken = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjVjMTAyMzFhNjkzYmVjMTY5ZWM0Yjg1YzUwNDU0OCIsInN1YiI6IjY0MzZkZWM1OTQ1ZDM2MDEwMjFiY2NjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.owofA-ly4ebTa7JmEYEcCePB85_LJSSuxyGIT4o6-ME'
      }
    };
    try {
      const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', options);
      const data = await response.json();
      if (data.success === true) {
        setRequestToken(data.request_token); 
      }else{
        throw new Error('Ooopss...')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 
  useEffect(() => {
    getRequestToken();
  }, []); 

  return (
    <AppContext.Provider value={{ requestToken }}>
      <Router>
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/movies" element={<Movies />} /> 
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
