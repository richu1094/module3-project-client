import { AuthContext } from '../../contexts/auth.context'
import { useContext, useState } from 'react'
import { Button, Card, Row, Col, Accordion, ListGroup, Modal } from 'react-bootstrap'
import EditUserForm from '../EditUserForm/EditUserForm'
import userService from '../../services/user.services'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Profile = ({ profile, loadProfile }) => {
  const { loggedUser, isAdmin, logout } = useContext(AuthContext)
  const [showEditModal, setShowEditModal] = useState(false)

  const navigate = useNavigate()

  const deleteUser = () => {
    userService
      .deleteUser(profile._id)
      .then(() => {
        if (profile._id === loggedUser._id) {
          logout()
        }
        navigate('/community')
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Row className='mb-5'>
        <Col className='col-md-4'>
          <Card>
            <Card.Header>Who am I?</Card.Header>
            <Card.Img variant='top' src={profile.avatar} />
            <Card.Body className='text-center'>
              <Card.Title><strong>{profile.username}</strong></Card.Title>
            </Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <p><strong>Role:</strong> <span className='badge bg-success'>{profile.role}</span></p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Description:</strong> {profile.description || 'No description yet. 😿'}</p>
                <p><strong>Location:</strong> {profile.location || 'No location yet. 😿'}</p>
                <p><strong>Follows:</strong> {profile.following.length}</p>
                <p><strong>Supported Projects: </strong> {profile.supported.length}</p>
                <p><strong>User since:</strong> {profile.createdAt.slice(0, 10)}</p>
                {(isAdmin || loggedUser._id === profile._id)
                  && <p><strong>Balance:</strong> {profile.balance}</p>
                }
              </ListGroup.Item>
              {(isAdmin || loggedUser._id === profile._id)
                && <Card.Body className='d-flex justify-content-center'>
                  <Button className='mx-3' variant='dark' onClick={() => setShowEditModal(true)}>Edit Profile <FaEdit /></Button>
                  <Button className='mx-3' variant='danger' onClick={deleteUser}>Delete User <MdDeleteOutline /></Button>
                </Card.Body>}
            </ListGroup>
          </Card>
        </Col>

        <Col className='col-md-8'>
          <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>My Follows 👍</Accordion.Header>
              <Accordion.Body>
                {profile.following.length === 0 && <p>This user is not following any project yet. 😿</p>}
                {profile.following.map(elm => (
                  <Card onClick={() => navigate(`/project/${elm.project?._id}`)} key={elm._id} className='mb-2'>
                    <Card.Header className='text-center'>
                      <Card.Title>{elm.project?.title || "This project has been deleted. 😿"}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text><strong>Description:</strong> {elm.project?.description || "This project has been deleted. 😿"}</Card.Text>
                      <Card.Text><strong>Category:</strong> {elm.project?.category.title || "This project has been deleted. 😿"}</Card.Text>
                      <Card.Text><strong>Since:</strong> {elm.followingAt.slice(0, 10)}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>My Donations 💸</Accordion.Header>
              <Accordion.Body>
                {profile.supported.length === 0 && <p>This user has not supported any project yet. 😿</p>}
                {profile.supported.map(elm => (
                  <Card onClick={() => navigate(`/project/${elm.project?._id}`)} key={elm._id} className='mb-2'>
                    <Card.Header className='text-center'>
                      <Card.Title>{elm.project?.title || "This project has been deleted. 😿"}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text><strong>Description:</strong> {elm.project?.description || "This project has been deleted. 😿"}</Card.Text>
                      <Card.Text><strong>Category: </strong>{elm.project?.category.title || "This project has been deleted. 😿"}</Card.Text>
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
