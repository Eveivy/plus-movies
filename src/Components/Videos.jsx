import { useEffect, useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import Container from 'react-bootstrap/Container';
import { DetailsContext } from './Details';
import Modal from 'react-bootstrap/Modal';

export default function Videos() {
    const pageContext = useContext(DetailsContext)
    const videos = pageContext.videos ? pageContext.videos : [];
  

    return (
        <>
            {videos.length > 0 && <Container className='p-xl-4 w-100 mb-4'>
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className='text-main font-main'> Videos</h4>
                </div>
                <div className='d-flex align-items-center scroll-container' style={{}}>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            videos.map(el => {
                                return <div key={el.id} className='me-5'>
                                    {videos.length > 0 && (
                                        <ReactPlayer
                                            url={`https://www.youtube.com/watch?v=${el.key}`}
                                            controls
                                            width="600px"
                                            height="360px"
                                        />
                                    )}
                                </div>
                            })
                        }
                    </div>
                </div>
            </Container>
            }
            {
                videos.length > 0 &&
                <TrailerModal playTrailer={pageContext.playTrailer} handleClose={pageContext.handleClose} trailer={pageContext.trailer} />
            }
        </>
    )
}


const TrailerModal = ({ playTrailer, handleClose, trailer }) => {

    const [videoPlaying, setVideoPlaying] = useState(true);

    const handleVideoEnded = () => {
        setVideoPlaying(false);
    };

    const handleCloseModal = () => {
        setVideoPlaying(false);
        handleClose();
    };

    return (
        <Modal show={playTrailer} onHide={handleCloseModal} backdrop="static" keyboard={false} size='xl'>
            <Modal.Header className='border-0 d-flex align-items-center justify-content-end'>
                <span className='pointer d-flex align-items-center' onClick={handleCloseModal}>
                    <box-icon name='x' size="30px" color="#ff0088" animation='burst-hover'></box-icon>
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer && trailer.key}`}
                        controls
                        width="100%"
                        height="640px"
                        playing={videoPlaying}
                        onEnded={handleVideoEnded}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}
