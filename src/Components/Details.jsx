import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
    const apiKey = import.meta.env.VITE_API_KEY;
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
            .then(data =>{
                console.log(data)
            })
            .catch(err => console.error(err));

    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return (
        <div>
            <h2>Movie Details</h2>
            <p>Movie ID: {id}</p>
            {/* Display other movie details */}
        </div>

    )
} 