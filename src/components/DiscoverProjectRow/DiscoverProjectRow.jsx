import { Row } from "react-bootstrap"
import DiscoverProjectCard from "../DiscoverProjectCard/DiscorverProjectCard"

const DiscoverProjectRow = ({ eachCategory, project }) => {
    let counter = 0
    return (
        <>
            <Row className="justify-content-center">
                {project.map((eachProject, i) => {
                    if (eachProject.category === eachCategory._id) {
                        counter++
                        return <DiscoverProjectCard eachProject={eachProject} key={i} />
                    }
                })}
                {counter === 0 && <p>No projects in this category 😿</p>}
            </Row>
        </>
    )
}

export default DiscoverProjectRow