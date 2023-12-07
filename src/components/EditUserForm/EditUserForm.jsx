import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { Form, Button } from 'react-bootstrap'
import userService from '../../services/user.services'
import uploadServices from '../../services/upload.services'
import { toast } from 'sonner'

const EditUserForm = ({ setShowEditModal, profile, loadProfile }) => {
  const { isAdmin, logout } = useContext(AuthContext)
  const [loadingImage, setLoadingImage] = useState(false)

  const [profileData, setProfileData] = useState({
    username: profile.username,
    description: profile.description,
    email: profile.email,
    avatar: profile.avatar || 'https://res.cloudinary.com/dv7hswrot/image/upload/v1619680312/userDefaultIcon_qvyjtz.png',
    role: profile.role,
    balance: profile.balance,
    location: profile.location
  })

  const handleInputChange = e => {
    const { value, name } = e.currentTarget
    setProfileData({ ...profileData, [name]: value })
  }

  const handleCategorySubmit = e => {
    e.preventDefault()

    const errors = []

    if (profileData.username.length < 3) errors.push('Username must be at least 3 characters long')
    if (profileData.description.length < 3) errors.push('Description must be at least 3 characters long')
    if (profileData.email.length < 3) errors.push('E-mail must be at least 3 characters long')
    if (profileData.role.length < 1) errors.push('Role must be selected')
    if (profileData.balance < 0) errors.push('Balance must be at least 0')
    if (profileData.location.length < 3) errors.push('Location must be at least 3 characters long')

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return
    }

    userService.editUser(profile._id, profileData)
      .then(() => {
        toast.success('Profile edited successfully')
        setShowEditModal(false)
        loadProfile()
      })
      .catch(err => console.log(err))
  }

  const handleFileUpload = e => {
    setLoadingImage(true)
    const formData = new FormData()
    formData.append('imageData', e.target.files[0])

    uploadServices
      .uploadimage(formData)
      .then(res => {
        setProfileData({ ...profileData, avatar: res.data.cloudinary_url })
        setLoadingImage(false)
      })
      .catch(err => {
        console.log(err)
        setLoadingImage(false)
      })
  }

  return (
    <div className='NewCategoryForm'>
      <Form onSubmit={handleCategorySubmit}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' value={profileData.username} name='username' onChange={handleInputChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control as='textarea' rows={3} value={profileData.description} name='description' onChange={handleInputChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>E-mail</Form.Label>
          <Form.Control type='text' value={profileData.email} name='email' onChange={handleInputChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='location'>
          <Form.Label>Location</Form.Label>
          <Form.Control type='text' value={profileData.location} name='location' onChange={handleInputChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.Control type='file' onChange={handleFileUpload} />
        </Form.Group>

        {isAdmin &&
          <>
            <Form.Group className='mb-3' controlId='role'>
              <Form.Label>Role</Form.Label>
              <Form.Select onChange={handleInputChange} name='role' value={profileData.role}>
                <option value='ADMIN'>ADMIN</option>
                <option value='USER'>USER</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='balance'>
              <Form.Label>Balance</Form.Label>
              <Form.Control type='text' value={profileData.balance} name='balance' onChange={handleInputChange} />
            </Form.Group>
          </>}

        <div className='text-center'>
          <Button variant='dark' type='submit' disabled={loadingImage}>{loadingImage ? 'Loading...' : 'Edit user'}</Button>
          <Button variant='dark' onClick={() => setShowEditModal(false)}>Cancel</Button>
        </div>
      </Form>
    </div>
  )
}

export default EditUserForm
