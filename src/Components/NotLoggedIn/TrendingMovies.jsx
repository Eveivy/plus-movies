import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function TrendingMovies() {
    const [tmvs, setTmvs] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY;
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;

    // const trendingMvs = async () => {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             accept: 'application/json',
    //             Authorization: `Bearer ${access_token}`
    //         }
    //     };
    //     fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    //         .then(response => response.json())
    //         .then(data => 
    //             setTmvs(data.results)
    //         )
    //         .catch(err => console.error(err));


    // };

    // useEffect(() => {
    //     trendingMvs();
    // }, []); 

    return (
        <Container className='p-4'>
            <div className="d-flex align-items-center mb-4">
                <h3 className='font-main text-dark-blue'>Trending</h3>
            </div>
            <div className=''>
                <div className="scroll-container">
                    <div className="content d-flex align-items-center">
                        <Card style={{ width: '15rem' }} className='p-3 shadow border-0 bg-white'>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text> 
                            </Card.Body>
                        </Card>
                    </div>
                </div>

            </div>
        </Container>
    )
}