import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
 

export default function Movies() {

  const [sessionId, setSessionId] = useState(null);


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
        <>
           <div>Movies Here</div>
        </>
    );
}
