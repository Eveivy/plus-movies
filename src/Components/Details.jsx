import { useEffect, useState, Suspense, lazy, createContext, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import PageNav from './PageNav';
import RadialProgressBar from './ProgressBar';
import Characters from './Characters';
import TvShowDetails from './TvShowDetails';
import { AppContext } from '../App';
export const DetailsContext = createContext(null)


const Videos = lazy(() => import('./Videos'));
const MovieReviews = lazy(() => import('./MovieReviews'));
const Recommendations = lazy(() => import('./Recommendations'));


export default function Details() {
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;
    const contexts = useContext(AppContext);
    const [showSearchResults, setShowSearchResult] = useState(false)

    const { id, mediaType } = useParams();
    const [details, setDetails] = useState({});
    const [genres, setGenres] = useState([]);
    const [prodCountries, setProdCountries] = useState([]);
    const [prodCompanies, setProdCompanies] = useState([]);
    const [languages, setlanguages] = useState([]);

    const navigate = useNavigate();


    const handleGoBack = () => {
        window.history.back();
    };

    const [playTrailer, setPlayTrailer] = useState(false);

    const handleClose = () => setPlayTrailer(false);
    const handleShow = () => setPlayTrailer(true);

    const getAnotherMovie = (mediaType, id, title) => {
        navigate(`/${mediaType}/${id}&${title}`);
        window.location.reload();
    };

    const getMovieDetails = () => {

        if (mediaType === "movie") {
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
                    setDetails(data);
                    setGenres(data.genres);
                    setProdCountries(data.production_countries);
                    setProdCompanies(data.production_companies);
                    setlanguages(data.spoken_languages);

                    // console.log(data)
                })
                .catch(err => console.error(err));

        } else if (mediaType === "tv") {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${access_token}`
                }
            };

            fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setDetails(data);
                    setGenres(data.genres);
                    setProdCountries(data.production_countries);
                    setProdCompanies(data.production_companies);
                    setlanguages(data.spoken_languages);
                })
                .catch(err => console.error(err));
        }

    };


    const trailerNames = ["Official Trailer", "Official US Trailer", "Trailer", "Main Trailer"];

    const [trailer, setTrailer] = useState({});
    const [videos, setVideos] = useState([]);

    const getVideos = () => {
        if (mediaType === "movie") {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${access_token}`
                }
            };

            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
                .then(response => response.json())
                .then(data => {
                    setVideos(data.results);
                    const trailerVideo = data.results.find(video => trailerNames.includes(video.name));
                    setTrailer(trailerVideo);
                    // console.log(data)
                })
                .catch(err => console.error(err));

        } else if (mediaType === "tv") {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${access_token}`
                }
            };

            fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
                .then(response => response.json())
                .then(data => {
                    setVideos(data.results);
                    const trailerVideo = data.results.find(video => trailerNames.includes(video.name));
                    setTrailer(trailerVideo)
                    // console.log(data)
                })
                .catch(err => console.error(err));
        }

    };

    useEffect(() => {
        getMovieDetails();
        getVideos();
    }, [id]);


    return (
        <>
            <PageNav setShowSearchResult={setShowSearchResult} host={contexts.host} requestToken={contexts.requestToken} />

            <Suspense fallback={<div className='loader-wrapper'><span className="loader"></span></div>}>
                {
                    showSearchResults ? '' :
                        <>
                            <div className="d-flex align-items-center justify-content-between">
                                <div onClick={handleGoBack} className="d-flex align-items-center py-2 ps-3 text-main pointer">
                                    <box-icon name='arrow-back' size="1rem" color="#191f3ff7"></box-icon>
                                    <small className='fs-6 ps-1 pt-1'>Go back</small>
                                </div>
                            </div>
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
                                                <div className="d-xl-inline d-none" style={{ height: "500px", width: "350px", overflow: "hidden" }}>
                                                    <img className='img rounded-3' src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt='' />
                                                </div>
                                                <div className="ms-xl-5 w-xl">
                                                    <h1 className='fs-2 mb-1 fw-bold'>{`${details.title || details.original_name || details.name} ${mediaType === "movie" ? details.release_date && `(${details.release_date.substring(0, 4)})` : details.first_air_date && `(${details.first_air_date.substring(0, 4)})`}`}</h1>
                                                    <div className='d-flex flex-wrap align-items-center my-3 my-xl-0'>
                                                        {details.status === "Released" && <span className='border border-secondary px-1 text-white fs-6 mb-1 mb-xl-0'>R</span>}
                                                        <span className='text-white px-2 mb-1 mb-xl-0'>{details.release_date && moment(details.release_date).format('L')} ({
                                                            prodCountries.map((el, idx) => <span key={`${el.iso_3166_1}_${idx}`}>{el.iso_3166_1}</span>)
                                                        })</span>
                                                        <span>| {genres.map((el, idx) => {
                                                            return <span key={`${el.id}_${idx}`} className='px-1 text-pink mb-1 mb-xl-0'>{el.name} {idx + 1 !== genres.length && <span className='text-white'>*</span>}</span>
                                                        })}</span>
                                                        <span className='mx-xl-2'>{details.runtime && `| ${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`}</span>
                                                    </div>
                                                    <div className="mt-3 d-flex flex-wrap align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <RadialProgressBar percentage={Math.floor(details.vote_average * 10)} rad={45} strokeW={7} />
                                                            {/* <span className='pt-2 d-none d-xl-inline'>Movie <br /> Rating</span> */}
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <span title='Add to list' className='bg-lighter-pink rounded-circle p-3 d-flex align-items-center pointer ms-xl-3 ms-2'><box-icon name='list-plus' color="white" size="18px"></box-icon></span>
                                                            <span title='Add to favourite' className='bg-lighter-pink rounded-circle p-3 d-flex align-items-center pointer ms-xl-3 ms-2'><box-icon name='heart' color="white" size="18px"></box-icon></span>
                                                            <span title='Add to watchlist' className='bg-lighter-pink rounded-circle p-3 d-flex align-items-center pointer ms-xl-3 ms-2'><box-icon name='bookmark' color="white" size="18px"></box-icon></span>
                                                            <span title='Rate it' className='bg-lighter-pink rounded-circle p-3 d-flex align-items-center pointer ms-xl-3 ms-2'><box-icon name='star' color="white" size="18px"></box-icon></span>
                                                        </div>
                                                        {
                                                            trailer &&
                                                            <button className="bg-transparent btn btn-hot-pink-outline btn-md rounded-pill ms-xl-4 d-flex align-items-center py-2 mt-xl-0 mt-2" onClick={handleShow}>
                                                                <span className='d-flex align-items-center'><box-icon name='play' color="white" size="25px"></box-icon></span>
                                                                <span className='text-white'>Play Trailer</span>
                                                            </button>
                                                        }
                                                    </div>
                                                    <div className="mt-3">
                                                        <p className='text-muted'>{details.tagline}</p>
                                                        <div className="mb-4">
                                                            <h2 className='fs-5 fw-bold'>Overview</h2>
                                                            <p className=''>{details.overview}</p>

                                                        </div>
                                                        <div className="d-flex flex-wrap align-items-start justify-content-between w-75">

                                                            <div className="">
                                                                <p className='mb-0'>Status</p>
                                                                <small className='d-block text-muted'>{details.status || "-"}</small>
                                                            </div>
                                                            <div className="mx-3 mx-xl-0">
                                                                <p className='mb-0'>Languages</p>
                                                                {
                                                                    languages.map((lng, idx) => <small key={`${lng.iso_639_1}_${idx}`} className='d-block text-muted'>* {lng.english_name || "-"}</small>)
                                                                }
                                                            </div>
                                                            <div className="mx-3 mx-xl-0">
                                                                <p className='mb-0'>Budget</p>
                                                                <small className='d-block text-muted'>{details.budget && `$${details.budget.toLocaleString()}` || '-'}</small>
                                                            </div>

                                                            <div className="">
                                                                <p className='mb-0'>Revenue</p>
                                                                <small className='d-block text-muted'>{details.revenue && `$${details.revenue.toLocaleString()}` || '-'}</small>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Container >

                            <DetailsContext.Provider value={{ id, mediaType, access_token, getAnotherMovie, playTrailer, handleClose, videos, trailer, details }}>
                                <Characters />
                                {
                                    mediaType === 'tv' && <TvShowDetails />
                                }
                                <Videos />
                                <MovieReviews />
                                <Recommendations />
                            </DetailsContext.Provider>

                        </>
                }

            </Suspense>
        </>

    )
} 