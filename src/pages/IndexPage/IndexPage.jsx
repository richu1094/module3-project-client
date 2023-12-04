import { Container } from 'react-bootstrap'
import DiscoverFeatured from '../../components/DiscoverFeatured/DiscoverFeatured'

const IndexPage = () => {
  return (
    <div className='IndexPage'>
      <Container>
        <h1>Bienvenido a RICHISTARTER</h1>
        <hr />
        <DiscoverFeatured />
      </Container>
    </div>
  )
}

export default IndexPage
