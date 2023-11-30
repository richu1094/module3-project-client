import PlanCard from '../PlanCard/PlanCard'

const PlanList = ({ plans }) => {
    return plans.map((eachPlan, i) => <PlanCard eachPlan={eachPlan} key={i} />)
}

export default PlanList