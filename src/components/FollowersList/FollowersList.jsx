import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
const FollowersList = ({ project, setShowFollowerModal }) => {

    return (
        <div className="FollowersList">
            <ul>
                {project.followers.map(elm => <li className="mb-3">{elm.username} <Button variant="outline-dark" size="sm" as={Link} to={`/profile/${elm._id}`}>View Profile</Button></li>)}
            </ul>
            <div className="text-center">
                <Button variant="dark" size="sm" onClick={() => setShowFollowerModal(false)}>Close</Button>
            </div>
        </div >)
}

export default FollowersList