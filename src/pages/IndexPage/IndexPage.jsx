import { Button, Container } from 'react-bootstrap'
import DiscoverFeatured from '../../components/DiscoverFeatured/DiscoverFeatured'
import Hero from '../../components/Hero/Hero'
import { Link } from 'react-router-dom'

const IndexPage = () => {
  return (
    <div className='IndexPage text-center'>
      <Hero />
      <Container>
        <DiscoverFeatured />
        <Button className='mb-5' as={Link} to='/discover' variant='dark'>Discover More</Button>
      </Container>
    </div>
  )
}

export default IndexPage
