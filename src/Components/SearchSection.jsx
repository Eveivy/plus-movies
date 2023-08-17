import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

const SearchSection = ({ showSB, handleCloseSB }) => {
  const access_token = import.meta.env.VITE_ACCESS_TOKEN;
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("")
  const { id } = useParams();
  const [keywordResult, setKeywordResult] = useState([])

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


  const getSearchResult = () => {

    if (keyword.trim() !== '') {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      };

      fetch(`https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=true&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(data => {
          // setKeywordResult(data.results);
          // console.log(data.results)
        })
        .catch(err => console.error(err));
    } else {
      setKeywordResult([])
    }
  }

  useEffect(() => {
    getTrending();
  }, []);


  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getSearchResult();
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [keyword]);

  // console.log(keywordResult)

  const movie = trending.map((el) => {
    return (
      <div key={el.id} className={`mb-3 border-bottom p-2 bg-hover ${id == el.id && "selected"}`}>
        <Link className='text-decoration-none text-main d-flex align-items-center' onClick={() => getFullDetails(el.id, el.title || el.name || el.original_title)}>
          <div className="me-2" style={{ height: "100px", width: "170px", overflow: "hidden" }}>
            <img className='img rounded-3' src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={el.title} />
          </div>
          <div className="">
            <span className='d-block fs-7 fw-bold'>{el.title || el.name || el.original_title} <small className='text-hot-pink fs-7'>({el.original_language})</small> </span>
            <small className='text-muted fs-7'>{el.overview.length > 80 ? (el.overview).substring(0, 80 - 3) + '...' : el.overview}</small>
          </div>
        </Link>
      </div>
    );
  })

  const result = keywordResult.map((el) => {
    return (
      <div key={el.id} className={`mb-3 border-bottom p-2 bg-hover ${id == el.id && "selected"}`}>
        <Link className='text-decoration-none text-main d-flex align-items-center' onClick={() => getFullDetails(el.id, el.title || el.name || el.original_title)}>
          <div className="me-2" style={{ height: "100px", width: "170px", overflow: "hidden" }}>
            <img className='img rounded-3' src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={el.title} />
          </div>
          <div className="">
            <span className='d-block fs-7 fw-bold'>{el.title || el.name || el.original_title} <small className='text-hot-pink fs-7'>({el.original_language})</small> </span>
            <small className='text-muted fs-7'>{el.overview && el.overview.length > 80 ? (el.overview).substring(0, 80 - 3) + '...' : el.overview}</small>
          </div>
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
              <input
                className="w-100 p-2 rounded-3 outline-0"
                type="text" placeholder="Search everything..."
                id="keyword"
                name="keyword"
                value={keyword}
                onChange={(ev) => setKeyword(ev.target.value)} />
            </Form.Group>
            <button type='button' className='btn ms-2 btn-pink' onClick={getSearchResult}>Search</button>
          </Form>
        </Offcanvas.Header>
        <Offcanvas.Body className='px-2'>
          <div className="px-2">
          {keyword === "" ? movie : keywordResult.length > 0 ? result : <p className='text-center mt-5 fw-bold text-main'>No result found "{keyword}"</p>}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchSection;