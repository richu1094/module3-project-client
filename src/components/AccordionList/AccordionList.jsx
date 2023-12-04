import { Accordion } from 'react-bootstrap'
import projectService from '../../services/projects.services'
import { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import ProjectCard from '../ProjectCard/ProjectCard'

const AccordionList = ({ category }) => {
  const [project, setProject] = useState()

  useEffect(() => {
    loadProject()
  }, [])

  const loadProject = () => {
    projectService
      .getProjects()
      .then(({ data }) => setProject(data))
      .catch(err => console.log(err))
  }

  return category.map((eachCategory, i) => {
    return (
      <Accordion key={i}>
        <Accordion.Item eventKey={i}>
          <Accordion.Header>{eachCategory.title}</Accordion.Header>
          <Accordion.Body>
            {!project
              ? <Loader />
              : project.map((eachProject, i) => {
                return eachProject.category === eachCategory._id
                  ? <ProjectCard eachProject={eachProject} key={i} />
                  : null
              })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
  })
}

export default AccordionList
