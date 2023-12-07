import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const SignUpForm = () => {
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
      .then(() => {
        navigate('/log-in')
        toast.success('User created successfully')
      })
      .catch(err => {
        console.log(err)
        toast.error('Error creating user')
      })
  }

  return (

    <div className='SignUpForm'>
      <Card className='border-1 shadow'>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label><strong>Username</strong></Form.Label>
              <Form.Control type='text' value={signupData.username} onChange={handleInputChange} name='username' />
              <small className='text-muted'>Username must be at least 3 characters long</small>
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label><strong>Password</strong></Form.Label>
              <Form.Control type='password' value={signupData.password} onChange={handleInputChange} name='password' />
              <small className='text-muted'>Password must be at least 3 characters long</small>
            </Form.Group>

            <Form.Group className='mb-3' controlId='email'>
              <Form.Label><strong>Email</strong></Form.Label>
              <Form.Control type='email' value={signupData.email} onChange={handleInputChange} name='email' />
              <small className='text-muted'>We'll never share your personal information with anyone.</small>
            </Form.Group>

            <Form.Check className='mb-5' type='checkbox' label='I agree to the Terms and Conditions' onChange={() => setCheckbox(!checkbox)} />

            <div className='text-center'>
              <Button className='btn btn-dark mx-2'size='lg' type='submit'>Create Account</Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </div>

  )
}

export default SignUpForm
