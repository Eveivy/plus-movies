import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import logo from '../assets/Images/logo.png'
import 'boxicons'

export default function Header({ requestToken }) {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Container fluid className='mx-xl-4 d-xl-flex align-items-center'>
                <Navbar.Brand href="#home" className='text-white'>
                    <img src={logo} alt="" style={{ width: '70px', height: '55px' }} className="mb-0" />
                    <span className='d-block font-main' style={{ marginTop: '-13px' }}>Plus Movies</span>
                </Navbar.Brand>
                <Nav.Link href="movies">Movies</Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='ms-auto d-flex align-items-center justify-content-between'>
                        {/* <Button size='md' className='rounded-pill btn-hot-pink py-2 px-3 me-4'>Sign In</Button> */}
                        <a href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://plus-movies.onrender.com/movies`} size='md' className='btn rounded-pill btn-hot-pink-outline py-2 px-3 me-4 text-white'>
                            Log In
                        </a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
