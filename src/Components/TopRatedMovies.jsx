// import { useState, useEffect } from "react"
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

// const url =  "https://api.themoviedb.org/3/movie/top_rated?api_key=5b5c10231a693bec169ec4b85c504548&language=en-US&page=1"


// export default function TopRatedMovies() {
//     const [topRated, setTopRated] = useState([]);

//     const getTopRated = async () => {
//         const response = await fetch(url)
//         const data = await response.json()
//         const newArray = data.results.slice(0, 8);
//         setTopRated(newArray);
//     }

//     useEffect(() => {
//         getTopRated()
//     }, [])



//     console.log(topRated)

//     return (
//         <Container fluid className='p-xl-5 text-white' style={{ background: 'linear-gradient(to bottom, black, #191f3f)'}}>
//             <Row className='g-5'>
//                 <Col xl={12} className="p-3">
//                     <h2 className='text-uppercase text-center fw-bolder display-5 text-white'>Top rated movies</h2>
//                 </Col>
//                 {
//                     topRated.map((el) => (
//                         <Col key={el.id} xl={3} style={{}}>
//                             {/* <img src={el.backdrop_path} alt="poster" /> */}
//                             <div className='rounded-3 d-flex flex-column align-items-start p-2 justify-content-end' style={{
//                                 backgroundImage: `linear-gradient(0deg, #191f3f, #191f3f00), url(https://image.tmdb.org/t/p/w500/${el.poster_path})`,
//                                 backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '250px'
//                             }}>
//                                 <h3 className='fs-2 mb-0 pb-0'>{el.original_title || el.name}</h3>
//                                 <div className='d-flex align-items-start justify-content-between flex-row w-100'>
//                                     <div className="pb-3">
//                                         <span className="d-block">{el.release_date || el.first_air_date}</span>
//                                         <small className="d-block text-warning">{el.vote_average.toFixed(1)} rating</small>
//                                     </div>
//                                     <div className="pb-3">
//                                         <Button size='sm' className='rounded-pill px-3 btn-light-pink border-0'>View</Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     ))
//                 }
//             </Row>
//         </Container>
//     )
// }