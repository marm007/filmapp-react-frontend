import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import RippleButton from '../../helpers/components/rippleButton'

const RemoveButton = ({ handleRemove }) => {
    return (
        <RippleButton
            className="button-ripple-24 remove-holder p-0"
            onClick={handleRemove}>
            <FontAwesomeIcon icon="trash-alt" />
        </RippleButton>
    )
}

export default RemoveButton