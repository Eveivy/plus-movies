import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import dPoster from '../assets/Images/divergent.jpg'
import phPoster from '../assets/Images/purple-hearts.jpg'
import NaijaMeritFeed from './NaijaMeritFeed';

export default function NewsCarousel() {
    return (
        <Carousel fade> 
            <Carousel.Item>
                <img
                    className="d-block w-100 rounded-top"
                    src={phPoster}
                    alt="First slide"
                    style={{height: '600px'}}
                />
                <Container className='text-center py-5 text-white rounded-bottom' style={{ background: 'linear-gradient(to bottom, black, #191f3f)'}}>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Container>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 rounded-top"
                    src={dPoster}
                    alt="First slide"
                    style={{height: '600px'}}
                />
                <Container className='text-center py-5 text-white rounded-bottom' style={{ background: 'linear-gradient(to bottom, black, #191f3f)'}}>
                    <h3>Second slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Container>
            </Carousel.Item>
        </Carousel>
    );
}

