import { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap"
import planService from "../../services/plan.services";

const NewPlanForm = ({ project, setShowAddPlanModal, loadPlan }) => {

    const [planData, setPlanData] = useState({
        title: '',
        description: '',
        image: "",
        content: "",
        price: 0,
        project: project._id,
        isRecommended: false
    })

    const handleInputChange = e => {

        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setPlanData({ ...planData, [name]: value })
    }

    const handlePlanSubmit = e => {
        e.preventDefault()

        planService
            .createPlan(planData)
            .then(() => {
                setShowAddPlanModal(false)
                loadPlan()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="NewPlanForm">
            <Card>
                <Card.Body>
                    <Form onSubmit={handlePlanSubmit}>
                        <div className="input-group mb-3">
                            <label for="title" className="form-label">Title</label>
                            <InputGroup>
                                <input class="form-control" size="sm" type="text" id="title" name="title" placeholder="Title" onChange={handleInputChange} />
                            </InputGroup>
                        </div>

                        <div className="input-group mb-3">
                            <label for="description" className="form-label">Description</label>
                            <InputGroup>
                                <input class="form-control" type="text" id="description" name="description" placeholder="Description" onChange={handleInputChange} />
                            </InputGroup>
                        </div>

                        <div className="input-group mb-3">
                            <label for="image" className="form-label">Image</label>
                            <InputGroup>
                                <input className="form-control" type="file" id="image" name="image" onChange={handleInputChange} />
                            </InputGroup>
                        </div>

                        <div className="input-group mb-3">
                            <label for="price" className="form-label">Price</label>
                            <InputGroup>
                                <span class="input-group-text">€</span>
                                <input class="form-control" type="number" id='price' name="price" placeholder="Price for this plan" onChange={handleInputChange} />
                            </InputGroup>
                        </div>

                        <div className="input-group mb-3">
                            <label for="content" className="form-label">Content</label>
                            <InputGroup>
                                <textarea class="form-control" rows="3" id="content" name="content" placeholder="What will be included in this plan" onChange={handleInputChange} />
                            </InputGroup>
                        </div>

                        <Form.Check className="mb-3" type="checkbox" label="Is Recommended?" name="isRecommended" checked={planData.isRecommended} onChange={handleInputChange} />

                        <div className="d-flex justify-content-center">
                            <Button variant="dark" type="submit">Create Plan</Button>
                            <Button variant="dark" onClick={() => setShowAddPlanModal(false)}>Cancel</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NewPlanForm








