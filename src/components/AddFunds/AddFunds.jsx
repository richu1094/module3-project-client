import { useEffect, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap"
import userService from "../../services/user.services";

const AddFunds = ({ setShowModal }) => {

    const [funds, setFunds] = useState({
        balance: 0
    })

    const handleInputChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setFunds({ [name]: value })

    }

    const handleFundsSubmit = e => {
        e.preventDefault()

        userService
            .addFunds(funds)
            .then(() => {
                setShowModal(false)
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="AddFunds">
            <Form onSubmit={handleFundsSubmit}>
                <div className="input-group mb-3">
                    <label className="form-label">Funds</label>
                    <InputGroup>
                        <span className="input-group-text">€</span>
                        <input className="form-control" type="number" id='price' name="balance" value={funds.balance} onChange={handleInputChange} />
                    </InputGroup>
                </div>

                <div className="d-grid mb-3">
                    <Button variant="outline-dark" type="submit">Add</Button>
                </div>
            </Form>
        </div>
    )

};

export default AddFunds;
