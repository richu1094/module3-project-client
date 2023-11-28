import { useEffect, useState } from 'react'
import { Container, Button, Card } from 'react-bootstrap'
import ProjectService from '../services/projects.services'
import ProjectList from '../components/ProjectList/ProjectList'

const IndexPage = () => {

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
                {
                    // Toca cambiar a spinner
                    !projects ?
                        <h1>Cargando</h1> :
                        <ProjectList projects={projects} />
                }
            </Container>
        </div>
    )
}

export default IndexPage

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// function HeaderAndFooterExample() {
//   return (
// < Card className = "text-center" >
//   <Card.Header>Featured</Card.Header>
//   <Card.Body>
//     <Card.Title>Special title treatment</Card.Title>
//     <Card.Text>
//       With supporting text below as a natural lead-in to additional content.
//     </Card.Text>
//     <Button variant="primary">Go somewhere</Button>
//   </Card.Body>
//   <Card.Footer className="text-muted">2 days ago</Card.Footer>
// </Card >
//   );
// }

// export default HeaderAndFooterExample;