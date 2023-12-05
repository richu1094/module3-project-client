import { useContext, useEffect, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { toast } from 'sonner'

const LogInForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const { authenticateUser } = useContext(AuthContext)

  const handleInputChange = e => {
    const { value, name } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const errors = []

    if (loginData.email.length < 3) errors.push('Email must be at least 3 characters long')
    if (loginData.password.length < 3) errors.push('Password must be at least 3 characters long')

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return
    }

    authService
      .login(loginData)
      .then(({ data }) => {
        localStorage.setItem('authToken', data.authToken)
        authenticateUser()
        navigate('/discover')
        toast.success('Logged in successfully')
      })
      .catch(err => {
        toast.error('The email or password are incorrect')
        console.log(err)
      })
  }

  return (
    <div className='LogInForm'>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>E-mail</Form.Label>
              <Form.Control type='email' value={loginData.email} onChange={handleInputChange} name='email' />
              <small className='text-muted'>We'll never share your email with anyone else.</small>
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' value={loginData.password} onChange={handleInputChange} name='password' />
            </Form.Group>

            <Form.Group className='d-flex justify-content-between' controlId='remember'>
              <Form.Label as={Link} to='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' className='text-muted'>Forgot your password?</Form.Label>
              <Form.Label as={Link} to='/sign-up' className='text-muted'>Create a new Account</Form.Label>
            </Form.Group>

            <div className='d-grid'>
              <Button variant='dark' type='submit'>Acceder</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LogInForm
