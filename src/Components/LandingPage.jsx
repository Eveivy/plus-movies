import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from './Header';

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
                            <Button className='btn-hot-pink border-0 px-5 py-3 rounded-pill'>Explore</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='p-5 text-white' style={{ backgroundColor: 'black' }}>
                <Row>
                    <Col xl={12} className="p-3 mb-4">
                        <h2 className='text-uppercase text-center fw-bolder display-5 text-hot-pink'>Trending movies</h2>
                    </Col>
                    <Col xl={3} className='trending rounded-3 d-flex flex-column align-items-start justify-content-end' style={{}}>
                            <h3 className='fs-2 mb-0 pb-0'>Wednesday</h3>
                            <div className='d-flex align-items-start justify-content-between flex-row w-100'>
                                <div className="me-xl-4 pb-3">
                                    <span className="d-block">2022</span>
                                    <small className="d-block text-warning">7.9 rating</small>
                                </div>
                                <div className="me-xl-4 pb-3">
                                     
                                </div>
                            </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
