import { AuthContext } from "../../contexts/auth.context";
import { useContext, useState } from 'react';
import { Button, Card, Row, Col, Accordion, ListGroup, Modal } from 'react-bootstrap';
import EditUserForm from "../EditUserForm/EditUserForm";
import userService from "../../services/user.services";
import { useNavigate } from "react-router-dom";

const Profile = ({ profile, loadProfile }) => {
    const { loggedUser, isAdmin } = useContext(AuthContext)
    const [showEditModal, setShowEditModal] = useState(false)

    const navigate = useNavigate()

    const deleteUser = () => {
        userService
            .deleteUser(profile._id)
            .then(() => navigate("/community"))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Row>
                <Col className="col-md-4">
                    <Card>
                        <Card.Header>Profile</Card.Header>
                        <Card.Img variant="top" src={profile.avatar} />
                        <Card.Body className="text-center">
                            <Card.Title><strong>{profile.username}</strong></Card.Title>
                        </Card.Body>
                        <ListGroup>
                            <ListGroup.Item>
                                <p><strong>Role:</strong> <span className="badge bg-success">{profile.role}</span></p>
                                <p><strong>Email:</strong> {profile.email}</p>
                                <p><strong>Balance:</strong> {profile.balance}</p>
                            </ListGroup.Item>
                        </ListGroup>
                        {isAdmin || loggedUser._id === profile._id ?
                            <Card.Body className="d-flex justify-content-center">
                                <Button variant="dark" onClick={() => setShowEditModal(true)}>Edit Profile</Button>
                                <Button variant="danger" onClick={deleteUser}>Delete User</Button>
                            </Card.Body> : null
                        }

                    </Card>
                </Col>

                <Col className="col-md-8">
                    <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>My pledges</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>My Favourites</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row >

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