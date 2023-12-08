import { useEffect, useState } from 'react'
import userService from '../../services/user.services'
import { Container } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import CommunityList from '../../components/CommunityList/CommunityList'

const CommunityPage = () => {
  const [usersData, setUsersData] = useState()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    userService
      .getUsers()
      .then(({ data }) => setUsersData(data))
      .catch((err) => console.error(err))
  }

  return (
    <div className='CommunityPage my-4 text-center'>
      <Container>
        <h2><strong>Our Wonderful Community 🌍</strong></h2>
        <hr />
        {!usersData
          ? <Loader />
          : <CommunityList usersData={usersData} />}
      </Container>
    </div>
  )
}

export default CommunityPage
