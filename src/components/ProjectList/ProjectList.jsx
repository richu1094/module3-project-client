import { Row } from 'react-bootstrap'
import ProjectCard from '../ProjectCard/ProjectCard'

const ProjectList = ({ projects }) => {
  return (
    <Row className="justify-content-center">
      {projects.map((eachProject, i) => <ProjectCard eachProject={eachProject} key={i} />)}
    </Row>)
}

export default ProjectList