import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/auth.context";
import { Form, Button } from "react-bootstrap"
import userService from "../../services/user.services"
import uploadServices from "../../services/upload.services";

const EditUserForm = ({ setShowEditModal, profile, loadProfile }) => {

    const { isAdmin } = useContext(AuthContext)
    const [loadingImage, setLoadingImage] = useState(false)
    const [profileData, setProfileData] = useState({
        username: profile.username,
        email: profile.email,
        avatar: "https://res.cloudinary.com/db6gxc2n0/image/upload/v1701567818/c1lv68pjmmz5rl2ssg6z.png",
        role: profile.role,
        balance: profile.balance
    })

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setProfileData({ ...profileData, [name]: value })
    }

    const handleCategorySubmit = e => {
        e.preventDefault()

        userService.editUser(profile._id, profileData)
            .then(() => {
                setShowEditModal(false)
                loadProfile()
            })
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {
        setLoadingImage(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setProfileData({ ...profileData, avatar: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    return (
        <div className="NewCategoryForm">
            <Form onSubmit={handleCategorySubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={profileData.username} name="username" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="text" value={profileData.email} name="email" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>

                {isAdmin &&
                    <>
                        <Form.Group className="mb-3" controlId="role">
                            <Form.Label>Role</Form.Label>
                            <Form.Select onChange={handleInputChange} name="role" value={profileData.role}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="balance">
                            <Form.Label>Balance</Form.Label>
                            <Form.Control type="text" value={profileData.balance} name="balance" onChange={handleInputChange} />
                        </Form.Group>
                    </>
                }

                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? "Loading..." : "Edit user"}</Button>
                </div>
            </Form>
        </div >
    )
}

export default EditUserForm