import { useContext, useEffect, useState } from "react"
import RemoveModalContext from "../../../contexts/removeModal/removeModalContext"
import UserContext from "../../../contexts/user/userContext"
import RemoveButton from "../../buttons/remove"

import { remove } from "../../../services/playlistService"

export default function RemovePlaylist({ playlist, dispatch }) {

    const { showModal, clear, removeModalData } = useContext(RemoveModalContext)
    const { user } = useContext(UserContext)

    const [isRemoving, setIsRemoving] = useState(false)


    useEffect(() => {

        async function removePlaylist() {
            setIsRemoving(true)

            await remove(playlist.id)
                .then(res => {
                    setIsRemoving(false)

                    dispatch({ type: 'clear' })
                    clear()
                })
                .catch(err => {
                    setIsRemoving(false)
                    console.error(err)
                    clear()
                })
        }
        if (isRemoving && removeModalData.isRemoving &&
            removeModalData.id === playlist.id && removeModalData.type === 'playlist') removePlaylist()
    }, [isRemoving, clear, dispatch, playlist, removeModalData])



    const handleRemovePlaylist = () => {
        if (removeModalData.isRemoving) return
        setIsRemoving(true)
        showModal(playlist.id, 'playlist', playlist.title)
    }

    return (
        <div style={{ width: '24px' }} className="p-0 justify-content-end d-flex">
            {
                user.id === playlist.author_id &&
                <RemoveButton handleRemove={() => handleRemovePlaylist()} />
            }
        </div>
    )
}