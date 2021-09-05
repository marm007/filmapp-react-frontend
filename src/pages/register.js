import { useHistory } from 'react-router-dom';

import Modal from '../components/modal';
import RegisterComponent from '../components/dialogs/register'

import { handleCloseModalWindow } from '../helpers';

export default function Register() {

    let history = useHistory()

    const modalClose = () => {
        handleCloseModalWindow(history, '/register')
    };


    return (

        <Modal id="registerModal" title="Register" onClose={modalClose}>
            <RegisterComponent />
        </Modal>
    );
}