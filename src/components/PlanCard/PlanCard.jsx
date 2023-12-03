import { Button, Card, Col } from 'react-bootstrap'

const PlanCard = ({ eachPlan }) => {
    return (
        <Col sm={12} md={4}>
            <Card className="mb-4">
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>{eachPlan.title}</Card.Title>
                    <Card.Text>{eachPlan.description}</Card.Text>

                    <div className='d-flex justify-content-center'>
                        <Button variant="success">Pledge</Button>
                    </div>

                    <div className='d-flex justify-content-center mt-3'>
                        <Button variant="warning">Edit</Button>
                        <Button variant="danger">Delete</Button>
                    </div>

                </Card.Body>
            </Card>
        </Col >
    )
}

export default PlanCard