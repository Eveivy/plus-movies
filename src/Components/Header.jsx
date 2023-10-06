import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/logo.png'
import 'boxicons'

export default function Header({ requestToken, host }) {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Container fluid className='mx-xl-4 d-flex align-items-center'>
                <Link className='nav-link' to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" style={{ width: '70px', height: '55px' }} className="mb-0" />
                        <span className='d-block font-main text-white' style={{ marginTop: '-13px' }}>Plus Movies</span>
                    </Navbar.Brand>
                </Link>
                {/* <Nav className='ms-auto d-flex align-items-center justify-content-between'>
                    <a href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${host}/overview`} size='md' className='btn rounded-pill btn-hot-pink-outline py-2 px-3 me-xl-4 text-white'>
                        Log In
                    </a>
                </Nav> */}
            </Container>
        </Navbar>
    );
}
