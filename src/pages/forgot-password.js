import { useHistory } from 'react-router-dom';

import Modal from '../components/modal';
import ForgotPasswordComponent from '../components/dialogs/forgot-password';
import { handleCloseModalWindow } from '../helpers';

export default function ForgotPassword() {

    let history = useHistory()

    const modalClose = () => {
        handleCloseModalWindow(history, '/forgot')
    };


    return (

        <Modal id="forgotPasswordModal" title="Forgot" onClose={modalClose}>
            <ForgotPasswordComponent />
        </Modal>


    );
}