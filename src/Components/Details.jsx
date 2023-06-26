import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import PageNav from './NotLoggedIn/PageNav';
import RadialProgressBar from './NotLoggedIn/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Details() {
    const [details, setDetails] = useState({});
    const [genres, setGenres] = useState([]);
    const [prodCountries, setProdCountries] = useState([]);
    const [prodCompanies, setProdCompanies] = useState([]);
    const [languages, setlanguages] = useState([]);
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;
    const { id } = useParams();

    const getMovieDetails = () => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(data => {
                setDetails(data)
                setGenres(data.genres)
                setProdCountries(data.production_countries)
                setProdCompanies(data.production_companies)
                setlanguages(data.spoken_languages)
                console.log(data)
            })
            .catch(err => console.error(err));

    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    const gradient = {
        backgroundImage: "linear-gradient(to right, rgba(31.5, 10.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 31.5, 0.84) 50%, rgba(31.5, 10.5, 31.5, 0.84) 100%)"
    }



    return (
        <>
            <PageNav />
            <Container fluid className='p-0'>
                <div className="" style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${details.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'left calc((50vw - 170px) - 340px) top',
                    backgroundRepeat: 'no-repeat',
                    width: "100%",
                    position: "relative",
                    zIndex: 1,
                }}>
                    <div className="d-flex flex-wrap justify-content-center" style={gradient}>
                        <div className="inner-content text-white ms-xl-5">
                            <div className="d-flex align-items-center ms-xl-3">
                                <div className="d-inline" style={{ height: "500px", width: "300px", overflow: "hidden" }}>
                                    <img className='img rounded-3' src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt="" />
                                </div>
                                <div className="ms-5">
                                    <h1 className='fs-2 mb-1'>{`${details.title}`}</h1>
                                    <div className='d-flex align-items-center'>
                                        <span className='border border-secondary px-1 text-white fs-6'>R</span>
                                        <span className='text-white px-2'>{moment(details.release_date).format('L')} ({
                                            prodCountries.map(el => <span key={el.iso_3166_1}>{el.iso_3166_1}</span>)
                                        })</span>
                                        <span>| {genres.map((el) => {
                                            return <span key={el.id} className='px-1 text-hot-pink'>{el.name} <span className='text-white'>*</span></span>
                                        })}</span>
                                        <span> | {Math.floor(details.runtime / 60)}h {details.runtime % 60}m</span>
                                    </div>
                                    <div className="mt-3 d-flex align-items-center">
                                        <div className="d-flex align-items-center">
                                            <RadialProgressBar percentage={Math.floor(details.vote_average * 10)} rad={45} strokeW={7} />
                                            <span>Movie <br /> Rating</span>
                                        </div>
                                        <div className="d-flex align-items-center ms-3">
                                            <span title='Add to list' className='bg-lighter-pink rounded-circle p-2 d-flex align-items-center pointer'><box-icon name='list-plus' color="white"></box-icon></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Container >
        </>

    )
} 