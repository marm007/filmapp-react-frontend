import React, { useState, useContext } from 'react';
import { Col, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PlaylistDropdownMenu from './playlistDropdownMenu'
import UserContext from '../../helpers/contexts/user/userContext';
import useRipple from "useripple"

import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import './playlistAdd.css'

function PlaylistAddButton(props) {

    const { user } = useContext(UserContext);

    const [addRipple, ripples] = useRipple({ background: "black" })

    const [isOpen, setIsOpen] = useState(false)

    const handlePlaylistClose = () => {
        setIsOpen(false)
    }

    const allClass = ""
    const previewClass = "col-sm-2 col-2 p-0"

    return (

        user.auth ?
            <Dropdown show={isOpen}
                onToggle={(isOpen, event, metadata) => {
                    setIsOpen(isOpen)
                }} className={props.isRecommendations ? previewClass : allClass} >
                <Dropdown.Toggle variant="link" bsPrefix="p-0"
                    className="m-button button-ripple"
                    style={{ color: "black" }}>
                    <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
                        <Col
                            onClick={addRipple}
                            className="playlist-add-icon-holder p-0 button-ripple button-ripple-24">
                            <FontAwesomeIcon style={{ opacity: (isOpen ? 1 : "") }}
                                className="playlist-add-icon" icon={faEllipsisV} />
                            {ripples}
                        </Col>
                    </div>
                </Dropdown.Toggle>
                {isOpen && <PlaylistDropdownMenu
                    isRecommendations={props.isRecommendations}
                    filmDispatch={props.filmDispatch}
                    isOpen={isOpen}
                    filmID={props.filmID}
                    handlePlaylistClose={handlePlaylistClose} />}
            </Dropdown>
            :
            null

    )
}

export default PlaylistAddButton
