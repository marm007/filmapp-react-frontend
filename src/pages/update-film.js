import { useHistory } from 'react-router-dom'
import Modal from '../components/modal'
import UpdateFilmComponent from '../components/dialogs/update-film'

import { handleCloseModalWindow } from '../helpers'

export default function UpdateFilm() {

    let history = useHistory()

    const modalClose = () => {
        handleCloseModalWindow(history, '/update-film')
    }



    return (
        <Modal id="updatateFilmModal" title="Update" onClose={modalClose}>
            <UpdateFilmComponent />
        </Modal>
    )
}
