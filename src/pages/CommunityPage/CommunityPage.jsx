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
    <div className='CommunityPage'>
      <Container>
        <h2>Our Community</h2>
        <hr />
        {!usersData
          ? <Loader />
          : <CommunityList usersData={usersData} />}
      </Container>
    </div>
  )
}

export default CommunityPage
