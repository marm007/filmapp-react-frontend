import { Col } from "react-bootstrap"
import { ButtonBase } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const RemoveButton = (props) => {
    const { handleRemove } = props
    return (
        <Col xs={2} sm={2}
            className="text-center justify-content-center d-flex align-items-center p-0">
            <Col
                className="playlist-remove-holder p-0 m-0"
                style={{ height: 24 + 'px', width: 24 + "px" }}>
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