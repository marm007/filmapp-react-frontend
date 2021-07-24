import React, { useState, useContext } from 'react';
import { Col, Dropdown, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PlaylistDropdownMenu from './playlistDropdownMenu'
import UserContext from '../../helpers/user/userContext';
import useRipple from "useripple"

import '../playlistsPage/playlist.css'

function PlaylistAddButton(props) {

    const { user } = useContext(UserContext);

    const [addRipple, ripples] = useRipple({ background: "black" })

    const [isOpen, setIsOpen] = useState(false)

    const handlePlaylistClose = () => {
        setIsOpen(false)
    }

    const allClass = "m-button col-sm-2 col-2 p-0"
    const previewClass = "col-sm-2 col-2 p-0"

    return (

        user.auth ?
            <Dropdown show={isOpen}
                onToggle={(isOpen, event, metadata) => {
                    setIsOpen(isOpen)
                }} className={props.isPreview ? previewClass : allClass} >
                <Dropdown.Toggle variant="link" bsPrefix="p-0"
                    className="m-button  m-button-ripple"
                    style={{ color: "black" }}>
                    <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
                        <Col
                            onClick={addRipple}
                            style={{ verticalAlign: 'top', borderRadius: 20 + "px", width: 24 + "px", height: 24 + "px" }}
                            className="playlist-add-icon-holder p-0  m-button-ripple">
                            <FontAwesomeIcon style={{ opacity: (isOpen ? 1 : "") }}
                                className="playlist-add-icon" icon="ellipsis-v" />
                            {ripples}
                        </Col>
                    </div>
                </Dropdown.Toggle>
                {isOpen && <PlaylistDropdownMenu
                    isPreview={props.isPreview}
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
