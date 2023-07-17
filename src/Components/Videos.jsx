import { useEffect, useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import Container from 'react-bootstrap/Container';
import { DetailsContext } from './Details';

export default function Videos() {
    const pageContext = useContext(DetailsContext)
    const [videos, setVideos] = useState([]);

    console.log(pageContext)
   
    const getVideos = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${pageContext.access_token}`
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${pageContext.id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
                setVideos(data.results);
            })
            .catch(err => console.error(err));

    }

    useEffect(() => {
        getVideos();
    }, []);
    return (
        <> 
            {videos.length > 0 && <Container className='p-xl-4 w-100 mb-4'>
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className='text-dark-blue font-main'> Videos</h4>
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

        </>
    )
}