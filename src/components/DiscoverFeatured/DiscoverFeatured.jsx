import { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import ProjectList from '../ProjectList/ProjectList'
import ProjectService from '../../services/projects.services'
import './DiscoverFeatured.css'

const DiscoverFeatured = () => {
  const [projects, setProjects] = useState()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    ProjectService
      .getFeaturedProjects()
      .then(({ data }) => setProjects(data))
      .catch(err => console.log(err))
  }

  return (
    <div className='DiscoverFeatured my-4'>
      <div>
        <h2 className="halfColorH2">Our amazing projects. It will blow your mind.</h2>
      </div>
      <hr />
      {
        !projects
          ? <Loader />
          : <ProjectList projects={projects} />
      }
    </div>
  )
}

export default DiscoverFeatured
