import { useState, useEffect } from "react"
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import dPoster from '../assets/Images/divergent.jpg'
import phPoster from '../assets/Images/purple-hearts.jpg'

const url = "https://api.themoviedb.org/3/discover/movie?api_key=5b5c10231a693bec169ec4b85c504548&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate"

export default function NewsCarousel() {

    const [discover, setDiscover] = useState([]);

    const getDiscover = async () => {
        const response = await fetch(url)
        const data = await response.json()
        // const newArray = data.results.slice(0, 12);
        setDiscover(data.results);
    }

    useEffect(() => {
        getDiscover()
    }, []) 

    return (
        <Carousel fade>
            {discover.map((el) => (
                <Carousel.Item>
                    <div className="w-100 d-flex align-items-center justify-content-center" style={{ height: '600px' }}>
                        <img
                            className="d-block w-75 rounded-top"
                            src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                            alt="First slide" />
                    </div>

                    <Container className='text-center py-5 text-white rounded-bottom' style={{ background: 'linear-gradient(to bottom, black, #191f3f)' }}>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Container>
                </Carousel.Item>
            ))}


        </Carousel>
    );
}

