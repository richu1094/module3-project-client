import { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import planService from "../../services/plan.services";

const NewPlanForm = () => {

    const navigate = useNavigate();

    const [planData, setPlanData] = useState({
        title: '',
        description: '',
        image: "",
        content: "",
        price: 0,
        project: "65649ee88334efde3d2c61ed",
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
            .then(response => {
                console.log(response)
                return navigate("/discover")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="NewPlanForm">
            <Card style={{ width: '40rem', minHeight: '20rem', margin: "10px" }}>
                <Card.Body>
                    <Form onSubmit={handlePlanSubmit}>
                        <div class="input-group mb-3">
                            <label for="title" class="form-label">Title</label>
                            <InputGroup>
                                <input class="form-control" size="sm" type="text" id="title" name="title" placeholder="Title" onChange={handleInputChange} />
                            </InputGroup>
                        </div>

                        <div class="input-group mb-3">
                            <label for="description" class="form-label">Description</label>
                            <InputGroup>
                                <input class="form-control" type="text" id="description" name="description" placeholder="Description" onChange={handleInputChange} />
                            </InputGroup>
                        </div>

                        <div class="input-group mb-3">
                            <label for="image" class="form-label">Image</label>
                            <InputGroup>
                                <input className="form-control" type="file" id="image" name="image" onChange={handleInputChange} />
                            </InputGroup>
                        </div>

                        <div class="input-group mb-3">
                            <label for="price" class="form-label">Price</label>
                            <InputGroup>
                                <span class="input-group-text">€</span>
                                <input class="form-control" type="number" id='price' name="price" placeholder="Price for this plan" onChange={handleInputChange} />
                            </InputGroup>
                        </div>

                        <div class="input-group mb-3">
                            <label for="content" class="form-label">Content</label>
                            <InputGroup>
                                <textarea class="form-control" rows="3" id="content" name="content" placeholder="What will be included in this plan" onChange={handleInputChange} />
                            </InputGroup>
                        </div>

                        <Form.Check className="mb-3" type="checkbox" label="Is Recommended?" name="isRecommended" checked={planData.isRecommended} onChange={handleInputChange} />

                        <div className="d-grid">
                            <Button variant="outline-dark" type="submit">Add</Button>
                            <Button variant="outline-dark" type="submit">Return</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NewPlanForm








