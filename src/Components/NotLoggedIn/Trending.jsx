import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import RadialProgressBar from './ProgressBar';


export default function Trending() {
    const [todayMovies, setTodayMovies] = useState([]);
    const [thisWeekMovies, setThisWeekMovies] = useState([])
    const [showThisWeekMovies, setShowThisWeekMovies] = useState(false)
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;

    const getTrendingMvsToday = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };
        fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
            .then(response => response.json())
            .then(data => { 
                setTodayMovies(data.results)
            }
            )
            .catch(err => console.error(err));


    };

    const getTrendingMvsThisWeek = async () => {
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
                console.log(data.results)
                setThisWeekMovies(data.results)
            }
            )
            .catch(err => console.error(err));


    };

    useEffect(() => {
        getTrendingMvsToday();
        getTrendingMvsThisWeek()
    }, []);

    return (
        <Container className='p-4 w-100 mb-4'>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className='font-main text-dark-blue'>Trending</h3>
                <div className="d-flex align-items-center justify-content-between border rounded-pill">
                    <span onClick={() => setShowThisWeekMovies(false)} className={`pointer px-3 py-2 ${!showThisWeekMovies && "active"}`}>Today</span>
                    <span onClick={() => setShowThisWeekMovies(true)} className={`pointer px-3 py-2 ${showThisWeekMovies && "active"}`}>This Week</span>
                </div>
            </div>
            <div className='d-flex scroll-container'>
                <div className="d-flex justify-content-between align-items-center">
                    {
                        showThisWeekMovies ? thisWeekMovies.map(movie => {
                            return (
                                <div className="rounded-3" key={movie.id}>
                                    <div className="mx-2 mb-5 image-container">
                                        <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title
                                        } loading="lazy" />
                                        <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-between align-items-start">
                                            <div className='mt-5 d-flex align-items-center justify-content-end w-100'>
                                                <RadialProgressBar percentage={Math.floor(movie.vote_average * 10)} rad={30} strokeW={5} />
                                            </div>
                                            <div className="">
                                                <h5 className="text-capitalize">
                                                    <Link to={`/${movie.id}-${movie.title || movie.original_title || movie.original_name}`}
                                                        className='text-decoration-none text-white text-hover-color'>{movie.title || movie.original_title || movie.original_name}</Link>
                                                </h5>
                                                <div className="d-flex align-items-start justify-content-between">
                                                    <small>{movie.release_date ||movie.first_air_date}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        }) :
                            todayMovies.map(movie => {
                                return (
                                    <div className="rounded-3" key={movie.id}>
                                        <div className="mx-2 mb-5 image-container">
                                            <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title
                                            } loading="lazy" />
                                            <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-between align-items-start">
                                                <div className='mt-5 d-flex align-items-center justify-content-end w-100'>
                                                    <RadialProgressBar percentage={Math.floor(movie.vote_average * 10)} rad={30} strokeW={5} />
                                                </div>
                                                <div className="">
                                                    <h5 className="text-capitalize">
                                                        <Link to={`/${movie.id}-${movie.title || movie.original_title || movie.original_name}`}
                                                            className='text-decoration-none text-white text-hover-color'>{movie.original_title || movie.original_name}
                                                        </Link></h5>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <small>{movie.release_date || movie.first_air_date}</small>
                                                    </div>
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