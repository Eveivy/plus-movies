import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TrendingMovies() {
    return (
        <Container className='p-4'>
            <div className="d-flex align-items-center mb-4">
                <h3 className='font-main text-dark-blue'>Trending</h3>
            </div>
            <div className='d-flex align-items-center'>
                <div class="scroll-container">
                    <div class="content"> 
                    
                    </div>
                </div>

            </div>
        </Container>
    )
}