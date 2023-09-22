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

    console.log(id)
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

            </Suspense>
        </>

    )
} 