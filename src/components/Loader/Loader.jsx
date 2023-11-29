import { Spinner } from "react-bootstrap"

const Loader = () => {

    return (
        <Spinner className="mt-2" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

}

export default Loader