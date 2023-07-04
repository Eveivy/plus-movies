import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/Images/logo.png'

export default function PageNav({ host, requestToken }) {
  return (
    <Navbar collapseOnSelect expand="lg" className='dark-bg text-white pb-0'>
      <Container fluid className='mx-xl-4 d-xl-flex align-items-center justify-content-between'>
        <Link className='nav-link' to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" style={{ width: '70px', height: '55px' }} className="mb-0" />
            <span className='d-block font-main text-white' style={{ marginTop: '-13px' }}>Plus Movies</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Link className='nav-link' to="/explore">
              <span className="text-white" href="#movies">Movies</span>
            </Link>
            <Nav.Link className="text-white mx-xl-4" href="#tvshows">TV Shows</Nav.Link>
            <Nav.Link className="text-white" href="#people">People</Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            <Nav className="text-white">
              <a href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${host}/overview`} size='md' className='btn rounded-pill btn-hot-pink-outline py-2 px-3 me-xl-4 text-white'>
                Log In
              </a>
            </Nav>
            <span className="text-white pointer d-flex align-items-center">
              <box-icon size="30px" color="white" name='search-alt-2'></box-icon>
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

