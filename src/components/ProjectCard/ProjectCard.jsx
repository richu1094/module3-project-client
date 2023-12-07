import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProjectCard = ({ eachProject }) => {

  const handleDate = () => {
    const date1 = new Date(eachProject.endDate)
    const date2 = new Date()
    const diffTime = Math.abs(date2 - date1)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60)) % 24
    return [diffDays, diffHours]
  }

  return (
    <Col className='col-md-4 mb-3'>
      <Card className='h-100'>
        <Card.Header style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h5>{eachProject.title}</h5>
        </Card.Header>
        <Card.Body>
          <Card.Text>{eachProject.description}</Card.Text>
          <Link to={`/project/${eachProject._id}`} className='btn btn-dark'>Details</Link>
        </Card.Body>
        <Card.Footer className='text-muted'>Ending in: {handleDate()[0]} days and {handleDate()[1]} hours</Card.Footer>
      </Card>
    </Col>
  )
}


export default ProjectCard
