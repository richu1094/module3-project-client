import { useContext, useState } from 'react'
import { Row, Col, ProgressBar, Modal, Button } from 'react-bootstrap'
import EditProjectForm from '../EditProjectForm/EditProjectForm'
import NewPlanForm from '../NewPlanForm/NewPlanForm'
import userService from '../../services/user.services'
import projectService from '../../services/projects.services'
import { toast } from 'sonner'
import { AuthContext } from '../../contexts/auth.context'
import { Link } from 'react-router-dom'
import FollowersList from '../FollowersList/FollowersList'

const ProjectDetails = ({ project, loadProject, loadPlan, deleteProject }) => {
  const { loggedUser, isAdmin } = useContext(AuthContext)
  const [showEditProjectModal, setShowEditProjectModal] = useState(false)
  const [showAddPlanModal, setShowAddPlanModal] = useState(false)
  const [showFollowerModal, setShowFollowerModal] = useState(false)

  const handleProgress = () => {
    const { current, goal } = project.balance
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
      })
      .catch(err => console.log(err))
  }

  const handleDate = () => {
    const date1 = new Date(project.endDate)
    const date2 = new Date(project.createdAt)
    const diffTime = Math.abs(date2 - date1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
            <p><strong>Created at:</strong> {project.createdAt.slice(0, 10)}</p>
            <p><strong>Donations Recibed:</strong> {project.supporters.length}</p>
            <p><strong>Followed by: </strong> <Link className='text-muted' onClick={() => setShowFollowerModal(true)}>{project.followers.length} users</Link></p>
            <p><strong>Finishing in:</strong> {handleDate()} days</p>
          </div>

          {loggedUser && <div className='mb-3'>
            <Button variant='success' onClick={() => handleFollow()}>Follow</Button>
            <Button variant='warning' onClick={() => handleUnfollow()}>Unfollow</Button>
          </div>}

          {isAdmin || loggedUser?._id === project.owner._id
            ? <div className='mb-3'>
              <Button variant='success' onClick={() => setShowAddPlanModal(true)}>Add Plan</Button>
            </div>
            : null}

          {isAdmin || loggedUser?._id === project.owner._id
            ? <div className='mb-3'>
              <Button variant='warning' onClick={() => setShowEditProjectModal(true)}>Edit Project</Button>
              <Button variant='danger' onClick={() => deleteProject()}>Delete Project</Button>
            </div>
            : null}
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

      <Modal show={showFollowerModal} onHide={() => setShowFollowerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Followers List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FollowersList project={project} setShowFollowerModal={setShowFollowerModal} />
        </Modal.Body>
      </Modal>

    </div >

  )
}

export default ProjectDetails
