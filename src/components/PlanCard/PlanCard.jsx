import { Link } from 'react-router-dom'
import { Card, Col } from 'react-bootstrap'

const PlanCard = ({ eachPlan }) => {
    return (
        <Col md={4}>
            <Card className="mb-4">
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>{eachPlan.title}</Card.Title>
                    <Card.Text>{eachPlan.description}</Card.Text>
                    <Link to={`/plan/${eachPlan._id}`} className="btn btn-success">Join</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default PlanCard