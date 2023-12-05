import { AuthContext } from '../../contexts/auth.context'
import { useContext, useState } from 'react'
import { Button, Card, Row, Col, Accordion, ListGroup, Modal } from 'react-bootstrap'
import EditUserForm from '../EditUserForm/EditUserForm'
import userService from '../../services/user.services'
import { useNavigate } from 'react-router-dom'

const Profile = ({ profile, loadProfile }) => {
  const { loggedUser, isAdmin } = useContext(AuthContext)
  const [showEditModal, setShowEditModal] = useState(false)

  const navigate = useNavigate()

  const deleteUser = () => {
    userService
      .deleteUser(profile._id)
      .then(() => navigate('/community'))
      .catch(err => console.log(err))
  }

  return (
    <>
      <Row>
        <Col className='col-md-4'>
          <Card>
            <Card.Header>Profile</Card.Header>
            <Card.Img variant='top' src={profile.avatar} />
            <Card.Body className='text-center'>
              <Card.Title><strong>{profile.username}</strong></Card.Title>
            </Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <p><strong>Role:</strong> <span className='badge bg-success'>{profile.role}</span></p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Description</strong> {profile.description}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Follows:</strong> {profile.following.length}</p>
                <p><strong>Supported Projects: </strong> {profile.supported.length}</p>
                <p><strong>User since:</strong> {profile.createdAt.slice(0, 10)}</p>
                {isAdmin || loggedUser._id === profile._id
                  ? <p><strong>Balance:</strong> {profile.balance}</p>
                  : null}
              </ListGroup.Item>
              {isAdmin || loggedUser._id === profile._id
                ? <Card.Body className='d-flex justify-content-center'>
                  <Button variant='dark' onClick={() => setShowEditModal(true)}>Edit Profile</Button>
                  <Button variant='danger' onClick={deleteUser}>Delete User</Button>
                </Card.Body>
                : null}
            </ListGroup>
          </Card>
        </Col>

        <Col className='col-md-8'>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>My Follows</Accordion.Header>
              <Accordion.Body>
                {profile.following.map(elm => (
                  <Card onClick={() => navigate(`/project/${elm.project._id}`)} key={elm._id} className='mb-2'>
                    <Card.Header className='text-center'>
                      <Card.Title>{elm.project.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text><strong>Description:</strong> {elm.project.description}</Card.Text>
                      <Card.Text><strong>Category:</strong> {elm.project.category.title}</Card.Text>
                      <Card.Text><strong>Since:</strong> {elm.followingAt.slice(0, 10)}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>My Donations</Accordion.Header>
              <Accordion.Body>
                {profile.supported.map(elm => (
                  <Card onClick={() => navigate(`/project/${elm.project._id}`)} key={elm._id} className='mb-2'>
                    <Card.Header className='text-center'>
                      <Card.Title>{elm.project.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text><strong>Description:</strong> {elm.project.description}</Card.Text>
                      <Card.Text><strong>Category: </strong>{elm.project.category.title}</Card.Text>
                      <Card.Text><strong>Amount:</strong> {elm.amount}€</Card.Text>
                      <Card.Text><strong>Donated at:</strong> {elm.donatedAt.slice(0, 10)}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUserForm setShowEditModal={setShowEditModal} profile={profile} loadProfile={loadProfile} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Profile
