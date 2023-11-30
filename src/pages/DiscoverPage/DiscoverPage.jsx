import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ProjectService from '../../services/projects.services'
import ProjectList from '../../components/ProjectList/ProjectList'
import Loader from '../../components/Loader/Loader'
import { Link } from 'react-router-dom'

const DiscoverPage = () => {

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
        <div className="IndexPage">
            <Container>
                <h1>Discover things</h1>
                <hr />
                {
                    !projects ?
                        <Loader /> :
                        <ProjectList projects={projects} />
                }
                <Link to={'/discover/extended'} className='btn btn-dark mb-5'>Discover Extended</Link>
            </Container>
        </div>
    )
}

export default DiscoverPage