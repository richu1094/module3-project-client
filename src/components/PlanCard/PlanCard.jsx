import { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Modal } from 'react-bootstrap'
import EditPlanForm from '../EditPlanForm/EditPlanForm'
import userService from '../../services/user.services'
import projectService from '../../services/projects.services'
import { AuthContext } from '../../contexts/auth.context'
import { useNavigate } from 'react-router-dom'
import './PlanCard.css'
import { toast } from 'sonner'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";

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
      })
      .catch(err => console.log(err))
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
      <Col sm={12} md={4} className='my-4'>
        <Card className={(eachPlan.isRecommended === true) ? "border border-dark border-4 h-100" : "h-100"}>
          <Card.Img className='card-img-top' variant='top' src={eachPlan.image} />
          <Card.Body>
            <div className='d-flex justify-content-center'>
              <Card.Title>{eachPlan.title}</Card.Title>
            </div>
            <Card.Text><strong>Description:</strong> {eachPlan.description}</Card.Text>
            <Card.Text><strong>Amount:</strong> {eachPlan.price}€</Card.Text>
            <Card.Text><strong>Content:</strong> {eachPlan.content}</Card.Text>
            {!loggedUser &&
              <div className='text-center my-4'>
                <Button variant='success' onClick={() => navigate('/log-in')}>Donate</Button>
              </div>}

            {loggedUser &&
              <div className='text-center my-4'>
                <Button variant='success' onClick={() => handleDonation()}>Donate <FaRegMoneyBillAlt /></Button>
              </div>}

            {isAdmin || loggedUser && loggedUser._id === eachPlan.project.owner._id
              ? <div className='text-center my-4'>
                <Button className='mx-2' variant='warning' onClick={() => setShowEditPlanModal(true)}>Edit <FaEdit /></Button>
                <Button className='mx-2' variant='danger' onClick={() => deletePlan(eachPlan._id)}>Delete <MdDeleteOutline /></Button>
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
