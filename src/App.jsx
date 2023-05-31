import { useState, useEffect, createContext } from 'react';
import { createBrowserRouter, RouterProvider, Route, Routes, useParams } from 'react-router-dom';
import LandingPage from './Components/LandingPage'; 
import Layout from './Layout'
import Overview from './Components/Overview';

export const AppContext = createContext(null)

function App() {
  const [requestToken, setRequestToken] = useState(""); 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/overview",
      element: <Overview />
    },
  ]);

  const getRequestToken = async () => {
    const access_token = import.meta.env.VITE_ACCESS_TOKEN
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
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}

export default App
