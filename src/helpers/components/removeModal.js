import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import RemoveModalContext from "../contexts/removeModal/removeModalContext";

const RemoveModal = (props) => {
    const { removeModalData, remove, clear } = useContext(RemoveModalContext)

    const handleRemove = () => remove()

    const handleClose = () => clear();

    return (
        <>
            <Modal show={removeModalData.show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Delete {removeModalData.type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete {removeModalData.type} <b>{removeModalData.title}</b>?
                    <br />
                    Action cannot be undone!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleRemove}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemoveModal