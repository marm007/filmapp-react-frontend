import { ButtonBase } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ChangePrivacyButton = ({ isPublic, handleChangePrivacy }) => {

    return (
        <ButtonBase
            style={{ marginLeft: 'auto', borderRadius: 20 + "px", width: 24 + "px", height: 24 + "px" }}
            className="m-button "
            onClick={handleChangePrivacy}>
            <FontAwesomeIcon icon={isPublic ? "globe-europe" : "lock"} />
        </ButtonBase>
    )
}

export default ChangePrivacyButton