import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import RippleButton from "../../buttons/ripple";

import RemoveModalContext from '../../../contexts/removeModal/removeModalContext';

import { remove } from '../../../services/commentService'

export default function RemoveComment({ id, text, dispatch }) {
    const { showModal, clear, removeModalData } = useContext(RemoveModalContext)

    const [isRemoving, setIsRemoving] = useState(false)

    useEffect(() => {
        async function removeComment() {
            await remove(id)
                .then(res => {
                    setIsRemoving(false)
                    dispatch({ type: 'remove-success', payload: id })
                    clear()
                })
                .catch(err => {
                    setIsRemoving(false)
                    clear()
                    console.error(err)
                })
        }

        if (isRemoving && removeModalData.isRemoving &&
            removeModalData.type === 'comment' && removeModalData.id === id) removeComment()
    }, [isRemoving, clear, removeModalData, id, dispatch])

    const handleRemoveComment = () => {
        if (removeModalData.isRemoving) return

        setIsRemoving(true)
        dispatch({ type: 'remove' })
        showModal(id, 'comment', text.substring(0, 10).concat('...'))
    }

    return (
        <RippleButton className="m-button cursor-pointer button-ripple-24 d-flex justify-content-center align-items-center remove-holder p-0 m-0 ml-auto"
            onClick={handleRemoveComment}>
            <FontAwesomeIcon icon="trash-alt" />

        </RippleButton>
    )
}