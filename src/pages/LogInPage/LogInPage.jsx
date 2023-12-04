import { Container, Row, Col } from 'react-bootstrap'
import LogInForm from '../../components/LogInForm/LogInForm'

const LogInPage = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Log In</h2>
          <hr />
          <LogInForm />
        </Col>
      </Row>
    </Container>
  )
}

export default LogInPage
