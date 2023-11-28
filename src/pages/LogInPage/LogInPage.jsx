import { Container, Row, Col } from 'react-bootstrap'
import LogInForm from '../../components/LogInForm/LogInForm'

const LogInPage = () => {
    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h1>Acceso</h1>
                    <hr />
                    <LogInForm />
                </Col>
            </Row>
        </Container>
    )
}

export default LogInPage