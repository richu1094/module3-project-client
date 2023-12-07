import { useContext, useState } from 'react'
import { Container, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import AddFunds from '../AddFunds/AddFunds'
import logo from './../../assets/img/logo/logo.png'
import './Navigation.css'

const Navigation = () => {
  const { loggedUser, isAdmin, logout } = useContext(AuthContext)
  const [showFundsModal, setShowFundsModal] = useState(false)

  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary custom-navbar' bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand>
            <Link to='/' className='nav-link'><img src={logo} alt='logo' width='180' height='180' /></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Link to='/' className='nav-link'>Home</Link>
              <Link to='/discover' className='nav-link'>Discover</Link>
              <Link to='/community' className='nav-link'>Community</Link>

              {isAdmin && (
                <NavDropdown title='Admin Panel'>
                  <NavDropdown.Item as={Link} to='/category'>Category</NavDropdown.Item>
                </NavDropdown>
              )}

            </Nav>
            <Navbar.Text className='justify-content-end'>
              <NavDropdown title={loggedUser ? <Navbar.Text>¡Welcome, {loggedUser.username}!</Navbar.Text> : <Navbar.Text>¡Welcome, Guest!</Navbar.Text>} id='collapsible-nav-dropdown'>
                {loggedUser && <NavDropdown.Item as={Link} to={`/profile/${loggedUser._id}`}>Profile</NavDropdown.Item>}
                {loggedUser && <NavDropdown.Item as={Link} onClick={() => setShowFundsModal(true)}>Add Funds</NavDropdown.Item>}
                {!loggedUser && <NavDropdown.Item as={Link} to='/log-in'>Log In</NavDropdown.Item>}
                {!loggedUser && <NavDropdown.Item as={Link} to='/sign-up'>Sign Up</NavDropdown.Item>}
                {loggedUser && <NavDropdown.Divider />}
                {loggedUser && <NavDropdown.Item as={Link} to='/' onClick={logout}>Log out</NavDropdown.Item>}
              </NavDropdown>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showFundsModal} onHide={() => setShowFundsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adding funds</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddFunds setShowFundsModal={setShowFundsModal} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Navigation
