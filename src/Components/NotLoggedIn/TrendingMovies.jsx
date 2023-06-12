import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'; 

export default function TrendingMovies() {
    const [tmvs, setTmvs] = useState([]);
    const [tWMovies, setTWMovies] = useState([])
    const [showTWMovies, setShowTWMovies] = useState(false)
    const apiKey = import.meta.env.VITE_API_KEY;
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;

    const trendingMvsT = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };
        fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
            .then(response => response.json())
            .then(data =>{
                console.log(data)
                setTmvs(data.results)
            }
            )
            .catch(err => console.error(err));


    };

    const trendingMvsTW = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };
        fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US', options)
            .then(response => response.json())
            .then(data => { 
                console.log(data)
                setTWMovies(data.results)
            }
            )
            .catch(err => console.error(err));


    };

    useEffect(() => {
        trendingMvsT();
        trendingMvsTW()
    }, []); 


    return (
        <Container className='p-4 w-100'>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className='font-main text-dark-blue'>Trending</h3>
                <div className="d-flex align-items-center justify-content-between border rounded-pill">
                   <span onClick={() => setShowTWMovies(false)} className={`pointer px-3 py-2 ${!showTWMovies && "active"}`}>Movies</span>
                   <span onClick={() => setShowTWMovies(true)}  className={`pointer px-3 py-2 ${showTWMovies && "active"}`}>This week</span>
                </div>
            </div>
            <div className='d-flex scroll-container'>
                <div className="d-flex justify-content-between align-items-center">
                    {
                        showTWMovies ? tWMovies.map(movie => { 
                            return (
                                <div className="rounded-3" key={movie.id}>
                                    <div className="mx-2 mb-5 pointer image-container">
                                        <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title
                                        } loading="lazy" />
                                        <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-end align-items-start">
                                            <h5 className="text-capitalize"><Link className='text-decoration-none text-white text-hover-color'>{movie.original_name || movie.name}</Link></h5>
                                            <div className="d-flex align-items-start justify-content-between">
                                                <small>{movie.first_air_date}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        })  :
                        tmvs.map(movie => { 
                            return (
                                <div className="rounded-3" key={movie.id}>
                                    <div className="mx-2 mb-5 pointer image-container">
                                        <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title
                                        } loading="lazy" />
                                        <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-end align-items-start">
                                            <h5 className="text-capitalize"><Link className='text-decoration-none text-white text-hover-color'>{movie.original_title}</Link></h5>
                                            <div className="d-flex align-items-start justify-content-between">
                                                <small>{movie.release_date}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        }) 
                    }
                </div>

            </div>
        </Container>
    )
}