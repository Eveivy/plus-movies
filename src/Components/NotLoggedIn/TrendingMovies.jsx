import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from "../../assets/Images/wednesday-poster.jpg"

export default function TrendingMovies() {
    const [tmvs, setTmvs] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY;
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;

    const trendingMvs = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };
        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
            .then(response => response.json())
            .then(data => 
                setTmvs(data.results)
            )
            .catch(err => console.error(err));


    };

    useEffect(() => {
        trendingMvs();
    }, []); 

    const list = tmvs.map(movie => {
        console.log(movie)
        return(
            <h1>Hello</h1>
        //     <Card style={{ width: '15rem' }} className='p-3 shadow border-0 bg-white ms-3'>
        //     <Card.Img variant="top" src={img} className='rounded-3 '/>
        //     <Card.Body>
        //         <Card.Title>Card Title</Card.Title>
        //         <Card.Text> 
        //         </Card.Text> 
        //     </Card.Body>
        // </Card>
        )
    })

    return (
        <Container className='p-4'>
            <div className="d-flex align-items-center mb-4">
                <h3 className='font-main text-dark-blue'>Trending</h3>
            </div>
            <div className=''>
                <div className="scroll-container">
                    <div className="content d-flex align-items-center">
                       {list}
                    </div>
                </div>

            </div>
        </Container>
    )
}