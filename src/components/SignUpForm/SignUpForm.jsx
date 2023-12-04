import { useEffect, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const SignUpForm = () => {
  const [errors, setErrors] = useState([])
  const [checkbox, setCheckbox] = useState(false)

  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: ''
  })

  const handleInputChange = e => {
    const { value, name } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const navigate = useNavigate()

  const handleFormSubmit = e => {
    e.preventDefault()

    const errors = []

    if (signupData.username.length < 3) errors.push('Username must be at least 3 characters long')
    if (signupData.email.length < 3) errors.push('Email must be at least 3 characters long')
    if (signupData.password.length < 3) errors.push('Password must be at least 3 characters long')
    if (checkbox === false) errors.push('You must accept the Terms and Conditions')

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return
    }

    authService
      .signup(signupData)
      .then(() => navigate('/log-in'))
      .catch(err => setErrors(err.response.data.errorMessages))
  }

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach(err => toast.error(err, 'error'))
    }
  }, [errors])

  return (

    <div className='SignUpForm'>
      <Card>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' value={signupData.username} onChange={handleInputChange} name='username' />
              <small className='text-muted'>Username must be at least 3 characters long</small>
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' value={signupData.password} onChange={handleInputChange} name='password' />
              <small className='text-muted'>Password must be at least 3 characters long</small>
            </Form.Group>

            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' value={signupData.email} onChange={handleInputChange} name='email' />
              <small className='text-muted'>We'll never share your email with anyone else.</small>
            </Form.Group>

            <Form.Check className='mb-5' type='checkbox' label='I agree to the Terms and Conditions' onChange={() => setCheckbox(!checkbox)} />

            <div className='d-grid'>
              <Button className='btn btn-dark' type='submit'>Create Account</Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </div>

  )
}

export default SignUpForm
