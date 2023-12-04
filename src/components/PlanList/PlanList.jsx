import { Row } from 'react-bootstrap'
import PlanCard from '../PlanCard/PlanCard'

const PlanList = ({ plans, loadPlan, loadProject, deletePlan }) => {
  return (
    <div className='PlanList'>
      <div className='text-center'>
        <h2>Rewards</h2>
      </div>
      <hr />
      <Row>
        {plans.map((eachPlan, i) => <PlanCard eachPlan={eachPlan} loadPlan={loadPlan} loadProject={loadProject} deletePlan={deletePlan} key={i} />)}
      </Row>
    </div>
  )
}

export default PlanList
