import { useEffect, useRef } from "react"

const Modal = ({ id, title, children, onClose, footer, hide, isRemove }) => {
  const modalRef = useRef(null)
  useEffect(() => {
    modalRef.current = window.$(`#${id}`)

    if (!hide) {
      modalRef.current.modal('show')
    }
    return () => {
      modalRef.current.modal('hide')

    }
  }, [id, hide])

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="modal fade" id={id} tabIndex="-1">
      <div className={`modal-dialog modal-dialog-centered ${isRemove ? '' : 'modal-lg'}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleClose}>Close</button>
            {footer}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Modal