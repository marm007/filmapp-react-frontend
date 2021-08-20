import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PlaylistDropdownMenu from './menu'
import useRipple from "useripple"

import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'bootstrap'

import './playlistAdd.css'

function PlaylistAddButton({ isRecommendations, filmDispatch, filmID }) {

    const menuRef = useRef()

    const [addRipple, ripples] = useRipple({ background: "black" })

    const [isOpen, setIsOpen] = useState(false)

    const [dropdownMenu, setDropdownMenu] = useState(null)

    const handlePlaylistClose = () => {
        setIsOpen(false)
        dropdownMenu.hide()
    }

    const handleOpenMenu = () => {
        console.log('open')
        setIsOpen(true)

    }

    const handleCloseMenu = () => {
        console.log('close')
        setIsOpen(false)
    }

    useEffect(() => {
        const ref = menuRef.current;

        if (ref) {

            ref.addEventListener('show.bs.dropdown', handleOpenMenu)
            ref.addEventListener('hide.bs.dropdown', handleCloseMenu)

            setDropdownMenu(new Dropdown(`#playlist-dropdown-${filmID}`))

            return () => {
                ref.removeEventListener('show.bs.dropdown', handleOpenMenu)
                ref.removeEventListener('hide.bs.dropdown', handleCloseMenu)
            }
        }

    }, [filmID, menuRef])

    return (

            <div ref={menuRef}

                className="p-0 dropdown" style={{ width: '26px' }} >
                <button onClick={() => {
                    if (dropdownMenu) {
                        if (isOpen) dropdownMenu.show()
                        else dropdownMenu.hide()
                    }
                }}
                    className="btn btn-link m-button button-ripple dropdown-toggle p-0"
                    type="button" id={`playlist-dropdown-${filmID}`}
                    data-bs-toggle="dropdown" aria-expanded="false"
                    style={{ color: "black" }}>
                    <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
                        <div onClick={addRipple}
                            className="col playlist-add-icon-holder p-0 button-ripple button-ripple-24">
                            <FontAwesomeIcon style={{ opacity: (isOpen ? 1 : "") }}
                                className="playlist-add-icon" icon={faEllipsisV} />
                            {ripples}
                        </div>
                    </div>
                </button>
                <div className="dropdown-menu" aria-labelledby={`playlist-dropdown-${filmID}`}>
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
