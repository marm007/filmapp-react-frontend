import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PlaylistDropdownMenu from './menu'
import useRipple from "useripple"

import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import './playlistAdd.css'

function PlaylistAddButton({ isRecommendations, filmDispatch, filmID }) {

    const menuRef = useRef()

    const [addRipple, ripples] = useRipple({ background: "black" })

    const [isOpen, setIsOpen] = useState(false)

    const handleOpenMenu = () => {
        setIsOpen(true)
    }

    const handleCloseMenu = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        let ref = menuRef.current

        if (ref) {

            const element = window.$(`#playlistDropdown${filmID}`)
            console.log('dldaladl')

            element.on('show.bs.dropdown', handleOpenMenu)
            element.on('hide.bs.dropdown', handleCloseMenu)
            window.$(`playlistAddButtonLabel${filmID}`).on('click', (e) => {
                console.log('kfdkdfkdfkdfkfdk')
            })

            return () => {
                element.off('show.bs.dropdown', handleOpenMenu)
                element.off('hide.bs.dropdown', handleCloseMenu)
                window.$(`playlistAddButtonLabel${filmID}`).off('click', (e) => {
                    console.log('kfdkdfkdfkdfkfdk')
                })
            }

        }
    }, [menuRef, filmID])

    return (

        <div ref={menuRef}
            id={`playlistDropdown${filmID}`}
            className="p-0 dropdown dropdown-sizes" >

            <button
                onMouseDown={addRipple}
                id={`playlistAddButtonLabel${filmID}`}
                type="button"
                data-toggle="dropdown"
                className="btn btn-link m-button button-ripple dropdown-toggle p-0 text-dark">
                <div
                    className="col playlist-add-icon-holder p-0 button-ripple button-ripple-24">
                    <FontAwesomeIcon style={{ opacity: (isOpen ? 1 : "") }}
                        className="playlist-add-icon" icon={faEllipsisV} />
                    {ripples}
                </div>
            </button>

            <div className="dropdown-menu dropdown-menu-right"
                id={`playlistDropdownMenu${filmID}`}
                aria-labelledby={`playlistAddButtonLabel${filmID}`}
                style={{ width: 240 + "px", left: '50px !important' }}>
                {isOpen && <PlaylistDropdownMenu
                    isRecommendations={isRecommendations}
                    filmDispatch={filmDispatch}
                    filmID={filmID} />
                }
            </div>
        </div >
    )
}

export default PlaylistAddButton
