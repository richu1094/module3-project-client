import { Container, Row, Col } from 'react-bootstrap'
import LogInForm from '../../components/LogInForm/LogInForm'
import logo from './../../assets/img/logo/logo2.png'

const LogInPage = () => {
  return (
    <Container>
      <Row>
        <Col className='my-5' md={{ span: 6, offset: 3 }}>
          <div className='my-4 text-center'>
            <img src={logo} alt='logo' width='250' height='250' />
            <hr />
            <h3>Stay up to date on with creators with ease.</h3>
            <hr />
          </div>
          <LogInForm />
        </Col >
      </Row>
    </Container>
  )
}

export default LogInPage
