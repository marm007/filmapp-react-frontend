import { useContext } from "react";
import RemoveModalContext from "../contexts/removeModal/removeModalContext";
import Modal from "../components/modal";

export default function RemoveModal() {
    const { removeModalData, remove, clear } = useContext(RemoveModalContext)

    const handleRemove = () => remove()

    const handleClose = () => clear();

    return (
        <Modal id="removeModal" title={`Delete ${removeModalData.type}`}
            isRemove={true}
            onClose={handleClose} hide={true}
            footer={
                <button type="button" className="btn btn-primary"
                    onClick={handleRemove}>
                    Delete
                </button>
            }>
            Do you really want to delete {removeModalData.type} <b>{removeModalData.title}</b>?
            <br />
            Action cannot be undone!
        </Modal>
    );
}