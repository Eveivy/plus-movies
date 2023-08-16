import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

const SearchSection = ({ showSB, handleCloseSB }) => {
  const access_token = import.meta.env.VITE_ACCESS_TOKEN;
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();

  const getFullDetails = (id, title) => { 
    navigate(`/movies/${id}-${title}`);
    window.location.reload();
  }; 

  const getTrending = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    };
    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
      .then(response => response.json())
      .then(data => {
        setTrending(data.results)
      }
      )
      .catch(err => console.error(err));


  };

  useEffect(() => {
    getTrending();
  }, []);

  const movie = trending.map((el) => { 
    return (
      <div className='mb-3 border-bottom p-2 bg-hover'>
        <Link className='text-decoration-none text-main' onClick={() => getFullDetails(el.id, el.title || el.name || el.original_title)}>
          <span className='d-block'>{el.title || el.name || el.original_title} <small className='text-hot-pink fs-7'>({el.original_language})</small> </span>
          <small className='text-muted fs-7'>{el.overview.length > 80 ? (el.overview).substring(0, 80 - 3) + '...' : el.overview}</small>
        </Link>
      </div>
    );
  })

  return (
    <>
      <Offcanvas show={showSB} onHide={handleCloseSB}>
        <Offcanvas.Header className='border-0 dark-bg px-2 d-flex flex-column'>
          <div className="d-flex align-items-center justify-content-end w-100 mb-3">
            <span className='pointer d-flex align-items-center' onClick={handleCloseSB}>
              <box-icon name='x' size="30px" color="#ff0088" animation='burst-hover'></box-icon>
            </span>
          </div>
            <Form className='d-flex align-items-center w-100'>
              <Form.Group className='w-100'>
                <input className="w-100 p-2 rounded-3 outline-0" type="text" placeholder="Search everything..." />
              </Form.Group>
              <button className='btn ms-2 btn-pink'>Search</button>
            </Form>
        </Offcanvas.Header>
        <Offcanvas.Body className='px-2'>
          <div className="px-2">
            {movie}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchSection;