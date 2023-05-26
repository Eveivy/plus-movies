import { useState, useEffect, useContext } from 'react';
import { AppContext } from "../App"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from './Header';


export default function LandingPage() {
    const props = useContext(AppContext);

    return (
        <>
            <Container fluid className='hero-section'>
                <Header requestToken={props.requestToken}/>
                <Row className='h-75'>
                    <Col xl={8} className='d-flex justify-content-center flex-column text-white ms-xl-5 mt-xl-5'>
                        <h1 className='display-2 fw-bold'>Unlimited movies, <br /> TV shows and more</h1>
                        <p className='lead'>Plus movies utilizes the expansive library of TMDb to provide users with access to a vast collection
                            of movies and TV shows. It features search and browse functionalities, personalized recommendations, user reviews, and watchlists. This app is a one-stop-shop for all things film and television.</p>
                        <div className='my-3'>
                            <Button className='btn-hot-pink px-5 py-3 rounded-pill'>Explore Movies</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='p-xl-5 pb-xl-0' style={{ background: 'linear-gradient(to bottom, #191f3f, black)' }} >
                <Row>
                    <Col xl={6} className="container gradient-border">
                        <Container className='p-xl-5 text-white d-flex flex-column align-items-center justify-content-center'>
                            <h2 className='fs-1 text-center'>Search for movies and TV shows</h2>
                            <p className='lead text-center text-muted'>Search for movies and TV shows by title, keyword, or genre. The results can be filtered by release date, popularity, and other parameters</p>
                        </Container>
                    </Col>
                    <Col xl={6} className="container ">
                        <Container className='p-xl-5 text-white d-flex flex-column align-items-center justify-content-center'>
                            <h2 className='fs-1 text-center'>Retrieve movie and TV show details</h2>
                            <p className='lead text-center text-muted'>Retrieve detailed information about a specific movie or TV show, including its plot summary, cast and crew, release date, ratings, and reviews</p>
                        </Container>
                    </Col>
                </Row>
            </Container>
 
        </>
    );
}
