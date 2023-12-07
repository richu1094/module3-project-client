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
    <div className='LogInForm my-5'>
      <Card className='border-1 shadow'>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mt-2 mb-4' controlId='email'>
              <Form.Label><strong>Email:</strong></Form.Label>
              <Form.Control type='email' value={loginData.email} onChange={handleInputChange} name='email' placeholder='Type your email' />
              <small className='text-muted'>We'll never share your personal information with anyone else.</small>
            </Form.Group>

            <Form.Group className='mb-4' controlId='password'>
              <Form.Label><strong>Password:</strong></Form.Label>
              <Form.Control type='password' value={loginData.password} onChange={handleInputChange} name='password' placeholder='Type your password' />
            </Form.Group>

            <Form.Group className='d-flex justify-content-between mb-4' controlId='remember'>
              <Form.Label as={Link} to='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' className='text-muted'>Forgot your password?</Form.Label>
              <Form.Label as={Link} to='/sign-up' className='text-muted'>Create a new Account</Form.Label>
            </Form.Group>

            <div className='text-center mb-3'>
              <Button variant='dark' type='submit' size="lg">Log in</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LogInForm
