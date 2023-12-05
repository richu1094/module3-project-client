import { useContext, useState } from 'react'
import { Row, Col, ProgressBar, Modal, Button } from 'react-bootstrap'
import EditProjectForm from '../EditProjectForm/EditProjectForm'
import NewPlanForm from '../NewPlanForm/NewPlanForm'
import userService from '../../services/user.services'
import projectService from '../../services/projects.services'
import { toast } from 'sonner'
import { AuthContext } from '../../contexts/auth.context'

const ProjectDetails = ({ project, loadProject, loadPlan, deleteProject }) => {
  const { loggedUser, isAdmin } = useContext(AuthContext)
  const [showEditProjectModal, setShowEditProjectModal] = useState(false)
  const [showAddPlanModal, setShowAddPlanModal] = useState(false)

  const handleProgress = () => {
    const current = project.balance.current
    const goal = project.balance.goal
    const progress = ((current / goal) * 100).toFixed(2)
    return progress
  }

  const handleFollow = () => {
    Promise.all([
      userService.followProject(project._id),
      projectService.followedByUser(project._id)
    ])
      .then(() => {
        loadProject()
        toast('Project followed!')
      })
      .catch(err => { console.log(err) })
  }

  const handleUnfollow = () => {
    Promise.all([
      userService.unfollowProject(project._id),
      projectService.unfollowedByUser(project._id)
    ])
      .then(() => {
        loadProject()
        toast('Project unfollowed!')
      }
      )
      .catch(err => console.log(err))
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

          {loggedUser && <div className='mb-3'>
            <Button variant='success' onClick={() => handleFollow()}>Follow</Button>
            <Button variant='warning' onClick={() => handleUnfollow()}>Unfollow</Button>
          </div>}

          {isAdmin || loggedUser?._id === project.owner._id ?
            <div className='mb-3'>
              <Button variant='success' onClick={() => setShowAddPlanModal(true)}>Add Plan</Button>
              <Button variant='warning' onClick={() => setShowEditProjectModal(true)}>Edit Project</Button>
            </div> : null}

          {isAdmin || loggedUser?._id === project.owner._id ?
            <div className='mb-3'>
              <Button variant='danger' onClick={() => deleteProject()}>Delete Project</Button>
            </div> : null}
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
