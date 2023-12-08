import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../AboutProject/AboutProject.css'


const AboutCreator = ({ project }) => {
  return (
    <div className='about-creator my-4'>
      <div className='text-center'>
        <h2><strong>About the creator 🔎</strong></h2>
      </div>
      <hr />
      <Row>
        <Col className='text-center' md={6}>
          <img className='img-about' src={project.owner.avatar} />
        </Col>
        <Col md={6}>
          <Card className='p-4 h-100'>
            <p><strong>Username: </strong> {project.owner.username} <Link to={`/profile/${project.owner._id}`} class="btn btn-outline-dark btn-sm">Profile</Link></p>
            <p><strong>Description:</strong> {project.owner.description || 'No description yet.'}</p>
            <p><strong>Location:</strong> {project.owner.location || 'No location yet.'}</p>
            <p><strong>Followed Projects: </strong> {project.owner.following.length}</p>
            <p><strong>Number of Donations: </strong> {project.owner.supported.length}</p>
            <p><strong>Member since:</strong> {project.owner.createdAt.slice(0, 10)}</p>
          </Card>
        </Col>
      </Row>
    </div >
  )
}

export default AboutCreator