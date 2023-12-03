import { Button, Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const CommunityCard = ({ eachUser }) => {
    return (
        <Col xs={6} md={3} className='mb-4'>
            <Card className="text-center">
                <Card.Img variant="top" src={eachUser.avatar} />
                <Card.Body>
                    <Card.Title>{eachUser.username} {eachUser.role === 'ADMIN' ? <span className="badge bg-success">ADMIN</span> : null}</Card.Title>
                    <Card.Text>
                        <Button as={Link} to={`/profile/${eachUser._id}`} variant="dark">Go to profile</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>)
}

export default CommunityCard