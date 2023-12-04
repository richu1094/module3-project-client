import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import userService from '../../services/user.services'
import { toast } from 'sonner'

const AddFunds = ({ setShowFundsModal }) => {
  const [funds, setFunds] = useState({
    balance: 0
  })

  const handleInputChange = e => {
    const target = e.target
    const name = target.name
    const value = target.value

    setFunds({ [name]: value })
  }

  const handleFundsSubmit = e => {
    e.preventDefault()

    if (funds.balance <= 0) {
      toast.error('You must enter a valid amount')
      return
    }

    userService
      .addFunds(funds)
      .then(() => {
        setShowFundsModal(false)
        toast.success('Funds added successfully')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='AddFunds'>
      <Form onSubmit={handleFundsSubmit}>
        <div className='input-group mb-3'>
          <label className='form-label'>Funds</label>
          <InputGroup>
            <span className='input-group-text'>€</span>
            <input className='form-control' type='number' id='price' name='balance' value={funds.balance} onChange={handleInputChange} />
          </InputGroup>
        </div>

        <div className='d-grid mb-3'>
          <Button className='btn btn-dark' type='submit'>Add Funds</Button>
        </div>
      </Form>
    </div>
  )
}

export default AddFunds
