import { Modal } from 'react-bootstrap'
import NewCategoryForm from '../NewCategoryForm/NewCategoryForm'
import EditCategoryForm from '../EditCategoryForm/EditCategoryForm'

const CategoryModalForm = ({ showModal, setShowModal, loadCategory, type, eachCategory }) => {
  return (
    <div className='CategoryModalForm'>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{type} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {type === 'Edit'
            ? <EditCategoryForm setShowModal={setShowModal} loadCategory={loadCategory} eachCategory={eachCategory} />
            : <NewCategoryForm setShowModal={setShowModal} loadCategory={loadCategory} />}
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default CategoryModalForm
