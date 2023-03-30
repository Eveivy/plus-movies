import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand href="#home" className='text-white'>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link href="#features" className='text-white'>Features</Nav.Link>
                        <Nav.Link href="#pricing" className='text-white'>Pricing</Nav.Link>
                     
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets" className='text-white'>More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes" className='text-white'>Dank memes</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 