import { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { DetailsContext } from './Details';

export default function MovieReviews() {
    const pageContext = useContext(DetailsContext);

    const [reviews, setReviews] = useState([])
    const [currentIdx, setCurrentIdx] = useState(0);
    const [readMore, setReadMore] = useState(false);


    const getReviews = () => {
        if (pageContext.mediaType === "movie") {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${pageContext.access_token}`
                }
            };

            fetch(`https://api.themoviedb.org/3/movie/${pageContext.id}/reviews?language=en-US&page=1`, options)
                .then(response => response.json())
                .then(data => {
                    setReviews(data.results)
                })
                .catch(err => console.error(err));

        } else if (pageContext.mediaType === "tv") {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${pageContext.access_token}`
                }
            };

            fetch(`https://api.themoviedb.org/3/tv/${pageContext.id}/reviews?language=en-US&page=1`, options)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setReviews(data.results)
                })
                .catch(err => console.error(err));
        }
    }

    useEffect(() => {
        getReviews();
    }, []);
 
    function previous() {
        const newIdx = currentIdx === 0 ? reviews.length - 1 : currentIdx - 1;
        setCurrentIdx(newIdx);
    }
    
    
    function next() {
        const newIdx = currentIdx === reviews.length - 1 ? 0 : currentIdx + 1;
        setCurrentIdx(newIdx);
    } 

    return (
        <>
            {
                reviews && reviews.length > 0 &&
                <Container className='p-xl-4 w-100 my-4'>
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className='text-main font-main'> Reviews</h4>
                    </div>
                    <div className='d-flex align-items-center justify-content-center mt-3' style={{}}>

                        <div className="w-100">
                            <div className="card my-xl-4 border-0 shadow w-100" style={{ height: '350px', overflowY: 'scroll' }}>
                                <div className="card-body pb-4">
                                    <div className="d-flex align-items-center py-3">
                                        <div className="symbol">
                                            <img className='img rounded-circle' src={`https://image.tmdb.org/t/p/original/${reviews[currentIdx].author_details.avatar_path}`} alt="" />
                                        </div>
                                        <div className="ms-2 mt-2">
                                            <h5 className="mb-0 fs-6">{reviews[currentIdx].author}</h5>
                                            <small className="text-muted">@{reviews[currentIdx].author_details.username}</small>
                                        </div>
                                    </div>
                                    <p className="card-text">{

                                        reviews[currentIdx].content.length > 1000 ? <>
                                            {
                                                readMore ? reviews[currentIdx].content :
                                                    `${reviews[currentIdx].content.substring(0, 800 - 3)}...`
                                            }
                                            <span className='text-pink pointer fs-7' onClick={() => setReadMore((prev) => !prev)}> Read {readMore ? 'Less' : 'More'}</span>
                                        </>
                                            : reviews[currentIdx].content
                                    }</p>
                                </div>
                            </div>
                            {
                                reviews.length > 1 &&
                                <div className="d-flex align-items-center justify-content-end w-100 my-3 my-xl-0">
                                    {
                                        currentIdx > 0 &&
                                        <span onClick={previous} className='d-flex align-items-center pointer me-4'><box-icon name='left-arrow-alt'></box-icon> Previous</span>
                                    }
                                    {/* <span className='mx-4 fs-5 d-flex align-items-center pt-2'>{currentIdx}</span> */}
                                    {
                                        reviews.length - 1 === currentIdx ? "" :
                                            <span onClick={next} className='d-flex align-items-center pointer'>Next <box-icon name='right-arrow-alt' color=""></box-icon> </span>
                                    }
                                </div>
                            }
                        </div>

                    </div>
                </Container>
            }

        </>
    )
}