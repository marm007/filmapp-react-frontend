import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PlaylistDropdownMenu from './menu'
import useRipple from "useripple"

import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import './playlistAdd.css'

import $ from 'jquery'

function PlaylistAddButton({ isRecommendations, filmDispatch, filmID }) {

    const menuRef = useRef()

    const [addRipple, ripples] = useRipple({ background: "black" })

    const [isOpen, setIsOpen] = useState(false)

    const handlePlaylistClose = () => {

    }

    const handleOpenMenu = () => {
        console.log('open')
        setIsOpen(true)
    }

    const handleCloseMenu = (e) => {
        console.log('close')
        setIsOpen(false)
    }

    useEffect(() => {
        let ref = menuRef.current

        if (ref) {

            const element = $(`#playlistDropdown${filmID}`)
            console.log('dldaladl')

            element.on('show.bs.dropdown', handleOpenMenu)
            element.on('hide.bs.dropdown', handleCloseMenu)

            return () => {
                element.off('show.bs.dropdown', handleOpenMenu)
                element.off('hide.bs.dropdown', handleCloseMenu)
            }

        }
    }, [menuRef, filmID])

    return (

        <div ref={menuRef}
            id={`playlistDropdown${filmID}`}
            className="p-0 dropdown" style={{ width: '26px', height: '26px' }} >
            <button
                id={`playlistAddButtonLabel${filmID}`}
                style={{ color: "black" }}
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false"
                className="btn btn-link m-button button-ripple dropdown-toggle p-0">
                <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
                    <div onClick={addRipple}
                        className="col playlist-add-icon-holder p-0 button-ripple button-ripple-24">
                        <FontAwesomeIcon style={{ opacity: (isOpen ? 1 : "") }}
                            className="playlist-add-icon" icon={faEllipsisV} />
                        {ripples}
                    </div>
                </div>
            </button>

            <div className="dropdown-menu dropdown-menu-right"
                id={`playlistDropdownMenu${filmID}`}
                aria-labelledby={`playlistAddButtonLabel${filmID}`}
                style={{ width: 240 + "px", left: '50px !important' }}>
                {isOpen && <PlaylistDropdownMenu
                    isRecommendations={isRecommendations}
                    filmDispatch={filmDispatch}
                    filmID={filmID}
                    handlePlaylistClose={handlePlaylistClose} />
                }
            </div>
        </div >
    )
}

export default PlaylistAddButton
