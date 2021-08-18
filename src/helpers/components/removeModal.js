import { useContext } from "react";
import RemoveModalContext from "../contexts/removeModal/removeModalContext";

const RemoveModal = () => {
    const { removeModalData, remove, clear } = useContext(RemoveModalContext)

    const handleRemove = () => remove()

    const handleClose = () => clear();

    return (
        <div className="modal show" id="removeModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete {removeModalData.type}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">Do you really want to delete {removeModalData.type} <b>{removeModalData.title}</b>?
                        <br />
                        Action cannot be undone!
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                            onClick={handleClose}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary"
                            onClick={handleRemove}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RemoveModal