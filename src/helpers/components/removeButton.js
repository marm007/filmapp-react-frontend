import Col from "react-bootstrap/Col"
import ButtonBase from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const RemoveButton = ({ handleRemove }) => {
    return (
        <Col
            className="text-center justify-content-center d-flex align-items-center p-0 flex-grow-0">
            <Col
                className="remove-holder p-0 m-0 flex-grow-0"
                style={{ height: '24px', width: '24px' }}>
                <ButtonBase
                    style={{ marginLeft: 'auto', borderRadius: 20 + "px", width: 24 + "px", height: 24 + "px" }}
                    className="m-button "
                    onClick={handleRemove}>
                    <FontAwesomeIcon icon="trash-alt" />
                </ButtonBase>
            </Col>
        </Col>
    )
}

export default RemoveButton