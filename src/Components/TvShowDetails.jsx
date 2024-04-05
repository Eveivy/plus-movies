import { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import emptyImage from '../assets/images/image-empty.png'
import { DetailsContext } from './Details';

const TvShowDetails = () => {
  const access_token = import.meta.env.VITE_ACCESS_TOKEN;
  const context = useContext(DetailsContext)
  const data = context.details;
  const [externalProfiles, setExternalProfiles] = useState({});
  const filteredSeasons = data.seasons && data.seasons.filter(el => el.season_number !== 0)
  const [readMore, setReadMore] = useState(false);

  const socials = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    };

    fetch(`https://api.themoviedb.org/3/tv/${context.id}/external_ids`, options)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        setExternalProfiles(result)
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    socials();
  }, [context.id]);

  console.log(filteredSeasons)

  return (
    <>
      <Container className='p-4 w-100 mb-4 border-top border-2'>
        <Row className='g-5'>
          <Col xl={5} sm={4}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column justify-center">
                <p className='fs-7 fw-bold mb-0'>Type</p>
                <small className='d-block text-muted'>{data.type}</small>
              </div>
              <div className="d-flex flex-column justify-center">
                <p className='fs-7 fw-bold mb-0'>Seasons</p>
                <small className='d-block text-muted'>{data.number_of_seasons}</small>
              </div>
              <div className="d-flex flex-column justify-center">
                <p className='fs-7 fw-bold mb-0'>Episodes</p>
                <small className='d-block text-muted'>{data.number_of_episodes}</small>
              </div>
            </div>
            <div className="my-5">
              <p className='fs-7 fw-bold mb-3'>Network/Watch Provider</p>
              <div className="d-flex align-items-center justify-content-start">
                {
                  data.networks && data.networks.map((el, idx) => {
                    return <Link key={`${el.id}${idx}`} to={""} className="">
                      <img className='' style={{ width: '90px' }} key={`${el.id}${idx}`} src={`https://image.tmdb.org/t/p/original/${el.logo_path}`} alt="" />
                    </Link>
                  })
                }
              </div>
            </div>
            <div className="d-flex align-items-center">
              {
                data.homepage &&
                <a href={`${data.homepage}`} className="" title='visit homepage' target='_blank'>
                  <box-icon name='slider' size="30px"></box-icon>
                </a>
              }
              {
                externalProfiles.facebook_id &&
                <a href={`https://www.facebook.com/${externalProfiles.facebook_id}`} target='_blank' className="mx-2" >
                  <box-icon name='facebook' type='logo' size="35px"></box-icon>
                </a>
              }
              {
                externalProfiles.imdb_id &&
                <a href={`https://www.imdb.com/name/${externalProfiles.imdb_id}`} className="mx-2" target='_blank'>
                  <box-icon type='logo' color="" name='imdb' size="35px"> </box-icon>
                </a>
              }
              {
                externalProfiles.instagram_id &&
                <a href={`https://www.instagram.com/${externalProfiles.instagram_id}/`} className="mx-2" target='_blank'>
                  <box-icon name='instagram' type='logo' size="35px"></box-icon>
                </a>
              }
              {
                externalProfiles.twitter_id &&
                <a href={`https://twitter.com/${externalProfiles.twitter_id}`} className="mx-2" target='_blank'>
                  <box-icon name='twitter' type='logo' size="35px"></box-icon>
                </a>
              }
              {
                externalProfiles.wikidata_id &&
                <a href={`https://www.wikidata.org/wiki/${externalProfiles.wikidata_id}`} className="mx-2" target='_blank'>
                  <box-icon name='wikipedia' type='logo' size="35px"></box-icon>
                </a>
              }
            </div>
            <div className="my-5">
              <p className='fs-7 fw-bold mb-2'> Created by</p>
              <div className="d-flex align-items-center">
                {
                  data.created_by && data.created_by.map((el, idx) => {
                    return <Link key={el.credit_id} to={`/person/${el.id}&${el.name}`} className="me-4 flex-wrap mb-4 d-flex align-items-center text-decoration-none text-main">
                      <div className="rounded-circle symbol">
                        <img className='border-pink rounded-circle img' key={`${el.credit_id}${idx}`} src={`https://image.tmdb.org/t/p/original/${el.profile_path}`} alt="" />
                      </div>
                      <div className="d-flex flex-column ms-3 mt-2">
                        <span className="d-block fw-bold fs-7">{el.name}</span>
                        <small className='text-muted fs-7'>{el.id}</small>
                      </div>
                    </Link>
                  })
                }
              </div>

            </div>
          </Col>
          <Col xl={7} sm={8} className='seasons-section'>
            <Row className='g-4'>
              {
                filteredSeasons && filteredSeasons.map((el, idx) => {
                  return <Col xl={12} key={`idx_${el.id}`}>
                    <div className='d-flex align-items-center p-3 border border-1 rounded-3'>
                      <div className="season-poster">
                        <img className='img' key={`${el.id}${idx}`} src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} alt="" />
                      </div>
                      <div className="ms-4">
                        <h4 className='nunito-font fs-5'>{el.name}</h4>
                        <p className={`text-muted mb-0 fs-7`}>{
                          el.overview.length > 200 ? <>
                            {
                              readMore ? el.overview :
                                `${el.overview.substring(0, 200 - 3)}...`
                            }
                            <span className='text-pink pointer fs-7' onClick={() => setReadMore((prev) => !prev)}> Read {readMore ? 'Less' : 'More'}</span>
                          </> : el.overview
                        }</p>
                      </div>
                    </div>
                  </Col>
                })
              }

            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TvShowDetails;