import React, { useCallback, useEffect, useContext, useReducer } from 'react';
import { Button, Col, Dropdown, Form, FormControl, Row, Spinner } from "react-bootstrap";

import * as userApi from '../../services/userService'
import * as playlistApi from '../../services/playlistService'

//import '../Playlist/PlaylistComponent.css'
import ToastContext from '../../helpers/toast/toastContext';
import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';
import { playlistDropdownMenuReducer, playlistDropdownMenuInitialState } from './playlistDropdownMenuReducer'
import UserContext from '../../helpers/user/userContext';

function PlaylistDropdownMenu({ filmID, handlePlaylistClose, isPreview, filmDispatch }) {

    const { user } = useContext(UserContext)

    const { createToast } = useContext(ToastContext);
    const [state, dispatch] = useReducer(playlistDropdownMenuReducer, playlistDropdownMenuInitialState);

    const { playlists, title, isLoading, isAllFetched, isCreating, isAdding, playlistToUpgrade, error } = state

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
            await userApi.me({ playlists: true, skip: playlists.length, limit: 10 })
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
                })
        }

        if (isLoading) getMyPlaylists()

    }, [filmID, playlists, isLoading])

    useEffect(() => {

        async function creatPlaylist() {
            const body = { title: title, films_id: [filmID] };

            await playlistApi.create(body)
                .then(res => {
                    createToast(`Created playlist ${title}`)
                    handlePlaylistClose()

                })
                .catch(err => console.error(err))
        }

        if (isCreating) creatPlaylist()

    }, [isCreating, title, createToast, handlePlaylistClose, filmID,])

    useEffect(() => {
        async function addToPlaylist() {

            let body = { films_id: [filmID] };

            body = playlistToUpgrade.contains ? { ...body, is_remove_films: true } :  { ...body, is_remove_films: false } 

            const message = playlistToUpgrade.contains ? `Deleted from playlist ${playlistToUpgrade.title}` : `Added to playlist ${playlistToUpgrade.title}`

            await playlistApi.partialUpdate(playlistToUpgrade.id, body)
                .then(res => {
                    dispatch({
                        type: 'add-success',
                        playlist: playlistToUpgrade
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

    const playlistItems = () => playlists.map((playlist, index) => {
        console.log(filmID)

        return <Col xs={12} sm={12} key={playlist.id + '_random'} >
            <Row className="pl-4 pr-4" >
                <Col xs={12} sm={12} className="p-0 mb-2" >
                    <Form.Check
                        onChange={() => handleAddToPlaylist(playlist)}
                        custom
                        inline
                        checked={playlist.contains}
                        label={playlist.title}
                        type="checkbox"
                        id={playlist.id}
                    />
                </Col>

            </Row>
        </Col>
    })

    return (

        <Dropdown.Menu
            onClick={e => e.stopPropagation()}
            style={{ width: 240 + "px" }}>
            <p className="dropdown-item-my pl-4 pr-4">Save to...</p>
            <Dropdown.Divider />
            <div
                ref={scrollRef}
                style={{
                    maxHeight: 100 + 'px', overflowY: 'scroll', minHeight: 3 + 'rem'
                }}>

                {playlistItems()}

                {
                    !isAllFetched && <div style={{ height: 32 + 'px' }} className="d-flex justify-content-center">
                        {isLoading && <Spinner animation="border" />}
                    </div>
                }
            </div>
            <Dropdown.Divider />
            <p className="dropdown-item-my pl-4 pr-4">Create a new playlist</p>
            <FormControl
                isInvalid={error !== ''}
                onChange={(e) => {
                    dispatch({
                        type: 'field',
                        fieldName: 'title',
                        payload: e.target.value

                    })
                }}
                className="dropdown-item-my w-75 ml-auto mr-auto mb-2 mt-2"
                placeholder="Enter playlist name..."

            />
            <Form.Control.Feedback type="invalid"
                className="dropdown-item-my w-75 ml-auto mr-auto mb-2 mt-2">
                {error}
            </Form.Control.Feedback>
            <Col className="mb-1 text-right justify-content-end">
                <Button onClick={handleCreatePlaylist}>Create</Button>
            </Col>

        </Dropdown.Menu >


    )
}

export default PlaylistDropdownMenu
