import { useHistory } from 'react-router-dom';

import Modal from '../components/modal';
import ResetPasswordComponent from '../components/dialogs/reset-password';

export default function ResetPassword() {

    let history = useHistory()

    const modalClose = () => {
        history.push(`${process.env.REACT_APP_PATH_NAME}`);
    };

    return (

        <Modal id="resetPasswordModal" title="Reset" onClose={modalClose}>
            <ResetPasswordComponent />
        </Modal>


    );
}