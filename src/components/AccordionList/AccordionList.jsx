import { Accordion } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import DiscoverProjectRow from '../DiscoverProjectRow/DiscoverProjectRow'

const AccordionList = ({ category, project }) => {
  return category.map((eachCategory, i) => {
    return (
      <Accordion className='my-3' key={i}>
        <Accordion.Item eventKey={i}>
          <Accordion.Header>{eachCategory.title}</Accordion.Header>
          <Accordion.Body className='text-center'>
            <h5 className='mb-5'>{eachCategory.description}</h5>
            {!project
              ? <Loader />
              : <DiscoverProjectRow eachCategory={eachCategory} project={project} />
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
  })
}

export default AccordionList
