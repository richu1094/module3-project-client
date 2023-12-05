import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AboutCreator = ({ project }) => {
  return (
    <div className='about-creator'>
      <div className='text-center'>
        <h2>About the creator</h2>
      </div>
      <hr />
      <Row>
        <Col md={6}>
          <img src={project.owner.avatar} />
        </Col>
        <Col md={6}>
          <p><strong>Username: </strong> <Link to={`/profile/${project.owner._id}`}><strong>{project.owner.username}</strong></Link></p>
          <p><strong>Description:</strong> {project.owner.description}</p>
          <p><strong>Location:</strong> {project.owner.location}</p>
          <p><strong>Followed Projects: </strong> {project.owner.following.length}</p>
          <p><strong>Number of Donations: </strong> {project.owner.supported.length}</p>
          <p><strong>Member since:</strong> {project.owner.createdAt.slice(0, 10)}</p>
        </Col>
      </Row>
    </div>
  )
}

export default AboutCreator
