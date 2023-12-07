import { Button, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './CommunityCard.css'

const CommunityCard = ({ eachUser }) => {
  return (
    <Col xs={6} md={3} className='mb-4'>
      <Card className='h-100 text-center'>
        <Card.Img className='card-img-top' variant='top' src={eachUser.avatar} />
        <Card.Body>
          <Card.Title>{eachUser.username} {eachUser.role === 'ADMIN' && <span className='badge bg-success'>ADMIN</span>}</Card.Title>
          <Card.Text>
            <Button as={Link} to={`/profile/${eachUser._id}`} variant='dark'>Go to profile</Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default CommunityCard
