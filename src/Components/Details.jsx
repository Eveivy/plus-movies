import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Details() {
    const [details, setDetails] = useState({})
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
                console.log(data)
                setDetails(data)
            })
            .catch(err => console.error(err));

    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    // let firstSection = 

    return (
        <Container fluid>
            <div className="" style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${details.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left calc((50vw - 170px) - 340px) top',
                backgroundRepeat: 'no-repeat',
                width: "100%",
                position: "relative",
                zIndex: 1,
                background: "linear-gradient(to bottom right, rgba(157.5, 178.5, 199.5, 1), rgba(157.5, 178.5, 199.5, 0.84))"
            }}>
                <div className="d-flex flex-wrap justify-content-center " style={{
                    backgroundImage: "linear-gradient(to right, rgba(157.5, 178.5, 199.5, 1) calc((50vw - 170px) - 340px), rgba(157.5, 178.5, 199.5, 0.84) 50%, rgba(157.5, 178.5, 199.5, 0.84) 100%)"
                }}>
                    <div className="" style={{
                        paddingLeft: "40px",
                        paddingRight: "40px",
                        maxWidth: "200px", 
                        width: "100%",
                        paddingTop: "30px", 
                        paddingBottom: "30px",
                        zIndex: 0,
                        boxSizing: "border-box"
                    }}>
                     <h1>Details here</h1>
                     <p>Lorem ipsum dolor sit orem itaque earum quo! Maxime minima beatae, odio numquam corporis
                         exercitationem dicta eius saepe dolorem! Impedit rerum repudiandae nostrum quas voluptatum aliquid quod quisquam?</p>
                    </div>
                </div>

            </div>
        </Container >

    )
} 