import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Layout from './Components/Layout';
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
  const [sessionId, setSessionId] = useState(null);

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
  // console.log(requestToken)
  // window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://plus-movies.onrender.com/movies`
  // const getRequestToken = () => {
  //   console.log('hello')
  // }
  useEffect(() => {
    getRequestToken();
  }, []);

  // const getSessionId = async () => {
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       accept: 'application/json',
  //       'content-type': 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjVjMTAyMzFhNjkzYmVjMTY5ZWM0Yjg1YzUwNDU0OCIsInN1YiI6IjY0MzZkZWM1OTQ1ZDM2MDEwMjFiY2NjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.owofA-ly4ebTa7JmEYEcCePB85_LJSSuxyGIT4o6-ME'
  //     },
  //     body: JSON.stringify({ request_token: requestToken })
  //   };
  //   try {
  //     const response = await fetch('https://api.themoviedb.org/3/authentication//session/new', options);
  //     const data = await response.json();
  //     if (data.success === true) {
  //       setSessionId(data.sessionId);
  //       window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://plus-movies.onrender.com/movies`
  //     }
  //     console.log(data)
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }

  // };


  return (
    <AppContext.Provider value={{ requestToken }}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/movies" element={<Movies />} />
          </Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
