import { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import emptyImage from '../assets/images/image-empty.png'
import { Link } from 'react-router-dom';


import { DetailsContext } from './Details';

const Recommendations = () => {
  const pageContext = useContext(DetailsContext);

  const [rMovies, setRMovies] = useState([])

  const getRMovies = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${pageContext.access_token}`
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${pageContext.id}/recommendations?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => {
        setRMovies(data.results);
        // console.log(data.results);
      })
      .catch(err => console.error(err));

  }

  useEffect(() => {
    getRMovies();
  }, []);


  return (
    <>
      {
         rMovies && rMovies.length > 0 &&
        <Container className='p-xl-4 w-100 mb-4'>
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h4 className='text-main font-main'> Recommendations</h4>
          </div>
          <div className='d-flex align-items-center scroll-container mb-5' style={{ height: "250px" }}>
            <div className="d-flex justify-content-between align-items-center">
              {
                rMovies.map(el => {
                  return (
                    <div className="rounded-3" key={el.id}>

                      <div className="mx-2 small-card-container pointer" onClick={() => pageContext.getAnotherMovie(el.media_type, el.id, el.title || el.original_title)}>
                        {
                          el.poster_path ?
                            <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={el.original_title} loading="lazy" />
                            : <div className='bg-dark w-100 h-100 rounded-3 d-flex align-items-center justify-content-center'>
                              <img src={emptyImage} alt="image not found" />
                            </div>
                        }
                        <div className="small-card-overlay text-white px-2 pb-4 pt-3 bottom-0 rounded-bottom d-flex justify-content-between align-items-end">
                          <div className="d-flex align-items-center">
                            <span>{el.release_date !== "" && moment(el.release_date).format('L')}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <span title='Add to favourite' className='d-flex align-items-center pointer ms-2'><box-icon name='heart' color="#ff0088d4" size="20px"></box-icon></span>
                            <span title='Add to watchlist' className='d-flex align-items-center pointer ms-2'><box-icon name='bookmark' color="#ff0088d4" size="20px"></box-icon></span>
                            <span title='Rate it' className='d-flex align-items-center pointer ms-2'><box-icon name='star' color="#ff0088d4" size="20px"></box-icon></span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 d-flex justify-content-between align-items-center text-main fs-7 pointer">
                        <h5 className="text-capitalize fs-7 mb-0">
                          <span className='text-decoration-none text-nowrap'>
                            {el.title.length > 25 || el.original_title.length > 25
                              ? (el.title || el.original_title).substring(0, 25 - 3) + '...'
                              : el.title || el.original_title}
                          </span>
                        </h5>
                        <span className="d-block">{Math.floor(el.vote_average * 10)}%</span>
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


