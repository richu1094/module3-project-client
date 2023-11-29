import { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context';

const Navigation = () => {
    const { loggedUser, logout } = useContext(AuthContext)

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Richistarter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/'} className='nav-link'>Home</Link>
                        <Link to={'/discover'} className='nav-link'>Discover</Link>
                        <Link to={'/project/create'} className='nav-link'>Create Project</Link>
                        <Link to={'/category'} className='nav-link'>Category</Link>
                        <Link to={'/category/create'} className='nav-link'>Create Category</Link>
                    </Nav>
                    <Navbar.Text className="justify-content-end">
                        {loggedUser && <Navbar.Text>¡Hola, {loggedUser.username}!</Navbar.Text>}
                        {!loggedUser ? <Link to={'/log-in'} className='btn btn-dark'>Log In</Link> :
                            <Link to={'/'} className='btn btn-dark' onClick={logout}>Log out</Link>}
                        {!loggedUser && <Link to={'/sign-up'} className='btn btn-dark'>Sign Up</Link>}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation