// import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const SearchSection = ({ showSB, handleCloseSB }) => {

  return (
    <>
      <Offcanvas show={showSB} onHide={handleCloseSB}>
        <Offcanvas.Header className='border-0 d-flex align-items-center justify-content-end dark-bg'>
          <span className='pointer d-flex align-items-center' onClick={handleCloseSB}>
            <box-icon name='x' size="30px" color="#ff0088" animation='burst-hover'></box-icon>
          </span>
        </Offcanvas.Header> 
        <Offcanvas.Body className='dark-bg'> 
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchSection;