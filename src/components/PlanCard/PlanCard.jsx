import { useEffect, useState } from 'react'
import { Button, Card, Col, Modal } from 'react-bootstrap'
import EditPlanForm from '../EditPlanForm/EditPlanForm'
import userService from '../../services/user.services'
import projectService from '../../services/projects.services'
import { toast } from 'sonner'

const PlanCard = ({ eachPlan, loadPlan, loadProject, deletePlan }) => {
  const [showEditPlanModal, setShowEditPlanModal] = useState(false)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    loadBalance()
  }, [])

  const loadBalance = () => {
    userService
      .getUserBalance()
      .then(({ data }) => {
        setBalance(data)
      }).catch(err => console.log(err))
  }

  const handleDonation = () => {
    if (balance < eachPlan.price) {
      return (toast.error('Insufficient funds!'))
    } else {
      Promise.all([
        userService.addDonation(eachPlan.project._id, eachPlan.price),
        userService.withdrawFunds(eachPlan.price),
        projectService.saveDonation(eachPlan.project._id, eachPlan.price),
        projectService.addBalance(eachPlan.project._id, eachPlan.price)
      ])
        .then(() => {
          loadProject()
          loadBalance()
          toast.success('Donation successful!')
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      <Col sm={12} md={4}>
        <Card className='mb-4'>
          <Card.Img variant='top' />
          <Card.Body>
            <Card.Title>{eachPlan.title}</Card.Title>
            <Card.Text>{eachPlan.description}</Card.Text>

            <div className='d-flex justify-content-center'>
              <Button variant='success' onClick={() => handleDonation()}>Donate</Button>
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
