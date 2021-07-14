import React, { useState, useContext } from 'react';
import { Col, Dropdown, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as userApi from '../../services/userService'
import * as playlistApi from '../../services/playlistService'

import PlaylistDropdownMenu from './add-playlist-menu'
import UserContext from '../../helpers/userContext';
import useRipple from "useripple"

import '../Playlist/PlaylistComponent.css'

function PlaylistAddButton(props) {

    const { user } = useContext(UserContext);

    const [addRipple, ripples] = useRipple({ background: "black" })

    const [isOpen, setIsOpen] = useState(false)

    const handlePlaylistClose = () => {
        setIsOpen(false)
    }

    return (

        user.auth ?
            <Dropdown show={isOpen}
                onToggle={(isOpen, event, metadata) => {
                    setIsOpen(isOpen)
                }} className="m-button">
                <Dropdown.Toggle variant="link" bsPrefix="p-0"
                    className="m-button  m-button-ripple"
                    style={{ width: 24 + "px", height: 24 + "px", color: "black" }}>
                    <Col
                        onClick={addRipple}
                        style={{ borderRadius: 20 + "px", width: 24 + "px", height: 24 + "px" }}
                        className="playlist-add-icon-holder p-0  m-button-ripple">
                        <FontAwesomeIcon style={{ opacity: (isOpen ? 1 : "") }}
                            className="playlist-add-icon" icon="ellipsis-v" />
                        {ripples}
                    </Col>
                </Dropdown.Toggle>
                {isOpen && <PlaylistDropdownMenu
                    isOpen={isOpen}
                    filmID={props.filmID}
                    handlePlaylistClose={handlePlaylistClose} />}
            </Dropdown>
            :
            null

    )
}

export default PlaylistAddButton
