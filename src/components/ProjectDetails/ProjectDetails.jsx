import { useContext, useEffect, useState } from 'react'
import { Row, Col, ProgressBar, Modal, Button, Card } from 'react-bootstrap'
import EditProjectForm from '../EditProjectForm/EditProjectForm'
import NewPlanForm from '../NewPlanForm/NewPlanForm'
import userService from '../../services/user.services'
import projectService from '../../services/projects.services'
import { toast } from 'sonner'
import { AuthContext } from '../../contexts/auth.context'
import { Link } from 'react-router-dom'
import FollowersList from '../FollowersList/FollowersList'
import { RiUserUnfollowFill } from "react-icons/ri";
import { RiUserFollowFill } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ProjectDetails = ({ project, loadProject, loadPlan, deleteProject }) => {
  const { loggedUser, isAdmin } = useContext(AuthContext)
  const [showEditProjectModal, setShowEditProjectModal] = useState(false)
  const [showAddPlanModal, setShowAddPlanModal] = useState(false)
  const [renderButton, setRenderButton] = useState(false)
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

  const handleFollowButton = () => {
    project.followers.some(elm => elm._id === loggedUser?._id)
      ? setRenderButton(false) : setRenderButton(true)
  }

  useEffect(() => {
    handleFollowButton()
  }, [project])

  const handleDate = () => {
    const date1 = new Date(project.endDate)
    const date2 = new Date()
    const diffTime = Math.abs(date2 - date1)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60)) % 24
    return [diffDays, diffHours]
  }

  return (
    <div className='my-4'>
      <div className='text-center'>
        <h2><strong>{project.title}</strong></h2>
      </div>
      <hr />
      <Row className='align-items-center'>
        <Col className='col-md-6'>
          <img src={project.image} alt={project.title} className='img-fluid' />
        </Col>
        <Col className='col-md-6'>
          <Card className='p-4'>
            <div >
              <ProgressBar variant='success' animated now={handleProgress()} label={`${handleProgress()}%`} />
              <p><strong>Current balance:</strong> {project.balance.current}€</p>
              <p><strong>Goal:</strong> {project.balance.goal}€</p>
              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Created at:</strong> {project.createdAt.slice(0, 10)}</p>
              <p><strong>Donations Recibed:</strong> {project.supporters.length}</p>
              <p><strong>Followed by: </strong> <Link className='text-muted' onClick={() => setShowFollowerModal(true)}>{project.followers.length} users</Link></p>
              <p><strong>Finishing in:</strong> {handleDate()[0]} days and {handleDate()[1]} hours.</p>
            </div>

            {loggedUser && renderButton
              ? <div className='mb-3'> <Button variant='dark' onClick={() => handleFollow()}>Follow <RiUserFollowFill /></Button></div>
              : loggedUser && <div className='mb-3'> <Button variant='dark' onClick={() => handleUnfollow()}>Unfollow <RiUserUnfollowFill /></Button></div>}

            {(isAdmin || loggedUser?._id === project.owner._id) &&
              <div className='mb-3'>
                <Button variant='dark' onClick={() => setShowAddPlanModal(true)}>Add Plan <IoAddCircleOutline /></Button>
              </div>
            }

            {(isAdmin || loggedUser?._id === project.owner._id) &&
              <div className='mb-3'>
                <Button className='mr-2' variant="outline-warning" onClick={() => setShowEditProjectModal(true)}>Edit Project <FaEdit /></Button>
                <Button className='mx-2' variant="outline-danger" onClick={() => deleteProject()}>Delete Project <MdDeleteOutline /></Button>
              </div>
            }
          </Card>
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
