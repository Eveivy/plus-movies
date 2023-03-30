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
                    <Nav className="m-auto">
                        <Nav.Link href="#home" className='text-white px-xl-4'>Home</Nav.Link>
                        <Nav.Link href="#movies" className='text-white px-xl-4'>Movies</Nav.Link>
                        <Nav.Link href="#series" className='text-white px-xl-4'>Series</Nav.Link>
                        <Nav.Link href="#category" className='text-white px-xl-4'>Category</Nav.Link>
                        <Nav.Link href="#about" className='text-white px-xl-4'>About</Nav.Link>
                    </Nav>
                    <Nav className='ms-auto'>
                        <div className='bg-white rounded-3 d-flex align-items-center p-2'>
                            <span className='mx-2 d-flex align-items-center justify-content-center'>
                                 <box-icon name='search-alt-2' color="#ff0088" size="25px"></box-icon> 
                            </span>
                            <Form as='input' className='search-input fs-6' id='search_input' placeholder='Search'/>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
