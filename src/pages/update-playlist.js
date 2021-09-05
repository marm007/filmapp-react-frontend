import { useHistory } from 'react-router-dom'
import Modal from '../components/modal'
import UpdatePlaylistComponent from '../components/dialogs/update-playlist'

import { handleCloseModalWindow } from '../helpers'

export default function UpdatePlaylist() {

    let history = useHistory()

    const modalClose = () => {
        handleCloseModalWindow(history, '/update-playlist')
    }

    return (
        <Modal id="updatatePlaylistModal" title="Update" onClose={modalClose}>
            <UpdatePlaylistComponent />
        </Modal>
    )
}