import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from "../../assets/Images/wednesday-poster.jpg"

export default function TrendingMovies() {
    const [tmvs, setTmvs] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY;
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;

    const trendingMvs = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };
        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
            .then(response => response.json())
            .then(data =>
                setTmvs(data.results)
            )
            .catch(err => console.error(err));


    };

    useEffect(() => {
        trendingMvs();
    }, []);

    // const list = 

    return (
        <Container className='p-4 w-100'>
            <div className="d-flex align-items-center mb-4">
                <h3 className='font-main text-dark-blue'>Trending</h3>
            </div>
            <div className='d-flex scroll-container'>
                <div className="d-flex justify-content-between align-items-center">
                    {
                        tmvs.map(movie => {
                            console.log(movie)
                            return (
                                <div className="rounded-3" key={movie.id}>
                                    <div className="mx-2 mb-5 pointer image-container">
                                        <img className="img rounded-3" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title
                                        } loading="lazy" />
                                        <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-end align-items-start">
                                            <h5 className="text-capitalize">{movie.original_title}</h5>
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