import { useEffect, useRef } from "react"
import { Modal as ModalBoostrap } from 'bootstrap'

const Modal = ({ id, title, children, onClose, footer, hide }) => {

    const modal = useRef(null)

    useEffect(() => {
        modal.current = ModalBoostrap.getOrCreateInstance(`#${id}`)
        if (hide) modal.current.hide()
        else modal.current.show()
        return () => {
            modal.current.hide()
        }
    }, [id, hide])

    const handleClose = () => {
        onClose()
        modal.current.hide()
    }

    return (
        <div className="modal fade" id={id} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleClose}>Close</button>
                        {footer}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal