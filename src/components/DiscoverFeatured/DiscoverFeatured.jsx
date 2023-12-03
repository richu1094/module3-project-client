import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import ProjectList from '../ProjectList/ProjectList'
import ProjectService from '../../services/projects.services'
import { Link } from 'react-router-dom'

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
        <div className="DiscoverFeatured">
            <h2>Featured Projects</h2>
            <hr />
            {
                !projects ?
                    <Loader /> :
                    <ProjectList projects={projects} />
            }
            <Button as={Link} to={'/discover'} variant='dark'>Discover More</Button>
        </div>
    )
}

export default DiscoverFeatured