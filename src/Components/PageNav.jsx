import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import logo from '../assets/images/logo.png'
import SearchSection from './SearchSection';

export default function PageNav({ host, requestToken }) {

  const [isNavFixed, setNavFixed] = useState(false);

  const [showSearchBar, setshowSearchBar] = useState(false);

  const handleCloseSearchBar = () => setshowSearchBar(false);

  const handleShowSearchBar = () => setshowSearchBar(true); 

  useEffect(() => { 
    const handleScroll = () => {
      if (window.scrollY >= 1) {
        setNavFixed(true);
      } else {
        setNavFixed(false);
      }
    }; 
    window.addEventListener('scroll', handleScroll);
 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <Navbar collapseOnSelect className={`dark-bg text-white pb-0 ${isNavFixed ? 'fixed-top' : ''} ${isNavFixed ? 'navbar-expand-lg' : ''}`}>
      <Container fluid className='mx-xl-4 d-xl-flex align-items-center justify-content-between'>
        <Link className='nav-link' to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" style={{ width: '70px', height: '55px' }} className="mb-0" />
            <span className='d-block font-main text-white' style={{ marginTop: '-13px' }}>Plus Movies</span>
          </Navbar.Brand>
        </Link>
          <Nav className="mx-xl-auto">
            <button type='button' className="d-md-flex d-none align-items-center bg-transparent py-2 ps-3 rounded-pill shadow pointer w-500 border-pink" onClick={handleShowSearchBar}>
              <span className="text-white d-flex align-items-center">
                <box-icon size="23px" color="white" name='search-alt-2'></box-icon>
                <span className='w-100 text-white fs-6 ms-2'>Search movies, tv shows....</span>
              </span>
            </button>
            <span className="text-white d-md-none d-flex align-items-center pointer" onClick={handleShowSearchBar}>
                <box-icon size="23px" color="#ff0088" name='search-alt-2'></box-icon> 
              </span>
          </Nav>
          {/* <Nav className="d-flex align-items-center">
            <Nav className="text-white">
              <a href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${host}/overview`} size='md' className='btn rounded-pill btn-hot-pink-outline py-2 px-3 me-xl-4 text-white'>
                Log In
              </a>
            </Nav>
          </Nav>  */}
      </Container>
    </Navbar>
    <SearchSection showSB={showSearchBar} handleCloseSB={handleCloseSearchBar}/>
    </>
    
  );
}

