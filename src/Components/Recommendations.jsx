import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


const Recommendations = ({ movieId, accessTkns }) => {

  const [rMovies, setRMovies] = useState([])
  const getRMovies = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessTkns}`
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => {
        setRMovies(data.results);
      })
      .catch(err => console.error(err));

  }

  useEffect(() => {
    getRMovies();
  }, []);


  return (
    <>
      {
        rMovies.length &&
        <Container className='p-xl-4 w-100 mb-4'>
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h4 className='text-dark-blue font-main'> Recommendations</h4>
          </div>
          <div className='d-flex align-items-center scroll-container mb-5' style={{ height: "250px" }}>
            <div className="d-flex justify-content-between align-items-center">
              {
                rMovies.map(el => {
                  return (
                    <div className="rounded-3" key={el.id}>

                      <div className="mx-2 small-card-container pointer">
                        <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={el.original_title} loading="lazy" />
                        <div className="small-card-overlay text-white px-2 pb-4 pt-3 bottom-0 rounded-bottom d-flex justify-content-center align-items-center">
                          <div className="">
                            <h5 className="text-capitalize fs-6">
                              <span className='text-decoration-none text-white'>{el.title || el.original_title}
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <h5 className="text-capitalize fs-6">
                          <span className='text-decoration-none text-dark'>{el.title || el.original_title}
                          </span>
                        </h5>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </Container>
      }

    </>
  )
}

export default Recommendations;


