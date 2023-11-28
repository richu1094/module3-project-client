import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Richistarter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/'} className='nav-link'>Inicio</Link>
                        <Link to={'/project/create'} className='nav-link'>Crear</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation