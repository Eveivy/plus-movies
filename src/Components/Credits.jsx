import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import RadialProgressBar from "./ProgressBar";
import placeholderImg from '../assets/images/null-state-image.png'
import { Link } from "react-router-dom";

const Credits = ({ id, role }) => {
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;
    const [credits, setCredits] = useState({});
    const [showCastRoles, setShowCastRoles] = useState(true)

    const getCredits = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };

        fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`, options)
            .then(response => response.json())
            .then(data => { 
                setCredits(data)
                // setcredits.crew(data.crew)
                console.log(data)
            })
            .catch(err => console.error(err));
        }
        
        useEffect(() => {
            getCredits();
        }, [id])
        
        // console.log(credits.crew.length)
    return (
        <Container className='p-xl-4 w-100 mb-4 mt-4'>
            <div className="d-xl-flex d-sm-flex align-items-center justify-content-between mb-4">
                <h3 className='font-main text-main py-3 py-xl-0'>Features In</h3>
                {
                    credits.cast && credits.cast.length > 0 && credits.crew.length > 0 &&
                    <div className="d-flex align-items-center justify-content-between border rounded-pill p-2 p-xl-0 nav-control">
                        <span onClick={() => setShowCastRoles(true)} className={`pointer px-3 py-2 fs-8 ${showCastRoles && "active"}`}>Cast</span>
                        <span onClick={() => setShowCastRoles(false)} className={`pointer px-3 py-2 fs-8 ${!showCastRoles && "active"}`}>Crew</span>
                    </div>
                }
            </div>
            <div className='d-flex scroll-container'>
                <div className="d-flex justify-content-between align-items-center">
                    {
                        showCastRoles ?
                            credits.cast && credits.cast.map(movie => {
                                return (
                                    <div className="rounded-3" key={movie.id}>
                                        <div className={`mx-2 mb-5 image-container ${!movie.poster_path && 'd-flex flex-column align-items-center justify-content-end'}`}>
                                            <img className={`${movie.poster_path ? 'img' : 'img-fluid'} rounded-3`} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholderImg} alt={movie.original_title
                                            } loading="lazy" />
                                            <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-between align-items-start">
                                                <div className='mt-5 d-flex align-items-center justify-content-end w-100'>
                                                    <RadialProgressBar percentage={Math.floor(movie.vote_average * 10)} rad={30} strokeW={5} />
                                                </div>
                                                <div className="">
                                                    <h5 className="text-capitalize">
                                                        <Link to={`/${movie.media_type || 'movie'}/${movie.id}&${movie.name || movie.title || movie.original_title || movie.original_name}`}
                                                            className='text-decoration-none text-white text-hover-color'>{movie.name || movie.title || movie.original_title || movie.original_name}</Link>
                                                    </h5>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <small>{movie.release_date || movie.first_air_date}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })
                            : credits.crew && credits.crew.map(movie => {
                                return (
                                    <div className="rounded-3" key={movie.id}>
                                        <div className={`mx-2 mb-5 image-container ${!movie.poster_path && 'd-flex flex-column align-items-center justify-content-end'}`}>
                                            <img className={`${movie.poster_path ? 'img' : 'img-fluid'} rounded-3`} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholderImg} alt={movie.original_title
                                            } loading="lazy" />
                                            <div className="overlay text-white px-2 pb-4 bottom-0 rounded-bottom d-flex flex-column justify-content-between align-items-start">
                                                <div className='mt-5 d-flex align-items-center justify-content-end w-100'>
                                                    <RadialProgressBar percentage={Math.floor(movie.vote_average * 10)} rad={30} strokeW={5} />
                                                </div>
                                                <div className="">
                                                    <h5 className="text-capitalize">
                                                        <Link to={`/${movie.media_type || 'movie'}/${movie.id}&${movie.name || movie.title || movie.original_title || movie.original_name}`}
                                                            className='text-decoration-none text-white text-hover-color'>{movie.name || movie.title || movie.original_title || movie.original_name}</Link>
                                                    </h5>
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

export default Credits;
