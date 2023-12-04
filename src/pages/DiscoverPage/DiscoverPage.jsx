import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import categoryService from '../../services/category.services'
import Loader from '../../components/Loader/Loader'
import AccordionList from '../../components/AccordionList/AccordionList'

const DiscoverPage = () => {
  const [category, setCategory] = useState()

  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory = () => {
    categoryService
      .getCategories()
      .then(({ data }) => setCategory(data))
      .catch(err => console.log(err))
  }

  return (
    <div className='DiscoverPage'>
      <Container>
        <h2>Discover</h2>
        <hr />
        {
                    !category
                      ? <Loader />
                      : <AccordionList category={category} />
                }
      </Container>
    </div>
  )
}

export default DiscoverPage
