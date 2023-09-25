import { useEffect, useState, Suspense, lazy, createContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import PageNav from './PageNav';


export default function CharacterDetails() {
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;
    const { id } = useParams();
    const [details, setDetails] = useState({});

    const navigate = useNavigate();

    const handleGoBack = () => {
        window.history.back();
    };

    const getAnotherMovie = (id, title) => {
        navigate(`/movie/${id}&${title}`);
        window.location.reload();
    };

    const getCharacterDetails = () => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };

        fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setDetails(data)
            })
            .catch(err => console.error(err));
    };



    useEffect(() => {
        getCharacterDetails();
    }, [id]);


    return (
        <>
            <PageNav />
            <Suspense fallback={<span className="loader"></span>}>
                <div className="d-flex align-items-center justify-content-between">
                    <div onClick={handleGoBack} className="d-flex align-items-center py-2 ps-3 text-main pointer">
                        <box-icon name='arrow-back' size="1rem" color="#191f3ff7"></box-icon>
                        <small className='fs-6 ps-1 pt-1'>Go back</small>
                    </div>

                </div>
                <Container className='p-xl-4 w-100 my-3 my-xl-0'>
                    <div className="d-flex align-items-center ms-xl-3">
                        <div className="d-xl-inline d-none" style={{ height: "500px", width: "350px", overflow: "hidden" }}>
                            <img className='img rounded-3' src={`https://image.tmdb.org/t/p/w500/${details.profile_path}`} alt="" />
                        </div>
                        <div className="ms-xl-5 w-xl">
                            <div className=''>
                                <h1 className='fs-2 mb-0 fw-semibold'>{`${details.name}`}</h1>
                                <span className='text-muted'>{details.birthday}{details.deathday && ` - ${details.deathday}`}</span>
                            </div>
                            <div className="mt-3">
                                <h5 className='font-main fw-bold mb-3'>Biography</h5>
                                <p className='mb-0 text-main'>{details.biography}</p>

                                <div className="d-flex flex-wrap align-items-start text-main mt-3">
                                    <div className="d-flex flex-column justify-content-center">
                                        <span className='mb-0 fw-bold font-main fs-6'>Known For</span>
                                        <small className='text-muted'>{details.known_for_department || "-"}</small>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <span className='mb-0 fw-bold font-main fs-6'>Popularity</span>
                                        <small className='text-muted'>{details.known_for_department || "-"}</small>
                                    </div>
                                </div>
                                {details.homepage &&
                                    <span className='text-muted fs-6 mt-3 d-block'>Website:
                                        <span onClick={() => window.open(`${details.homepage}`, '_blank')} href={details.homepage} className='pointer text-pink'> {details.homepage}</span>
                                    </span>
                                }
                            </div>
                        </div>
                    </div> 
                </Container>

            </Suspense>
        </>

    )
} 