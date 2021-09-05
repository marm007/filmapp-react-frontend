import { useHistory } from "react-router-dom";
import Modal from "../components/modal";
import SettingsComponent from '../components/dialogs/update-user'

import { handleCloseModalWindow } from "../helpers";

export default function Settings() {

    let history = useHistory()

    const modalClose = () => {
        handleCloseModalWindow(history, '/settings')
    }

    return (
        <Modal id="settingsModal" title="Settings" onClose={modalClose}>
            <SettingsComponent />
        </Modal>
    )
}