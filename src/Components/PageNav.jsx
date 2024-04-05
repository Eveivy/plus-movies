import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import logo from '../assets/images/logo.png'
import darkmodeIcon from '../assets/images/moon.png'
import lightmodeIcon from '../assets/images/eclipse.png'
import SearchSection from './SearchSection';

export default function PageNav({ host, requestToken, setShowSearchResult }) {

  const [isNavFixed, setNavFixed] = useState(false);
  const [darkMode, setDarkMode] = useState(false)

  // const [showSearchBar, setshowSearchBar] = useState(false);

  // const handleCloseSearchBar = () => setshowSearchBar(false);

  // const handleShowSearchBar = () => setshowSearchBar(true);

  console.log(setShowSearchResult)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 0.5) {
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
            <div className="d-md-flex d-none align-items-center justify-content-between ps-3 rounded-pill shadow w-500 bg-white">
              <div className="d-flex align-items-center">
                <span className="text-white d-flex align-items-center">
                  <box-icon size="23px" color="#191f3fc1" name='search-alt-2'></box-icon>
                </span>
                <input placeholder='Search movies, tv shows....' className='w-100 text-main fs-6 ms-2 search-input' />
              </div>
              <button className='btn-pink py-2 rounded-pill px-3' onClick={() => setShowSearchResult(true)}>Search</button>
            </div>
            {/* <button type='button' className="d-md-flex d-none align-items-center bg-transparent py-2 ps-3 rounded-pill shadow pointer w-500 border-pink" onClick={handleShowSearchBar}>
              <span className="text-white d-flex align-items-center">
                <box-icon size="23px" color="white" name='search-alt-2'></box-icon>
                <span className='w-100 text-white fs-6 ms-2'>Search movies, tv shows....</span>
              </span>
            </button>
            <span className="text-white d-md-none d-flex align-items-center pointer" onClick={handleShowSearchBar}>
                <box-icon size="23px" color="#ff0088" name='search-alt-2'></box-icon> 
              </span> */}
          </Nav>
          <Nav className="text-white">
            <div className="bg-white me-2 rounded-pill d-flex align-items-center justify-content-between">
              <span className='pointer rounded-pill w-20px h-100 pe-2' onClick={() => setDarkMode(false)}>
                {/* <img src={lightmodeIcon} alt="star" className='w-20px h-20px' /> */}
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16.000000pt" height="19.000000pt" viewBox="0 0 16.000000 16.000000" preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)" fill={!darkMode ? "#ff0088" : "#000000"} stroke="none">
                    <path d="M52 108 c-23 -23 -7 -68 25 -68 11 0 11 5 3 20 -8 14 -8 26 0 40 8 15 8 20 -3 20 -7 0 -18 -5 -25 -12z" />
                  </g>
                </svg>
              </span>
              <span className='pointer rounded-pill ps-2 w-20px h-100' onClick={() => setDarkMode(true)}>
                {/* <img src={darkmodeIcon} alt="" className='w-20px h-20px' /> */}
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="13.000000pt" height="13.000000pt" viewBox="0 0 16.000000 16.000000" preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)" fill={darkMode ? "#ff0088" : "#000000"} stroke="none">
                    <path d="M52 140 c-49 -20 -48 -101 3 -120 55 -21 106 30 85 85 -7 19 -50 49 -63 44 -1 0 -12 -4 -25 -9z m61 -29 c10 -10 -21 -71 -41 -78 -17 -7 -42 22 -42 49 0 11 5 15 15 12 8 -4 15 -1 15 5 0 6 -6 11 -12 11 -9 0 -8 4 2 10 15 9 48 5 63 -9z" />
                    <path d="M50 65 c0 -8 7 -15 15 -15 8 0 15 7 15 15 0 8 -7 15 -15 15 -8 0 -15 -7 -15 -15z" />
                  </g>
                </svg>
              </span>
            </div>
            <a href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${host}/overview`} className='d-flex align-items-center'>
              <box-icon name='log-in' color="#ff0088" size="23px"></box-icon>
            </a>
          </Nav>
        </Container>
      </Navbar>
      {/* <SearchSection showSB={showSearchBar} handleCloseSB={handleCloseSearchBar} /> */}
    </>

  );
}

