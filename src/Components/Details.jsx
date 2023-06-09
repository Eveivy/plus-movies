import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import PageNav from './NotLoggedIn/PageNav';
import Videos from './Videos';
import MovieReviews from './MovieReviews';
import Recommendations from './Recommendations';
import RadialProgressBar from './NotLoggedIn/ProgressBar';
import maleProfile from '../assets/Images/no-profile-male.jpg'
import femaleProfile from '../assets/Images/no-profile-female.jpg' 
 

export default function Details() {
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [genres, setGenres] = useState([]);
    const [prodCountries, setProdCountries] = useState([]);
    const [prodCompanies, setProdCompanies] = useState([]);
    const [languages, setlanguages] = useState([]);
    const [casts, setCasts] = useState([]);
    const [crews, setCrews] = useState([]);


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
            })
            .catch(err => console.error(err));

    };

    const getCharacters = () => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(data => { 
                setCasts(data.cast);
                setCrews(data.crew);
            })
            .catch(err => console.error(err));

    }

   

    useEffect(() => {
        getMovieDetails();
        getCharacters();
    }, []); 

    const sortedCharacters = casts.sort((a, b) => a.order - b.order); 

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
                    <div className="d-flex flex-wrap justify-content-center" style={{
                        backgroundImage: "linear-gradient(to right, rgba(31.5, 10.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 31.5, 0.84) 50%, rgba(31.5, 10.5, 31.5, 0.84) 100%)"
                    }}>
                        <div className="inner-content text-white ms-xl-5">
                            <div className="d-flex align-items-center ms-xl-3">
                                <div className="d-inline " style={{ height: "500px", width: "350px", overflow: "hidden" }}>
                                    <img className='img rounded-3' src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt="" />
                                </div>
                                <div className="ms-5" style={{ width: "80%" }}>
                                    <h1 className='fs-2 mb-1 fw-bold'>{`${details.title} (${details.release_date ? details.release_date.substring(0, 4) : ""})`}</h1>
                                    <div className='d-flex align-items-center'>
                                        <span className='border border-secondary px-1 text-white fs-6'>R</span>
                                        <span className='text-white px-2'>{moment(details.release_date).format('L')} ({
                                            prodCountries.map(el => <span key={el.iso_3166_1}>{el.iso_3166_1}</span>)
                                        })</span>
                                        <span>| {genres.map((el) => { 
                                            return <span key={el.id} className='px-1 text-hot-pink'>{el.name} <span className='text-white'>*</span></span>
                                        })}</span>
                                        <span className='mx-2'> |  {Math.floor(details.runtime / 60)}h {details.runtime % 60}m</span>
                                    </div>
                                    <div className="mt-3 d-flex align-items-center">
                                        <div className="d-flex align-items-center">
                                            <RadialProgressBar percentage={Math.floor(details.vote_average * 10)} rad={45} strokeW={7} />
                                            <span className='pt-2'>Movie <br /> Rating</span>
                                        </div>
                                        <div className="d-flex align-items-center ms-xl-3">
                                            <span title='Add to list' className='bg-lighter-pink rounded-circle p-3 d-flex align-items-center pointer ms-xl-3'><box-icon name='list-plus' color="white" size="18px"></box-icon></span>
                                            <span title='Add to favourite' className='bg-lighter-pink rounded-circle p-3 d-flex align-items-center pointer ms-xl-3'><box-icon name='heart' color="white" size="18px"></box-icon></span>
                                            <span title='Add to watchlist' className='bg-lighter-pink rounded-circle p-3 d-flex align-items-center pointer ms-xl-3'><box-icon name='bookmark' color="white" size="18px"></box-icon></span>
                                            <span title='Rate it' className='bg-lighter-pink rounded-circle p-3 d-flex align-items-center pointer ms-xl-3'><box-icon name='star' color="white" size="18px"></box-icon></span>
                                        </div>
                                        <div className="ms-xl-3 d-flex align-items-center pointer pt-xl-1">
                                            <span className='d-flex align-items-center'><box-icon name='play' color="white" size="25px"></box-icon></span>
                                            <span>Play Trailer</span>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className='text-muted'>{details.tagline}</p>
                                        <div className="mb-4">
                                            <h2 className='fs-5 fw-bold'>Overview</h2>
                                            <p className=''>{details.overview}</p>
                                        </div>
                                        <div className="d-flex align-items-start justify-content-between w-75">
                                            <div className="">
                                                <p className='mb-0'>Status</p>
                                                <small className='d-block text-muted'>{details.status || "-"}</small>
                                            </div>
                                            <div className="">
                                                <p className='mb-0'>Languages</p>
                                                {
                                                    languages.map(lng => <small key={lng.iso_639_1} className='d-block text-muted'>*{lng.english_name}</small>)
                                                }

                                            </div>
                                            <div className="">
                                                <p className='mb-0'>Budget</p>
                                                <small className='d-block text-muted'>{details.budget ? `$${details.budget.toLocaleString()}` : "-"}</small>
                                            </div>
                                            <div className="">
                                                <p className='mb-0'>Revenue</p>
                                                <small className='d-block text-muted'>{details.revenue ? `$${details.revenue.toLocaleString()}` : "-"}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Container >
            <Container className='p-4 w-100'>
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className='text-dark-blue font-main'>Cast <span className='text-muted fs-3'>{casts.length}</span></h4>
                </div>
                <div className='d-flex align-items-center scroll-container mb-5' style={{}}>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            sortedCharacters.map(el => { 
                                return <div key={el.id} className="card bg-white shadow mx-2 border-0 rounded-3 p-2 my-5 h-100 pointer" style={{width: "18rem"}}>
                                    <div className="d-flex align-items-center justify-content-center" >
                                        <img style={{ height: "250px" }} src={el.profile_path ? `https://image.tmdb.org/t/p/original/${el.profile_path}`: el.gender === 2 ? maleProfile : femaleProfile} className="rounded-3" alt={el.name} />
                                    </div>
                                    <div className="py-2 text-center">
                                        <p className='fw-bold mb-0'>{el.name || "-"}</p>
                                        <span className='text-muted d-block my-0 fs-7'>{el.character || "-"}</span>
                                        <small className='text-muted fs-7'>{el.known_for_department || "-"}</small>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </Container>
            <Container className='p-4 w-100'>
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className='text-dark-blue font-main'>Crew <span className='text-muted fs-3'>{crews.length}</span></h4>
                </div>
                <div className='d-flex align-items-center scroll-container mb-5' style={{}}>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            crews.map(el => {   
                                return <div key={el.credit_id} className="card bg-white shadow mx-2 border-0 rounded-3 p-2 my-5 h-100 pointer" style={{width: "18rem"}}>
                                    <div className="d-flex align-items-center justify-content-center" >
                                        <img style={{ height: "250px" }} src={el.profile_path ? `https://image.tmdb.org/t/p/original/${el.profile_path}`: el.gender === 2 ? maleProfile : femaleProfile} className="rounded-3" alt={el.name} />
                                    </div>
                                    <div className="py-2 text-center">
                                        <p className='fw-bold mb-0'>{el.name || "-"}</p>
                                        <span className='text-muted d-block my-0'>{el.department || "-"}</span>
                                        <small className='text-muted'>{el.job || "-"}</small>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </Container>
            <Videos movieId={id} accessTkns={access_token}/>
            <MovieReviews movieId={id} accessTkns={access_token}/>
            <Recommendations movieId={id} accessTkns={access_token}/>
        </>

    )
} 