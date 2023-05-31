import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage'; 
import Overview from './Components/Overview';

export const AppContext = createContext(null)

function App() {
  const [requestToken, setRequestToken] = useState(""); 

  const getRequestToken = async () => {
    console.log(process.env)
    const access_token = process.env.NODE_ENV === 'development' ? import.meta.env.VITE_ACCESS_TOKEN : REACT_APP_access_token
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}` 
      }
    };
    try {
      const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', options);
      const data = await response.json();
      if (data.success === true) {
        setRequestToken(data.request_token); 
        localStorage.setItem('requestToken', data.request_token);
        
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/overview" element={<Overview />} /> 
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
