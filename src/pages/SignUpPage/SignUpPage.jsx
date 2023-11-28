import { Container, Row, Col } from 'react-bootstrap'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

const SignUpPage = () => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Registro</h1>
                    <hr />
                    <SignUpForm />
                </Col>
            </Row>
        </Container >
    )
}

export default SignUpPage