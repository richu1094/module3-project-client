import { Container, Row, Col } from 'react-bootstrap'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import logo from './../../assets/img/logo/logo2.png'

const SignUpPage = () => {
  return (
    <Container>
      <Row className='my-5'>
        <Col md={{ span: 6, offset: 3 }}>
          <div className='text-center'>
            <img src={logo} alt='logo' width='250' height='250' />
            <hr />
            <h2>Welcome to the community!</h2>
          </div>
          <hr />
          <SignUpForm />
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpPage
