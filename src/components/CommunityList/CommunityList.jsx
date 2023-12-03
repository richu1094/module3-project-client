import { Row } from "react-bootstrap"
import CommunityCard from "../CommunityCard/CommunityCard"

const CommunityList = ({ usersData }) => {
    return (
        <Row>
            {usersData.map((eachUser, i) => <CommunityCard eachUser={eachUser} key={i} />)}
        </Row>
    )
}

export default CommunityList