import { Container, Button, Modal } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import categoryService from '../../services/category.services'
import { AuthContext } from '../../contexts/auth.context'
import Loader from '../../components/Loader/Loader'
import AccordionList from '../../components/AccordionList/AccordionList'
import NewProjectForm from '../../components/NewProjectForm/NewProjectForm'
import projectService from '../../services/projects.services'

const DiscoverPage = () => {
  const { loggedUser } = useContext(AuthContext)
  const [project, setProject] = useState()
  const [category, setCategory] = useState()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadCategory()
    loadProject()
  }, [])


  const loadCategory = () => {
    categoryService
      .getCategories()
      .then(({ data }) => setCategory(data))
      .catch(err => console.log(err))
  }

  const loadProject = () => {
    projectService
      .getProjects()
      .then(({ data }) => setProject(data))
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className='DiscoverPage'>
        <Container>
          <h2>Discover</h2>
          <hr />
          {loggedUser &&
            <div className='d-flex justify-content-end mb-3'>
              <Button variant='dark' onClick={() => setShowModal(true)}>Create Project</Button>
            </div>}
          {
            !category
              ? <Loader />
              : <AccordionList category={category} project={project} />
          }
          <hr />
        </Container>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewProjectForm setShowModal={setShowModal} loadProject={loadProject} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DiscoverPage
