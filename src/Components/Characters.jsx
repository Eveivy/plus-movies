import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import maleProfile from '../assets/Images/no-profile-male.jpg'
import femaleProfile from '../assets/Images/no-profile-female.jpg'
import { DetailsContext } from './Details';



const Characters = () => {
    const pageContext = useContext(DetailsContext)

    const [casts, setCasts] = useState([]);
    const [crews, setCrews] = useState([]);

    const getCharacters = () => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${pageContext.access_token}`
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${pageContext.id}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(data => {
                setCasts(data.cast);
                setCrews(data.crew);
            })
            .catch(err => console.error(err));

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
                                return <Link to={`/person/${el.id}&${el.name}`} key={el.id} className="text-decoration-none text-main card bg-white shadow mx-2 border-0 rounded-3 p-2 my-5 h-100" style={{ width: "18rem" }}>
                                    <div className="d-flex align-items-center justify-content-center" >
                                        <img style={{ height: "250px" }} src={el.profile_path ? `https://image.tmdb.org/t/p/original/${el.profile_path}` : el.gender === 2 ? maleProfile : femaleProfile} className="rounded-3" alt={el.name} />
                                    </div>
                                    <div className="py-2 text-center">
                                        <p className='fw-bold mb-0'>{el.name || "-"}</p>
                                        <span className='text-muted d-block my-0 fs-7'>{el.character || "-"}</span>
                                        <small className='text-muted fs-7'>{el.known_for_department || "-"}</small>
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
                                        <span className='text-muted d-block my-0'>{el.department || "-"}</span>
                                        <small className='text-muted'>{el.job || "-"}</small>
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

export default Characters