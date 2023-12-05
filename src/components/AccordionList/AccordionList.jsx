import { Accordion } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import ProjectCard from '../ProjectCard/ProjectCard'

const AccordionList = ({ category, project }) => {
  return category.map((elm, i) => {
    return (
      <Accordion key={i}>
        <Accordion.Item eventKey={i}>
          <Accordion.Header>{elm.title}</Accordion.Header>
          <Accordion.Body>
            {!project
              ? <Loader />
              : project.map((eachProject, i) => {
                return eachProject.category === elm._id
                  && <ProjectCard eachProject={eachProject} key={i} />
              })
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
  })
}

export default AccordionList
