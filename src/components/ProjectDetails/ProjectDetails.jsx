import { useState } from 'react'
import { Row, Col, ProgressBar, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EditProjectForm from '../EditProjectForm/EditProjectForm'
import NewPlanForm from '../NewPlanForm/NewPlanForm'

const ProjectDetails = ({ project, loadProject, loadPlan, deleteProject }) => {
  const [showEditProjectModal, setShowEditProjectModal] = useState(false)
  const [showAddPlanModal, setShowAddPlanModal] = useState(false)

  const handleProgress = () => {
    const current = project.balance.current
    const goal = project.balance.goal
    const progress = (current / goal) * 100
    return progress
  }

  return (
    <div>
      <div className='text-center'>
        <h2>{project.title}</h2>
      </div>
      <hr />
      <Row>
        <Col className='col-md-6'>
          <img src={project.image} alt={project.title} className='img-fluid' />
        </Col>
        <Col className='col-md-6'>
          <div>
            <ProgressBar variant='success' animated now={handleProgress()} label={`${handleProgress()}%`} />
            <p><strong>Current balance:</strong> {project.balance.current}€</p>
            <p><strong>Goal:</strong> {project.balance.goal}€</p>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Project created at:</strong> {project.createdAt.slice(0, 10)}</p>
            <p><strong>Finishing in:</strong> {project.endDate.slice(0, 10)}</p>
          </div>

          <div>
            <Button variant='warning' onClick={() => setShowEditProjectModal(true)}>Edit Project</Button>
            <Button variant='success' onClick={() => setShowAddPlanModal(true)}>Add Plan</Button>
          </div>
          <div>
            <Button variant='danger' onClick={() => deleteProject()}>Delete Project</Button>
          </div>
        </Col>
      </Row>

      <Modal show={showEditProjectModal} onHide={() => setShowEditProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProjectForm project={project} setShowEditProjectModal={setShowEditProjectModal} loadProject={loadProject} />
        </Modal.Body>
      </Modal>

      <Modal show={showAddPlanModal} onHide={() => setShowAddPlanModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewPlanForm project={project} setShowAddPlanModal={setShowAddPlanModal} loadPlan={loadPlan} />
        </Modal.Body>
      </Modal>

    </div>

  )
}

export default ProjectDetails
