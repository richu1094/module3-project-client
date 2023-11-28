import ProjectCard from '../ProjectCard/ProjectCard'

const ProjectList = ({ projects }) => {
    return projects.map((eachProject, i) => <ProjectCard eachProject={eachProject} key={i} />)
}

export default ProjectList