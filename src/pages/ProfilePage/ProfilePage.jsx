import { useEffect, useState } from 'react'
import userService from '../../services/user.services'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import Profile from '../../components/Profile/Profile'

const ProfilePage = () => {
  const [profile, setProfile] = useState()
  const { id } = useParams()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = () => {
    userService
      .getOneUser(id)
      .then(({ data }) => setProfile(data))
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <Container>
        <div className='text-center my-3'>
          <h2><strong>Profile Page 🔎</strong></h2>
        </div>
        <hr />
        {!profile
          ? <Loader />
          : <Profile profile={profile} loadProfile={loadProfile} />}
      </Container>
    </div>
  )
}

export default ProfilePage
