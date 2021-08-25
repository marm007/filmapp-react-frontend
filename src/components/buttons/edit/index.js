import React from 'react'
import { useHistory } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import RippleButton from "../ripple"

const EditButton = ({ isPlaylist, id }) => {
    let history = useHistory()

    const handleEditClick = (e) => {
        e.stopPropagation()
        if (isPlaylist) {
            history.push(`profile/update-playlist/${id}`)
        } else {
            history.push(`profile/update-film/${id}`)
        }
    }

    return (
        <RippleButton className="button-ripple-24 remove-holder p-0"
            onClick={handleEditClick}>
            <FontAwesomeIcon icon="edit" />
        </RippleButton>
    )
}

export default EditButton