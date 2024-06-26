import { useEffect, useState, Suspense, lazy, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import Container from 'react-bootstrap/Container';
import { Modal } from 'react-bootstrap';
import maleProfile from '../assets/images/no-profile-male.jpg'
import femaleProfile from '../assets/images/no-profile-female.jpg'
import nodataImg from '../assets/images/null-state-image.png'
import moment from 'moment';
import PageNav from './PageNav';
import Credits from './Credits';

import { AppContext } from '../App';

export default function CharacterDetails() {
    const access_token = import.meta.env.VITE_ACCESS_TOKEN;

    const contexts = useContext(AppContext);
    const [showSearchResults, setShowSearchResult] = useState(false)

    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [externalProfiles, setExternalProfiles] = useState({});
    const [age, setAge] = useState(null);
    const [readMore, setReadMore] = useState(false);
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(null);
    const handleGoBack = () => {
        window.history.back();
    };
    const properties = {
        prevArrow: <span className={`d-flex align-items-center rounded pointer bg-light-pink d-none`}><box-icon size="30px" color='white' name='chevrons-left' type='solid' ></box-icon></span>,
        nextArrow: <span className={`d-flex align-items-center rounded pointer bg-light-pink ${images.length === 4 && 'd-none'}`}><box-icon size="30px" color='white' name='chevrons-right' type='solid' ></box-icon></span>

    }

    const handleOpenModal = (idx) => {
        setShowModal(true);
        setCurrentIdx(idx);
    }

    const getCharacterDetails = () => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };

        fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setDetails(data)
            })
            .catch(err => console.error(err));
    };

    const getExternalIds = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };

        fetch(`https://api.themoviedb.org/3/person/${id}/external_ids`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setExternalProfiles(data)
            })
            .catch(err => console.error(err));
    }

    const getImages = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        };

        fetch(`https://api.themoviedb.org/3/person/${id}/images`, options)
            .then(response => response.json())
            .then(data => {
                setImages(data.profiles)
                // console.log(data.profiles)
            })
            .catch(err => console.error(err));
    }


    useEffect(() => {
        getCharacterDetails();
        getExternalIds();
        getImages();
    }, [id]);

    useEffect(() => {
        if (details && details.birthday) {
            const currentDate = moment();
            const birthdate = moment(details.birthday, 'YYYY-MM-DD');

            const ageInYears = currentDate.diff(birthdate, 'years');

            setAge(ageInYears);
        }
    }, [details]);

    return (
        <>
            <PageNav setShowSearchResult={setShowSearchResult} host={contexts.host} requestToken={contexts.requestToken} />
            <Suspense fallback={<span className="loader"></span>}>
                {
                    showSearchResults ? '' :
                        <>
                            <div className="d-flex align-items-center justify-content-between">
                                <div onClick={handleGoBack} className="d-flex align-items-center py-2 ps-3 text-main pointer">
                                    <box-icon name='arrow-back' size="1rem" color="#191f3ff7"></box-icon>
                                    <small className='fs-6 ps-1 pt-1'>Go back</small>
                                </div>

                            </div>
                            {
                                !details.profile_path || details.gender == 0 ? <div className='mt-5 pt-5 d-flex align-items-center justify-content-center h-100'>
                                    <img src={nodataImg} alt="" />
                                </div> :
                                    <>
                                        <Container className='p-xl-4 w-100 my-3 my-xl-0'>
                                            <div className="d-flex flex-column flex-xl-row justify-content-center align-items-md-center">
                                                <div className="d-xl-inline order-2 order-xl-1 mt-5 mt-xl-0 ms-3 ms-xl-0" style={{ height: "500px", width: "350px", overflow: "hidden" }}>
                                                    <img className='img rounded-3' src={details.profile_path ? `https://image.tmdb.org/t/p/w500/${details.profile_path}` : details.gender === 2 ? maleProfile : femaleProfile} alt="" />
                                                </div>
                                                <div className="ms-md-5 w-xl order-1 order-xl-2">
                                                    <div className=''>
                                                        <h1 className='fs-2 mb-0 fw-semibold'>{details.name}</h1>
                                                        {
                                                            details.birthday &&
                                                            <span className='text-muted'>{details.birthday}{details.deathday && ` - ${details.deathday}`} ({age} years old)</span>
                                                        }
                                                    </div>
                                                    <div className="mt-3">
                                                        <h5 className='font-main fw-bold mb-3'>Biography</h5>
                                                        {
                                                            details.biography ?
                                                                <p className="mb-0 text-main">{
                                                                    details.biography.length > 800 ? <>
                                                                        {
                                                                            readMore ? details.biography :
                                                                                `${details.biography.substring(0, 800 - 3)}...`
                                                                        }
                                                                        <span className='text-pink pointer fs-7' onClick={() => setReadMore((prev) => !prev)}> Read {readMore ? 'Less' : 'More'}</span>
                                                                    </>
                                                                        : details.biography
                                                                }</p>
                                                                : <p className='mb-0 text-info fs-7'>There is no biography for {details.name}.</p>

                                                        }
                                                        {
                                                            images.length <= 2 &&
                                                            <div className="d-flex flex-column mt-5">
                                                                <div className="d-flex align-items-start">
                                                                    {
                                                                        details.gender &&
                                                                        <div className="d-flex flex-column">
                                                                            <span className='fs-7 text-muted'>Gender</span>
                                                                            <span className='text-main fs-7'>{details.gender == 1 ? 'Female' : 'Male'}</span>
                                                                        </div>
                                                                    }
                                                                    {
                                                                        details.place_of_birth &&
                                                                        <div className="d-flex flex-column ms-5">
                                                                            <span className='fs-7 text-muted'>Place of Birth</span>
                                                                            <span className='text-main text-wrap fs-7'>{details.place_of_birth}</span>
                                                                        </div>
                                                                    }
                                                                    {
                                                                        details.popularity &&
                                                                        <div className="d-flex flex-column ms-5">
                                                                            <span className='fs-7 text-muted'>Popularity</span>
                                                                            <span className='text-main fs-7'>{details.popularity}</span>
                                                                        </div>
                                                                    }

                                                                </div>
                                                                {details.homepage &&
                                                                    <span className='text-muted fs-6 mt-4 d-block'>Website:
                                                                        <a href={details.homepage} target='_blank' className='pointer text-pink'> {details.homepage}</a>
                                                                    </span>
                                                                }
                                                                <div className="d-flex align-items-center mt-4">
                                                                    {
                                                                        externalProfiles.twitter_id &&
                                                                        <a className='w-45px me-3' href={`https://twitter.com/${externalProfiles.twitter_id}`} target='_blank'>
                                                                            <box-icon name='twitter' type='logo' size="35px"></box-icon>
                                                                        </a>
                                                                    }
                                                                    {
                                                                        externalProfiles.instagram_id &&
                                                                        <a className='w-45px me-3' href={`https://www.instagram.com/${externalProfiles.instagram_id}/`} target='_blank'>
                                                                            <box-icon name='instagram' type='logo' size="35px"></box-icon>
                                                                        </a>
                                                                    }
                                                                    {
                                                                        externalProfiles.youtube_id &&
                                                                        <a className='w-45px me-3' href={`https://www.youtube.com/channel/${externalProfiles.youtube_id}`} target='_blank'>
                                                                            <box-icon name='youtube' type='logo' size="35px"></box-icon>
                                                                        </a>
                                                                    }
                                                                    {
                                                                        externalProfiles.tiktok_id &&
                                                                        <a className='w-45px me-3' href={`https://www.tiktok.com/@${externalProfiles.tiktok_id}`} target='_blank'>
                                                                            <box-icon name='tiktok' type='logo' size="35px" ></box-icon>
                                                                        </a>
                                                                    }
                                                                    {
                                                                        externalProfiles.facebook_id &&
                                                                        <a className='w-45px me-3' href={`https://www.facebook.com/${externalProfiles.facebook_id}`} target='_blank'>
                                                                            <box-icon name='facebook' type='logo' size="35px"></box-icon>
                                                                        </a>
                                                                    }
                                                                    {
                                                                        externalProfiles.imdb_id &&
                                                                        <a className='w-45px me-3' href={`https://www.imdb.com/name/${externalProfiles.imdb_id}`} target='_blank'>
                                                                            <box-icon type='logo' color="" name='imdb' size="35px"> </box-icon>
                                                                        </a>
                                                                    }
                                                                    {
                                                                        externalProfiles.wikidata_id &&
                                                                        <a href={`https://www.wikidata.org/wiki/${externalProfiles.wikidata_id}`} className="mx-2" target='_blank'>
                                                                            <box-icon name='wikipedia' type='logo' size="35px"></box-icon>
                                                                        </a>
                                                                    }
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </Container>
                                        {
                                            images.length > 2 &&
                                            <Container className={`p-xl-4 w-100 mb-4 ${readMore && 'mt-20'} bg-radient`}>
                                                <div className={`row pb-4 gy-5 ${!readMore ? 'mt-5' : 'mt-0'} `}>
                                                    <div className="col-xl-5 d-flex align-items-center flex-column">
                                                        <div className="border-bottom d-flex d-xl-block align-items-center justify-content-between w-75 pb-4 mt-xl-2">
                                                            {
                                                                details.gender &&
                                                                <div className="d-flex flex-column">
                                                                    <span className='fs-7 text-muted'>Gender</span>
                                                                    <span className='text-main'>{details.gender == 1 ? 'Female' : 'Male'}</span>
                                                                </div>
                                                            }
                                                            {
                                                                details.place_of_birth &&
                                                                <div className="d-flex flex-column mt-xl-3">
                                                                    <span className='fs-7 text-muted'>Place of Birth</span>
                                                                    <span className='text-main'>{details.place_of_birth}</span>
                                                                </div>
                                                            }
                                                            {
                                                                details.popularity &&
                                                                <div className="d-flex flex-column mt-xl-3">
                                                                    <span className='fs-7 text-muted'>Popularity</span>
                                                                    <span className='text-main'>{details.popularity}</span>
                                                                </div>
                                                            }

                                                        </div>
                                                        {details.homepage &&
                                                            <span className='text-muted fs-6 mt-4 d-block'>Website:
                                                                <a href={details.homepage} target='_blank' className='pointer text-pink'> {details.homepage}</a>
                                                            </span>
                                                        }
                                                        <div className="d-flex align-items-center mt-4">
                                                            {
                                                                externalProfiles.twitter_id &&
                                                                <a className='w-45px me-3' href={`https://twitter.com/${externalProfiles.twitter_id}`} target='_blank'>
                                                                    <box-icon name='twitter' type='logo' size="35px"></box-icon>
                                                                </a>
                                                            }
                                                            {
                                                                externalProfiles.instagram_id &&
                                                                <a className='w-45px me-3' href={`https://www.instagram.com/${externalProfiles.instagram_id}/`} target='_blank'>
                                                                    <box-icon name='instagram' type='logo' size="35px"></box-icon>
                                                                </a>
                                                            }
                                                            {
                                                                externalProfiles.youtube_id &&
                                                                <a className='w-45px me-3' href={`https://www.youtube.com/channel/${externalProfiles.youtube_id}`} target='_blank'>
                                                                    <box-icon name='youtube' type='logo' size="35px"></box-icon>
                                                                </a>
                                                            }
                                                            {
                                                                externalProfiles.tiktok_id &&
                                                                <a className='w-45px me-3' href={`https://www.tiktok.com/@${externalProfiles.tiktok_id}`} target='_blank'>
                                                                    <box-icon name='tiktok' type='logo' size="35px" ></box-icon>
                                                                </a>
                                                            }
                                                            {
                                                                externalProfiles.facebook_id &&
                                                                <a className='w-45px me-3' href={`https://www.facebook.com/${externalProfiles.facebook_id}`} target='_blank'>
                                                                    <box-icon name='facebook' type='logo' size="35px"></box-icon>

                                                                </a>
                                                            }
                                                            {
                                                                externalProfiles.imdb_id &&
                                                                <a className='w-45px me-3' href={`https://www.imdb.com/name/${externalProfiles.imdb_id}`} target='_blank'>
                                                                    <box-icon type='logo' color="" name='imdb' size="35px"> </box-icon>
                                                                </a>
                                                            }
                                                            {
                                                                externalProfiles.wikidata_id &&
                                                                <a href={`https://www.wikidata.org/wiki/${externalProfiles.wikidata_id}`} className="mx-2" target='_blank'>
                                                                    <box-icon name='wikipedia' type='logo' size="35px"></box-icon>
                                                                </a>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-7">
                                                        <Slide {...properties} arrows={images.length < 3 ? false : true} className="w-100 d-flex align-items-center justify-content-end bg-smoke"
                                                            slidesToScroll={3} slidesToShow={3} indicators={false} autoplay={false} responsive={[
                                                                {
                                                                    breakpoint: 500,
                                                                    settings: {
                                                                        slidesToShow: 4,
                                                                        slidesToScroll: 4
                                                                    }
                                                                }]}>
                                                            {
                                                                images.map((el, idx) => <div className='mx-3 pointer' key={`img_${idx}`} onClick={() => handleOpenModal(idx)}>
                                                                    <div className="w-100">
                                                                        <img src={`https://image.tmdb.org/t/p/w500/${el.file_path}`} alt={`image ${idx}`} className='img rounded-3' />
                                                                    </div>
                                                                </div>)
                                                            }

                                                        </Slide>

                                                    </div>
                                                </div>
                                            </Container>}
                                        <Credits id={id} role={details.known_for_department} />
                                    </>
                            }
                        </>
                }
            </Suspense>
            <ImageModal showModal={showModal} setShowModal={setShowModal} images={images} currentIdx={currentIdx} setCurrentIdx={setCurrentIdx} />
        </>

    )
};

const ImageModal = ({ showModal, setShowModal, images, currentIdx, setCurrentIdx }) => {
    const handleClose = () => setShowModal(false);

    function prevSlide() {
        const newIdx = currentIdx === 0 ? images.length - 1 : currentIdx - 1;
        setCurrentIdx(newIdx);
    }

    function nextSlide() {
        const newIdx = currentIdx === images.length - 1 ? 0 : currentIdx + 1;
        setCurrentIdx(newIdx);
    }



    return (
        <Modal centered fullscreen="sm-down" show={showModal} onHide={handleClose} backdrop="static" keyboard={false} size='xl'>
            <Modal.Header className='border-0 d-flex align-items-center justify-content-between pb-0'>
                <span className='text-white'>Showing <span className='text-pink'>{currentIdx + 1}</span> of {images.length}</span>
                <span className='pointer d-flex align-items-center' onClick={handleClose}>
                    <box-icon name='x' size="30px" color="#ff0088" animation='burst-hover'></box-icon>
                </span>
            </Modal.Header>
            <Modal.Body className="d-flex align-items-center justify-content-center position-relative" >
                <div onClick={prevSlide} className={`ms-xl-5 pointer position-absolute start-0 bottom-50 ${currentIdx === 0 && 'd-none'}`}>
                    <box-icon color="white" name="chevron-left" size="lg"></box-icon>
                </div>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '530px' }}>
                    <img src={`https://image.tmdb.org/t/p/w500/${images[currentIdx] && images[currentIdx].file_path}`} alt={`image`} className="h-90" />
                </div>

                <div onClick={nextSlide} className={`me-xl-5 pointer position-absolute end-0 bottom-50 ${currentIdx >= images.length - 1 && 'd-none'}`}>
                    <box-icon color="white" name="chevron-right" size="lg"></box-icon>
                </div>
            </Modal.Body>
        </Modal>
    );
}
