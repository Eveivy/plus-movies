import { useEffect, useState, Suspense, lazy, createContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import facebookIcon from '../assets/images/facebook.png'
import imdbIcon from '../assets/images/imdb.png'
import instagramIcon from '../assets/images/instagram.png'
import tiktokIcon from '../assets/images/tik-tok.png'
import xIcon from '../assets/images/twitterx.png'
import youtubeIcon from '../assets/images/youtube.png'
import moment from 'moment';
import PageNav from './PageNav';
import Credits from './Credits';

export default function CharacterDetails() {
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [externalProfiles, setExternalProfiles] = useState({});
    const [age, setAge] = useState(null);

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
                // console.log(data)
                setDetails(data)
            })
            .catch(err => console.error(err));
    };

    const getExternalIds = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };

        fetch(`https://api.themoviedb.org/3/person/${id}/external_ids`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setExternalProfiles(data)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getCharacterDetails();
        getExternalIds();
    }, [id]);

    useEffect(() => {
        if (details && details.birthday) {
            const currentDate = moment();
            const birthdate = moment(details.birthday, 'YYYY-MM-DD');

            const ageInYears = currentDate.diff(birthdate, 'years');

            setAge(ageInYears);
        }
    }, [details]);

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
                                <h1 className='fs-2 mb-0 fw-semibold'>{details.name}</h1>
                                {
                                    details.birthday &&
                                    <span className='text-muted'>{details.birthday}{details.deathday && ` - ${details.deathday}`} ({age} years old)</span>
                                }
                            </div>
                            <div className="mt-3">
                                <h5 className='font-main fw-bold mb-3'>Biography</h5>
                                {
                                    details.biography ?
                                        <p className='mb-0 text-main'>{details.biography}</p>
                                        : <p className='mb-0 text-info fs-7'>There is no biography for {details.name}.</p>

                                }
                                {details.homepage &&
                                    <span className='text-muted fs-6 mt-4 d-block'>Website:
                                        <a href={details.homepage} target='_blank' className='pointer text-pink'> {details.homepage}</a>
                                    </span>
                                }
                                <div className="d-flex align-items-center mt-4">
                                    {
                                        externalProfiles.twitter_id && 
                                        <a className='w-45px me-3' href={`https://twitter.com/${externalProfiles.twitter_id}`} target='_blank'>
                                            <img src={xIcon} alt="" className='img-fluid'/>
                                        </a>
                                    }
                                    {
                                        externalProfiles.instagram_id && 
                                        <a className='w-45px me-3' href={`https://www.instagram.com/${externalProfiles.instagram_id}`} target='_blank'>
                                            <img src={instagramIcon} alt="" className='img-fluid'/>
                                        </a>
                                    }
                                    {
                                        externalProfiles.youtube_id && 
                                        <a className='w-45px me-3' href={`https://www.youtube.com/channel/${externalProfiles.youtube_id}`} target='_blank'>
                                            <img src={youtubeIcon} alt="" className='img-fluid'/>
                                        </a>
                                    }
                                    {
                                        externalProfiles.tiktok_id && 
                                        <a className='w-45px me-3' href={`https://www.tiktok.com/@${externalProfiles.tiktok_id}`} target='_blank'>
                                            <img src={tiktokIcon} alt="" className='img-fluid'/>
                                        </a>
                                    }
                                    {
                                        externalProfiles.facebook_id && 
                                        <a className='w-45px me-3' href={`https://www.facebook.com/${externalProfiles.facebook_id}`} target='_blank'>
                                            <img src={facebookIcon} alt="" className='img-fluid'/>
                                        </a>
                                    }
                                    {
                                        externalProfiles.imdb_id && 
                                        <a className='w-45px me-3' href={`https://www.imdb.com/name/${externalProfiles.imdb_id}`} target='_blank'>
                                            <img src={imdbIcon} alt="" className='img-fluid'/>
                                        </a>
                                    }
  
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <Credits id={id} />
            </Suspense>
        </>

    )
} 