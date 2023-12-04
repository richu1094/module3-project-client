import { useState } from 'react'
import { Button, Card, Col, Modal } from 'react-bootstrap'
import EditPlanForm from '../EditPlanForm/EditPlanForm'

const PlanCard = ({ eachPlan, loadPlan, deletePlan }) => {
  const [showEditPlanModal, setShowEditPlanModal] = useState(false)

  return (
    <>
      <Col sm={12} md={4}>
        <Card className='mb-4'>
          <Card.Img variant='top' />
          <Card.Body>
            <Card.Title>{eachPlan.title}</Card.Title>
            <Card.Text>{eachPlan.description}</Card.Text>

            <div className='d-flex justify-content-center'>
              <Button variant='success'>Pledge</Button>
            </div>

            <div className='d-flex justify-content-center mt-3'>
              <Button variant='warning' onClick={() => setShowEditPlanModal(true)}>Edit</Button>
              <Button variant='danger' onClick={() => deletePlan(eachPlan._id)}>Delete</Button>
            </div>

          </Card.Body>
        </Card>
      </Col>
      <Modal show={showEditPlanModal} onHide={() => setShowEditPlanModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPlanForm eachPlan={eachPlan} setShowEditPlanModal={setShowEditPlanModal} loadPlan={loadPlan} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PlanCard
