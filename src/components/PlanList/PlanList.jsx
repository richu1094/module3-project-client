import { Row } from 'react-bootstrap'
import PlanCard from '../PlanCard/PlanCard'

const PlanList = ({ plans }) => {
    return (
        <Row>
            {plans.map((eachPlan, i) => <PlanCard eachPlan={eachPlan} key={i} />)}
        </Row>
    )
}

export default PlanList