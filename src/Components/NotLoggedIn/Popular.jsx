import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';

export default function Popular() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;
    const [number, setNumber] = useState(0);
    const [nowPlaying, setNowPlaying] = useState([])

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
                console.log(data.results)
                setNowPlaying(data.results)
            }
            )
            .catch(err => console.error(err));


    };

    // 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
    useEffect(() => {
        getNowPlaying();
    }, []);


    return (
        <Container className='p-4 w-100'>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className='font-main text-dark-blue'>What's Popular</h3>
                <div className="d-flex align-items-center justify-content-between border rounded-pill">
                    <span onClick={() => setNumber(0)} className={`pointer px-3 py-2 ${number === 0 && "active"}`}>Now Playing</span>
                    <span onClick={() => setNumber(1)} className={`pointer px-3 py-2 ${number === 1 && "active"}`}>Top Rated</span>
                    <span onClick={() => setNumber(2)} className={`pointer px-3 py-2 ${number === 2 && "active"}`}>Most Watched</span>
                    <span onClick={() => setNumber(3)} className={`pointer px-3 py-2 ${number === 3 && "active"}`}>Upcoming</span>
                </div>
            </div>
            <div className='d-flex scroll-container'>
                <div className="d-flex justify-content-between align-items-center">
                    {number === 0 ?
                        nowPlaying.map(movie => {
                            return (
                                <div className="rounded-3" key={movie.id}>
                                    <div className="mx-2 mb-5 image-container">
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

                        }) : ""
                    }
                </div>

            </div>
        </Container>
    )
}