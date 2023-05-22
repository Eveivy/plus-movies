import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Movies from './Components/Movies';

export const AppContext = createContext(null)

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjVjMTAyMzFhNjkzYmVjMTY5ZWM0Yjg1YzUwNDU0OCIsInN1YiI6IjY0MzZkZWM1OTQ1ZDM2MDEwMjFiY2NjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.owofA-ly4ebTa7JmEYEcCePB85_LJSSuxyGIT4o6-ME'
//   }
// };

// const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', options)
// const data = await response.json()
// if (data.success === true) {
//   window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=https://plus-movies.onrender.com/`
//   const options2 = {
//     method: 'POST',
//     headers: {
//       accept: 'application/json',
//       'content-type': 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjVjMTAyMzFhNjkzYmVjMTY5ZWM0Yjg1YzUwNDU0OCIsInN1YiI6IjY0MzZkZWM1OTQ1ZDM2MDEwMjFiY2NjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.owofA-ly4ebTa7JmEYEcCePB85_LJSSuxyGIT4o6-ME'
//     },
//     body: JSON.stringify({ request_token: data.request_token })
//   };

//   const sessionResponse = await fetch('https://api.themoviedb.org/3/authentication//session/new', options2)
//   const sessionID = await sessionResponse.json()
//   console.log(sessionID)
// }




// fetch()
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));



function App() {
  const [requestToken, setRequestToken] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjVjMTAyMzFhNjkzYmVjMTY5ZWM0Yjg1YzUwNDU0OCIsInN1YiI6IjY0MzZkZWM1OTQ1ZDM2MDEwMjFiY2NjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.owofA-ly4ebTa7JmEYEcCePB85_LJSSuxyGIT4o6-ME'
    }
  };

  const getRequestToken = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', options);
      const data = await response.json();
      if (data.success === true) {
        setRequestToken(data.request_token);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getRequestToken();
  }, []); 

  return (
    <AppContext.Provider value={{requestToken}}>
      <Router>
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path="/movies" element={<Movies />} /> 
        </Routes>
      </Router> 
    </AppContext.Provider>
  )
}

export default App
