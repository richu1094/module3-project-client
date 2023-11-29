import { useEffect, useState } from 'react'
import { Container, Button, Card } from 'react-bootstrap'
import ProjectService from '../../services/projects.services'
import ProjectList from '../../components/ProjectList/ProjectList'

const DiscoverPage = () => {

    const [projects, setProjects] = useState()

    useEffect(() => {
        loadProjects()
    }, [])

    const loadProjects = () => {
        ProjectService
            .getProjects()
            .then(({ data }) => setProjects(data))
            .catch(err => console.log(err))
    }

    return (

        <div className="IndexPage">
            <Container>
                <h1>Discover things</h1>
                <hr />
                {
                    //TO-DO: CAMBIAR A SPINNER
                    !projects ?
                        <h1>Cargando</h1> :
                        <ProjectList projects={projects} />
                }
            </Container>
        </div>
    )
}

export default DiscoverPage