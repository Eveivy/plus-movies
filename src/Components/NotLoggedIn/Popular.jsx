import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import RadialProgressBar from './ProgressBar';

export default function Popular() {
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;
    const [number, setNumber] = useState(3);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [mostWatched, setMostWatched] = useState([]);
    const [upcoming, setUpcoming] = useState([])

    const getNowPlaying = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2', options)
            .then(response => response.json())
            .then(data => {
                setNowPlaying(data.results)
            }
            )
            .catch(err => console.error(err));


    };

    const getTopRated = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(data => { 
                setTopRated(data.results)
            }
            )
            .catch(err => console.error(err));


    };

    const getMostWatched = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(data => { 
                setMostWatched(data.results)
            }
            )
            .catch(err => console.error(err));


    };

    const getUpcoming = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };
        fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2', options)
            .then(response => response.json())
            .then(data => { 
                setUpcoming(data.results);
            }
            )
            .catch(err => console.error(err));


    };

    useEffect(() => {
        getNowPlaying();
        getTopRated();
        getMostWatched();
        getUpcoming();
    }, []);


    return (
        <Container className='p-xl-4 w-100'>
            <div className="d-xl-flex align-items-center justify-content-between mb-4">
                <h3 className='font-main text-dark-blue py-3 py-xl-0'>What's Popular</h3>
                <div className="d-flex align-items-center justify-content-between border px-2 px-xl-0 rounded-pill ">
                    <span onClick={() => setNumber(0)} className={`pointer px-xl-3 px-2 py-2 fs-8 ${number === 0 && "active"}`}>Now Playing</span>
                    <span onClick={() => setNumber(1)} className={`pointer px-xl-3 px-2 py-2 fs-8 ${number === 1 && "active"}`}>Top Rated</span>
                    <span onClick={() => setNumber(2)} className={`pointer px-xl-3 px-2 py-2 fs-8 ${number === 2 && "active"}`}>Most Watched</span>
                    <span onClick={() => setNumber(3)} className={`pointer px-xl-3 px-2 py-2 fs-8 ${number === 3 && "active"}`}>Discover</span>
                </div>
            </div>
            <div className='d-flex scroll-container'>
                <div className="d-flex justify-content-between align-items-center">
                    {number === 0 ?
                        nowPlaying.map(movie => {
                            return (
                                <div className="rounded-3" key={movie.id}>
                                    <div className="mx-2 mb-5 image-container">
                                        <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} loading="lazy" />
                                        <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-between align-items-start">
                                            <div className='mt-5 d-flex align-items-center justify-content-end w-100'>
                                                <RadialProgressBar percentage={Math.floor(movie.vote_average * 10)} rad={30} strokeW={5}/>
                                            </div>
                                            <div className="">
                                                <h5 className="text-capitalize"><Link to={`/${movie.id}-${movie.title ||movie.original_title || movie.original_name}`}
                                                className='text-decoration-none text-white text-hover-color'>{movie.title || movie.original_title}</Link></h5>
                                                <div className="d-flex align-items-start justify-content-between">
                                                    <small>{movie.release_date}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        }) : number === 1 ? topRated.map(movie => {
                            return (
                                <div className="rounded-3" key={movie.id}>
                                    <div className="mx-2 mb-5 image-container">
                                        <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} loading="lazy" />
                                        <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-between align-items-start">
                                            <div className='mt-5 d-flex align-items-center justify-content-end w-100'>
                                                <RadialProgressBar percentage={Math.floor(movie.vote_average * 10)} rad={30} strokeW={5}/>
                                            </div>
                                            <div className="">
                                                <h5 className="text-capitalize"><Link to={`/${movie.id}-${movie.title ||movie.original_title || movie.original_name}`} className='text-decoration-none text-white text-hover-color'>{movie.title || movie.original_title}</Link></h5>
                                                <div className="d-flex align-items-start justify-content-between">
                                                    <small>{movie.release_date}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        }) : number === 2 ? mostWatched.map(movie => {
                            return (
                                <div className="rounded-3" key={movie.id}>
                                    <div className="mx-2 mb-5 image-container">
                                        <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} loading="lazy" />
                                        <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-between align-items-start">
                                            <div className='mt-5 d-flex align-items-center justify-content-end w-100'>
                                                <RadialProgressBar percentage={Math.floor(movie.vote_average * 10)} rad={30} strokeW={5}/>
                                            </div>
                                            <div className="">
                                                <h5 className="text-capitalize"><Link to={`/${movie.id}-${movie.title ||movie.original_title || movie.original_name}`} className='text-decoration-none text-white text-hover-color'>{movie.title || movie.original_title}</Link></h5>
                                                <div className="d-flex align-items-start justify-content-between">
                                                    <small>{movie.release_date}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        }) : upcoming.map(movie => {
                            return (
                                <div className="rounded-3" key={movie.id}>
                                    <div className="mx-2 mb-5 image-container">
                                        <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} loading="lazy" />
                                        <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-between align-items-start">
                                            <div className='mt-5 d-flex align-items-center justify-content-end w-100'>
                                                <RadialProgressBar percentage={Math.floor(movie.vote_average * 10)} rad={30} strokeW={5}/>
                                            </div>
                                            <div className="">
                                                <h5 className="text-capitalize"><Link to={`/${movie.id}-${movie.title ||movie.original_title || movie.original_name}`} className='text-decoration-none text-white text-hover-color'>{movie.title || movie.original_title}</Link></h5>
                                                <div className="d-flex align-items-start justify-content-between">
                                                    <small>{movie.release_date}</small>
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