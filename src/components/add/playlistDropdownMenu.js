import React, { useCallback, useEffect, useContext, useReducer } from 'react';
import { Button, Col, Dropdown, Form, FormCheck, FormControl, Row, Spinner } from "react-bootstrap";

import * as userApi from '../../services/userService'
import * as playlistApi from '../../services/playlistService'

import ToastContext from '../../helpers/contexts/toast/toastContext';
import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';
import { playlistDropdownMenuReducer, playlistDropdownMenuInitialState } from './reducers/playlistDropdownMenuReducer'
import ChangePrivacyButton from '../../helpers/components/changePrivacyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { playlistButtonMaxFetchCount } from '../../config';
import RippleButton from '../../helpers/components/rippleButton';

function PlaylistDropdownMenu({ filmID, handlePlaylistClose, isPreview, filmDispatch }) {


    const { createToast } = useContext(ToastContext);
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

                    dispatch({
                        type: 'error',
                        payload: errorMessage === "Path `title` is required." ? 'Playlist title is required' : errorMessage
                    })
                })
        }

        if (isCreating) creatPlaylist()

    }, [isCreating, title, isPublic, createToast, handlePlaylistClose, filmID,])

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

                    if (isPreview) {
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
    }, [isAdding, playlistToUpgrade, createToast, filmDispatch, filmID, isPreview])

    const handleAddToPlaylist = (playlist) => {
        dispatch({
            type: 'add',
            payload: playlist
        })
    };

    const handleCreatePlaylist = (e) => {
        e.stopPropagation()
        dispatch({
            type: 'create'
        })
    };

    return (

        <Dropdown.Menu
            onClick={e => e.stopPropagation()}
            style={{ width: 240 + "px", left: '50px !important' }}>
            <Row className="m-0 m-button button-ripple" >
                <Col className="playlist-add-exit-text-width">Save to...</Col>
                <RippleButton className="button-ripple-24 playlist-add-icon-holder p-0 d-flex align-items-center text-center justify-content-center"
                    onClick={() => setTimeout(handlePlaylistClose, 150)}>
                    <FontAwesomeIcon icon="times" />
                </RippleButton>
            </Row>
            <Dropdown.Divider />
            <div
                ref={scrollRef}
                style={{
                    maxHeight: 100 + 'px', overflowY: 'scroll', minHeight: 3 + 'rem'
                }}>

                {
                    playlists.map((playlist, index) => {
                        return (<Row className="m-0 playlist-form-group" key={playlist.id} >
                            <Col xs={10} sm={10} className="p-0">
                                <Form.Check id={playlist.id} className="form-check">
                                    <FormCheck.Input type="checkbox"
                                        onChange={() => handleAddToPlaylist(playlist)}
                                        checked={playlist.contains} />
                                    <FormCheck.Label>
                                        <p className="playlist-check-label">
                                            {playlist.title}
                                        </p>
                                    </FormCheck.Label>
                                </Form.Check>

                            </Col>
                            <ChangePrivacyButton
                                id={playlist.id}
                                isPublic={playlist.is_public}
                                isProfile={false}
                                filmDispatch={filmDispatch}
                                dispatchPrivacyUpdate={dispatch} />

                        </Row>)
                    })
                }

                {
                    !isAllFetched && <div style={{
                        height: 3 + 'rem'
                    }}
                        className="fetch-spinner d-flex justify-content-center align-items-center">
                        {isLoading && <Spinner animation="border" />}
                    </div>
                }
            </div>
            <Dropdown.Divider />
            <Dropdown.ItemText>Create a new playlist</Dropdown.ItemText>
            <Row className="m-0 p-0">
                <Form>
                    <FormControl
                        isInvalid={error !== ''}
                        onChange={(e) => dispatch({ type: 'field', fieldName: 'title', payload: e.target.value })}
                        className="mb-2 mt-2"
                        placeholder="Enter playlist title..." />

                    <FormControl.Feedback type="invalid"
                        className="mb-2 mt-2">
                        {error}
                    </FormControl.Feedback>
                    <Form.Select aria-label="Privacy" className="mb-2 mt-2"
                        onChange={(e) => dispatch({ type: 'field', fieldName: 'isPublic', payload: e.target.value === 'public' })}>
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </Form.Select>

                    <Form.Group className="d-flex align-items-center mt-2">
                        <Button disabled={isCreating}
                            onClick={isCreating ? null : handleCreatePlaylist}>Create</Button>

                        {
                            isCreating &&
                            <Spinner className="ms-2" animation="grow" />
                        }
                    </Form.Group>

                </Form>

            </Row>

        </Dropdown.Menu >


    )
}

export default PlaylistDropdownMenu
