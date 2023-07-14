import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';


export default function MovieReviews({ movieId, accessTkns}) { 
    const [reviews, setReviews] = useState([])
    const [currentIdx, setCurrentIdx] = useState(0)

    const getReviews = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessTkns}`
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(data => { 
                setReviews(data.results)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getReviews();
    }, []);

    function prev() {
        const newIdx = currentIdx === 0 ? reviews.length - 1 : currentIdx;
        setCurrentIdx(newIdx);
    }

    function next() {
        const newIdx = currentIdx === reviews.length - 1 ? 0 : currentIdx + 1;
        setCurrentIdx(newIdx);
    }

    return (
        <>
            {
                reviews.length &&
                <Container className='p-xl-4 w-100 my-4'>
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className='text-dark-blue font-main'> Reviews</h4>
                    </div>
                    <div className='d-flex align-items-center justify-content-center mt-3' style={{}}>

                        <div className="w-100">
                            <div className="card m-xl-4 border-0 shadow w-90">
                                <div className="card-body">
                                    <div className="d-flex align-items-center py-3">
                                        <div className="symbol">
                                            <img className='img rounded-circle' src={`https://image.tmdb.org/t/p/original/${reviews[currentIdx].author_details.avatar_path}`} alt="" />
                                        </div>
                                        <div className="ms-2 mt-2">
                                            <h5 className="mb-0 fs-6">{reviews[currentIdx].author}</h5>
                                            <small className="text-muted">@{reviews[currentIdx].author_details.username}</small>
                                        </div>
                                    </div>
                                    <p className="card-text">{reviews[currentIdx].content}</p>
                                </div>
                            </div>
                            {
                                reviews.length > 1 &&
                                <div className="d-flex align-items-center justify-content-end w-90 my-3 my-xl-0">
                                    <span onClick={prev} className='d-flex align-items-center pointer me-4'><box-icon name='left-arrow-alt'></box-icon> Previous</span>
                                    {/* <span className='mx-4 fs-5 d-flex align-items-center pt-2'>{currentIdx}</span> */}
                                    <span onClick={next} className='d-flex align-items-center pointer'>Next <box-icon name='right-arrow-alt' color=""></box-icon> </span>
                                </div>
                            }
                        </div>

                    </div>
                </Container>
            }

        </>
    )
}