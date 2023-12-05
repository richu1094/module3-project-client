import { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Modal } from 'react-bootstrap'
import EditPlanForm from '../EditPlanForm/EditPlanForm'
import userService from '../../services/user.services'
import projectService from '../../services/projects.services'
import { AuthContext } from '../../contexts/auth.context'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const PlanCard = ({ eachPlan, loadPlan, loadProject, deletePlan }) => {
  const { loggedUser, isAdmin } = useContext(AuthContext)
  const [showEditPlanModal, setShowEditPlanModal] = useState(false)
  const [balance, setBalance] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    loggedUser && loadBalance()
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
          <Card.Img variant='top' src={eachPlan.image} />
          <Card.Body>
            <div className='d-flex justify-content-center'>
              <Card.Title>{eachPlan.title}</Card.Title>
            </div>
            <Card.Text><strong>Description:</strong> {eachPlan.description}</Card.Text>
            <Card.Text><strong>Amount:</strong> {eachPlan.price}€</Card.Text>
            <Card.Text><strong>Content:</strong> {eachPlan.content}</Card.Text>
            {!loggedUser &&
              <div className='d-flex justify-content-center'>
                <Button variant='success' onClick={() => navigate('/log-in')}>Donate</Button>
              </div>}

            {loggedUser &&
              <div className='d-flex justify-content-center mb-3'>
                <Button variant='success' onClick={() => handleDonation()}>Donate</Button>
              </div>}

            {isAdmin || loggedUser && loggedUser._id === eachPlan.project.owner._id
              ? <div className='d-flex justify-content-center mb-3'>
                <Button variant='warning' onClick={() => setShowEditPlanModal(true)}>Edit</Button>
                <Button variant='danger' onClick={() => deletePlan(eachPlan._id)}>Delete</Button>
              </div>
              : null}

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
