import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import logo from '../assets/Images/logo.png'
import 'boxicons'

export default function Header() {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Container fluid className='mx-xl-4 d-xl-flex align-items-center'>
                <Navbar.Brand href="#home" className='text-white'>
                    <img src={logo} alt="" style={{ width: '70px', height: '55px' }} className="mb-0" />
                    <span className='d-block font-main' style={{ marginTop: '-13px' }}>Plus Movies</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav"> 
                    <Nav className='ms-auto d-flex align-items-center justify-content-between'>
                        <Button size='md' className='rounded-pill btn-hot-pink py-2 px-3 me-4'>Sign In</Button>
                        <Button size='md' className='rounded-pill btn-hot-pink-outline py-2 px-3 me-4'>Sign Up</Button>
                        {/* <div className='bg-white rounded-3 d-flex align-items-center p-2'>
                            <span className='mx-2 d-flex align-items-center justify-content-center'>
                                 <box-icon name='search-alt-2' color="#ff0088" size="25px"></box-icon> 
                            </span>
                            <Form as='input' className='search-input fs-6' id='search_input' placeholder='Search'/>
                        </div> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
