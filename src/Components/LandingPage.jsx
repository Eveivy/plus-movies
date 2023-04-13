import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import TrendingMovies from './TrendingMovies';
import TopRatedMovies from './TopRatedMovies';
import NewsCarousel from './NewsCarousel';
import sectionImg from '../assets/Images/posters_collection.jpg'


export default function LandingPage() {



    return (
        <>
            <Container fluid className='hero-section'>
                <Header />
                <Row className='h-75'>
                    <Col xl={8} className='d-flex justify-content-center flex-column text-white ms-xl-5 mt-xl-5'>
                        <h1 className='display-2 fw-bold'>Unlimited movies, <br /> TV shows and more</h1>
                        <p className='lead'>Plus movies utilizes the expansive library of TMDb to provide users with access to a vast collection of movies and TV shows. It features search and browse functionalities, personalized recommendations, user reviews, and watchlists. The app is a one-stop-shop for all things film and television.</p>
                        <div className='my-3'>
                            <Button className='btn-hot-pink border-0 px-5 py-3 rounded-pill'>Explore Movies</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <TrendingMovies />
            <TopRatedMovies />
            <Container fluid className='p-xl-5 pb-xl-0' style={{ background: 'linear-gradient(to bottom, #191f3f, black)' }} >
                <Row>
                    <Col xl={12} className="container p-xl-5 ">
                        <Container className='p-xl-5'>
                            {/* <NewsCarousel /> */}
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='p-xl-5 text-white' style={{ background: 'linear-gradient(to bottom, black, #191f3f)' }} >
                <Row>
                    <Col xl={12} className="container d-flex flex-column justify-content-center text-center px-xl-6">
                        <img src={sectionImg} alt="posters" />
                    </Col>

                </Row>
            </Container>
        </>
    );
}
