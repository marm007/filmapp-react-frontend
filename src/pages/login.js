import { useHistory } from 'react-router-dom'

import Modal from '../components/modal';
import LoginComponent from '../components/dialogs/login';

import { handleCloseModalWindow } from '../helpers';

export default function Login() {


    let history = useHistory()

    const modalClose = () => {
        handleCloseModalWindow(history, '/login')
    };

    return (
        <Modal id="loginModal" title="Login" onClose={modalClose}>
            <LoginComponent />
        </Modal>
    );
}