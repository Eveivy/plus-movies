import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import NewsCarousel from './NewsCarousel';
import aboutSectionImg from '../assets/Images/about-img.jpg'

export default function LandingPage() {
    return (
        <>
            <Container fluid className='hero-section'>
                <Header />
                <Row className='h-75'>
                    <Col xl={8} className='d-flex justify-content-center flex-column text-white ms-xl-5 mt-xl-5'>
                        <h1 className='display-2 fw-bold'>Unlimited movies, <br /> TV shows and more</h1>
                        <p className='lead'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi recusandae alias ut voluptatibus praesentium,
                            ab, obcaecati veniam, dolorem cumque ex officia saepe consequuntur voluptates exercitationem sed ad! Consectetur, nesciunt atque.</p>
                        <div className='my-3'>
                            <Button className='btn-hot-pink border-0 px-5 py-3 rounded-pill'>Explore Movies</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='p-xl-5 text-white' style={{ background: 'linear-gradient(to bottom, #191f3f, black)'}}>
                <Row className='g-5'>
                    <Col xl={12} className="p-3">
                        <h2 className='text-uppercase text-center fw-bolder display-5 text-white'>Trending movies</h2>
                    </Col>
                    <Col xl={3} style={{}}>
                        <div className='trending rounded-3 d-flex flex-column align-items-start p-2 justify-content-end'>
                            <h3 className='fs-2 mb-0 pb-0'>Wednesday</h3>
                            <div className='d-flex align-items-start justify-content-between flex-row w-100'>
                                <div className="pb-3">
                                    <span className="d-block">2022</span>
                                    <small className="d-block text-warning">7.9 rating</small>
                                </div>
                                <div className="pb-3">
                                 <Button size='sm' className='rounded-pill px-3 btn-light-pink border-0'>View</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} style={{}}>
                        <div className='trending rounded-3 d-flex flex-column align-items-start p-2 justify-content-end'>
                            <h3 className='fs-2 mb-0 pb-0'>Wednesday</h3>
                            <div className='d-flex align-items-start justify-content-between flex-row w-100'>
                                <div className="pb-3">
                                    <span className="d-block">2022</span>
                                    <small className="d-block text-warning">7.9 rating</small>
                                </div>
                                <div className="pb-3">
                                 <Button size='sm' className='rounded-pill px-3 btn-light-pink border-0'>View</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} style={{}}>
                        <div className='trending rounded-3 d-flex flex-column align-items-start p-2 justify-content-end'>
                            <h3 className='fs-2 mb-0 pb-0'>Wednesday</h3>
                            <div className='d-flex align-items-start justify-content-between flex-row w-100'>
                                <div className="pb-3">
                                    <span className="d-block">2022</span>
                                    <small className="d-block text-warning">7.9 rating</small>
                                </div>
                                <div className="pb-3">
                                 <Button size='sm' className='rounded-pill px-3 btn-light-pink border-0'>View</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} style={{}}>
                        <div className='trending rounded-3 d-flex flex-column align-items-start p-2 justify-content-end'>
                            <h3 className='fs-2 mb-0 pb-0'>Wednesday</h3>
                            <div className='d-flex align-items-start justify-content-between flex-row w-100'>
                                <div className="pb-3">
                                    <span className="d-block">2022</span>
                                    <small className="d-block text-warning">7.9 rating</small>
                                </div>
                                <div className="pb-3">
                                 <Button size='sm' className='rounded-pill px-3 btn-light-pink border-0'>View</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='p-xl-5 text-white' style={{ background: 'linear-gradient(to bottom, black, #191f3f)'}}>
                <Row className='g-5'>
                    <Col xl={12} className="p-3">
                        <h2 className='text-uppercase text-center fw-bolder display-5 text-white'>Most rated movies</h2>
                    </Col>
                    <Col xl={3} style={{}}>
                        <div className='trending rounded-3 d-flex flex-column align-items-start p-2 justify-content-end'>
                            <h3 className='fs-2 mb-0 pb-0'>Wednesday</h3>
                            <div className='d-flex align-items-start justify-content-between flex-row w-100'>
                                <div className="pb-3">
                                    <span className="d-block">2022</span>
                                    <small className="d-block text-warning">7.9 rating</small>
                                </div>
                                <div className="pb-3">
                                 <Button size='sm' className='rounded-pill px-3 btn-light-pink border-0'>View</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} style={{}}>
                        <div className='trending rounded-3 d-flex flex-column align-items-start p-2 justify-content-end'>
                            <h3 className='fs-2 mb-0 pb-0'>Wednesday</h3>
                            <div className='d-flex align-items-start justify-content-between flex-row w-100'>
                                <div className="pb-3">
                                    <span className="d-block">2022</span>
                                    <small className="d-block text-warning">7.9 rating</small>
                                </div>
                                <div className="pb-3">
                                 <Button size='sm' className='rounded-pill px-3 btn-light-pink border-0'>View</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} style={{}}>
                        <div className='trending rounded-3 d-flex flex-column align-items-start p-2 justify-content-end'>
                            <h3 className='fs-2 mb-0 pb-0'>Wednesday</h3>
                            <div className='d-flex align-items-start justify-content-between flex-row w-100'>
                                <div className="pb-3">
                                    <span className="d-block">2022</span>
                                    <small className="d-block text-warning">7.9 rating</small>
                                </div>
                                <div className="pb-3">
                                 <Button size='sm' className='rounded-pill px-3 btn-light-pink border-0'>View</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} style={{}}>
                        <div className='trending rounded-3 d-flex flex-column align-items-start p-2 justify-content-end'>
                            <h3 className='fs-2 mb-0 pb-0'>Wednesday</h3>
                            <div className='d-flex align-items-start justify-content-between flex-row w-100'>
                                <div className="pb-3">
                                    <span className="d-block">2022</span>
                                    <small className="d-block text-warning">7.9 rating</small>
                                </div>
                                <div className="pb-3">
                                 <Button size='sm' className='rounded-pill px-3 btn-light-pink border-0'>View</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='p-xl-5 pb-xl-0' style={{ background: 'linear-gradient(to bottom, #191f3f, black)'}} >
                <Row>
                    <Col xl={12} className="container p-xl-5 ">
                        <Container className='p-xl-5'>
                          <NewsCarousel/>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='p-xl-5 text-white' style={{ background: 'linear-gradient(to bottom, black, #191f3f)'}} >
                <Row>
                    <Col xl={6} className="container d-flex flex-column justify-content-center">
                       <h4 className='display-3'>About</h4> 
                       <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum totam consectetur ex, fugiat libero dignissimos animi ipsa.
                         Cum fugiat sed amet eveniet qui mollitia quo et, accusamus culpa illum praesentium.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda repudiandae sunt ipsa. Atque, mollitia fuga.</p>
                    </Col>
                    <Col xl={6} className="container">
                    <img src={aboutSectionImg} alt="" className='img-fluid rounded-3'/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
