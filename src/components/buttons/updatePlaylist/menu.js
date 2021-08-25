import React, { useCallback, useEffect, useContext, useReducer, useRef } from 'react';

import * as userApi from '../../../services/userService'
import * as playlistApi from '../../../services/playlistService'

import ToastContext from '../../../helpers/contexts/toast/toastContext';
import useBottomScrollListener from '../../../helpers/hooks/useBottomScrollListener';
import { playlistDropdownMenuReducer, playlistDropdownMenuInitialState } from './reducer'
import ChangePrivacyButton from '../changePrivacy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { playlistButtonMaxFetchCount } from '../../../config';
import RippleButton from '../ripple';

function PlaylistDropdownMenu({ filmID, isRecommendations, filmDispatch }) {

    const { createToast } = useContext(ToastContext);

    const titleInputRef = useRef()

    const [state, dispatch] = useReducer(playlistDropdownMenuReducer, playlistDropdownMenuInitialState);

    const { playlists, title, isPublic, isLoading, isAllFetched, isCreating, isAdding, playlistToUpgrade, error } = state


    const handleOnPlaylistDropdownMenuBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && !isCreating && !isAdding) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched, isCreating, isAdding])

    const scrollRef = useBottomScrollListener(handleOnPlaylistDropdownMenuBottom);

    useEffect(() => {
        async function getMyPlaylists() {
            await userApi.me({ playlists: true, skip: playlists.length, limit: playlistButtonMaxFetchCount })
                .then(res => {

                    let result = res.data.playlists

                    result.forEach(playlist => {
                        playlist.contains = playlist.films.indexOf(filmID) > -1
                    });

                    dispatch({
                        type: 'load-success',
                        payload: result
                    })
                })
                .catch(err => {
                    console.error(err)
                })
        }

        if (isLoading) getMyPlaylists()

    }, [filmID, playlists, isLoading])

    useEffect(() => {
        const handlePlaylistClose = () => {
            document.getElementById(`closePlaylistMenuButton${filmID}`).click()
        }

        async function creatPlaylist() {
            const body = { title: title, is_public: isPublic, films_id: [filmID] };

            await playlistApi.create(body)
                .then(res => {
                    dispatch({
                        type: 'create-success'
                    })
                    createToast(`Created playlist ${title}`)
                    handlePlaylistClose()
                })
                .catch(err => {
                    console.error(err)
                    let errorMessage = null

                    if (err.response && err.response.data && err.response.data.error) {
                        errorMessage = err.response.data.error
                    } else if (err.response && err.response.data && err.response.data.errors) {
                        errorMessage = err.response.data.errors[0]
                    }
                    titleInputRef.current.classList.add('is-invalid')
                    dispatch({
                        type: 'error',
                        payload: errorMessage === "Path `title` is required." ? 'Playlist title is required' : errorMessage
                    })
                })
        }

        if (isCreating) creatPlaylist()

    }, [isCreating, title, isPublic, createToast, filmID])

    useEffect(() => {
        async function addToPlaylist() {

            let body = { films_id: [filmID] };

            body = playlistToUpgrade.contains ? { ...body, is_remove_films: true } : { ...body, is_remove_films: false }

            const message = playlistToUpgrade.contains ? `Deleted from playlist ${playlistToUpgrade.title}` : `Added to playlist ${playlistToUpgrade.title}`

            dispatch({
                type: 'add-update-playlist',
                playlist: playlistToUpgrade
            })

            await playlistApi.partialUpdate(playlistToUpgrade.id, body)
                .then(res => {
                    dispatch({
                        type: 'add-success'
                    })

                    if (isRecommendations) {
                        filmDispatch({
                            type: 'field',
                            fieldName: 'reloadPlaylist',
                            payload: true
                        })
                    }
                    createToast(message)
                })
                .catch(err => console.error(err))
        }
        if (isAdding && playlistToUpgrade) addToPlaylist()
    }, [isAdding, playlistToUpgrade, createToast, filmDispatch, filmID, isRecommendations])

    const handleAddToPlaylist = (playlist) => {
        dispatch({
            type: 'add',
            payload: playlist
        })
    };

    const handleChange = (fieldName, payload) => {
        titleInputRef.current.classList.remove('is-invalid')
        dispatch({
            type: 'field',
            fieldName: fieldName,
            payload: payload
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()

        dispatch({
            type: 'create'
        })
    };

    return (

        <>
            <div className="row m-0 m-button button-ripple" >
                <div className="col playlist-add-exit-text-width px-3">Save to...</div>
                <RippleButton id={`closePlaylistMenuButton${filmID}`} className="button-ripple-24 playlist-add-icon-holder p-0 d-flex align-items-center text-center justify-content-center"
                    onClick={() => { }}>
                    <FontAwesomeIcon icon="times" />
                </RippleButton>
            </div>
            <hr className="dropdown-divider" />
            <div ref={scrollRef}
                style={{
                    maxHeight: 100 + 'px', overflowY: 'scroll', minHeight: 3 + 'rem'
                }}>
                {
                    playlists.map((playlist, index) => {
                        return (<div className="row m-0 playlist-form-group form-group mb-1" key={playlist.id} >
                            <div className="col-10 col-sm-10 p-0">
                                <div id={playlist.id} className="form-check">
                                    <input type="checkbox"
                                        id={`formCheckAddToPlaylist${playlist.id}`}
                                        className="form-check-input"
                                        onChange={() => handleAddToPlaylist(playlist)}
                                        checked={playlist.contains} />
                                    <label className="form-check-label w-100"
                                        htmlFor={`formCheckAddToPlaylist${playlist.id}`}>
                                        <p className="playlist-check-label" onClick={e => e.stopPropagation()}>
                                            {playlist.title}
                                        </p>
                                    </label>
                                </div>

                            </div>
                            <ChangePrivacyButton
                                id={playlist.id}
                                isPublic={playlist.is_public}
                                isPlaylist={true}
                                filmDispatch={filmDispatch}
                                dispatchPrivacyUpdate={dispatch} />

                        </div>)
                    })
                }

                {
                    !isAllFetched && <div style={{
                        height: 3 + 'rem'
                    }}
                        className="fetch-spinner d-flex justify-content-center align-items-center">
                        {isLoading && <div className="spinner-border" />}
                    </div>
                }
            </div>
            <hr className="dropdown-divider" />
            <div className="row m-0 px-3">
                <span className="m-0">Create a new playlist</span>
            </div>
            <div className="row m-0 px-3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2 mt-2" >
                        <input type="text" className="form-control" aria-label="playlistNameInput"
                            placeholder="Enter playlist title..." ref={titleInputRef}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                        <div className="invalid-feedback">
                            {error}
                        </div>
                    </div>
                    <div className="form-group mb-2 mt-2">
                        <select className="form-control"
                            onChange={(e) => handleChange('isPublic', e.target.value === 'public')}>
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                    </div>

                    <div className="d-flex align-items-center mt-2">
                        <button type="submit" className="btn btn-primary" disabled={isCreating}>
                            Create
                        </button>

                        {
                            isCreating &&
                            <div className="spinner-grow ml-2" />
                        }
                    </div>

                </form>

            </div>

        </>


    )
}

export default PlaylistDropdownMenu
