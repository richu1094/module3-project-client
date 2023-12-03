import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
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
            <Container>
                <h1>Discover things</h1>
                <hr />
                {
                    !projects ?
                        <Loader /> :
                        <ProjectList projects={projects} />
                }
                <Link to={'/discover'} className='btn btn-dark mb-5'>Discover More</Link>
            </Container>
        </div>
    )
}

export default DiscoverFeatured