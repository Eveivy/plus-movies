import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import maleProfile from '../assets/images/no-profile-male.jpg'
import femaleProfile from '../assets/images/no-profile-female.jpg'
import { DetailsContext } from './Details';



const Characters = () => {
    const pageContext = useContext(DetailsContext)

    const { id, mediaType, access_token } = pageContext

    const [casts, setCasts] = useState([]);
    const [crews, setCrews] = useState([]);


    const getCharacters = () => {

        if (mediaType === "movie") {
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
        } else if (mediaType === "tv") {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${access_token}`
                }
            };

            fetch(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US`, options)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setCasts(data.cast);
                    setCrews(data.crew);
                })
                .catch(err => console.error(err));
        }


    }


    useEffect(() => {
        getCharacters();
    }, []);

    const sortedCharacters = casts.sort((a, b) => a.order - b.order);

    return (
        <>
            <Container className='p-xl-4 w-100 my-3 my-xl-0'>
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className='text-main font-main'>Cast</h4>
                </div>
                <div className='d-flex align-items-center scroll-container mb-5' style={{}}>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            sortedCharacters.map(el => {
                                return <Link key={el.id} to={`/person/${el.id}&${el.name}`} className="text-decoration-none text-main card bg-white shadow mx-2 border-0 rounded-3 p-2 my-5 h-100" style={{ width: "18rem" }}>
                                    <div className="d-flex align-items-center justify-content-center" >
                                        <img style={{ height: "250px" }} src={el.profile_path ? `https://image.tmdb.org/t/p/original/${el.profile_path}` : el.gender === 2 ? maleProfile : femaleProfile} className="rounded-3" alt={el.name} />
                                    </div>
                                    <div className="py-2 text-center">
                                        <p className='fw-bold mb-0'>{el.name || "-"}</p>
                                        <span className='text-muted d-block my-0 fs-7'>{el.character || el.roles && el.roles[0].character || "-"}</span>
                                        {
                                            mediaType === "movie" ?
                                                <small className='text-muted fs-7 d-block'>{el.known_for_department || "-"}</small>
                                                : el.total_episode_count && <span className='text-muted fs-7 d-block'>{el.total_episode_count || "-"} Episode{el.total_episode_count > 1 && 's'}</span>

                                        }

                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </div>
            </Container>
            <Container className='p-xl-4 w-100 my-3 my-xl-0'>
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className='text-main font-main'>Crew</h4>
                </div>
                <div className='d-flex align-items-center scroll-container mb-5' style={{}}>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            crews.map(el => {
                                return <div key={el.credit_id} className="card bg-white shadow mx-2 border-0 rounded-3 p-2 my-5 h-100 pointer" style={{ width: "18rem" }}>
                                    <div className="d-flex align-items-center justify-content-center" >
                                        <img style={{ height: "250px" }} src={el.profile_path ? `https://image.tmdb.org/t/p/original/${el.profile_path}` : el.gender === 2 ? maleProfile : femaleProfile} className="rounded-3" alt={el.name} />
                                    </div>
                                    <div className="py-2 text-center">
                                        <p className='fw-bold mb-0'>{el.name || "-"}</p>
                                        <small className='text-muted'>{el.job || el.jobs[0].job || "-"}</small>
                                        {
                                            mediaType === "movie" ?
                                                <span className='text-muted d-block fs-7'>{el.department || "-"}</span>
                                                : el.total_episode_count && <span className='text-muted fs-7 d-block'>{el.total_episode_count || "-"} Episode{el.total_episode_count > 1 && 's'}</span>

                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Characters;