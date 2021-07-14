import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Button, Col, Dropdown, Form, FormControl, Row, ButtonGroup, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as userApi from '../../services/userService'
import * as playlistApi from '../../services/playlistService'

import '../Playlist/PlaylistComponent.css'
import ToastContext from '../../helpers/toastContext';
import useBottomScroll from '../../helpers/useBottomScroll';

function playlistMenuReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                isError: '',
                [action.fieldName]: action.payload
            }
        }
        case 'load': {
            return {
                ...state,
                isLoading: true,
                isAllFetched: false,
            }
        }
        case 'success': {
            return {
                ...state,
                playlists: action.payload,
                isAllFetched: action.count === 0,
                error: '',
                isLoading: false
            }
        }
        case 'error':
            return {
                ...state,
                isLoading: false,
                isAllFetched: false,
                error: 'Bad',
                title: ''
            }
        default:
            return state

    }
}

const initialState = {
    playlists: [],
    isAllFetched: false,
    title: '',
    isLoading: true,
    error: '',
};

function PlaylistDropdownMenu(props) {

    const { createToast } = useContext(ToastContext);
    const [state, dispatch] = useReducer(playlistMenuReducer, initialState);

    const { playlists, title, isLoading, error, isAllFetched} = state

    const scrollRef = useBottomScroll(() => {
        dispatch({
            type: 'load'
        })
    });

    useEffect(() => {
        async function getMyPlaylists() {
            await userApi.me({ playlists: true, skip: playlists.length, limit: 10 })
                .then(res => {

                    let result = res.data.playlists

                    result.forEach(playlist => {
                        playlist.contains = playlist.films.indexOf(props.filmID) > -1
                    });

                    console.log('LOADED...')
                    dispatch({
                        type: 'success',
                        count: result.length,
                        payload: [...playlists, ...result]
                    })
                })
                .catch(err => {
                })
        }

        if (isLoading) getMyPlaylists()

    }, [props.filmID, playlists, isLoading])

    const handleAddToPlaylist = async (event, index, id, title) => {
        console.log('lsalsala')
        let tmp = playlists;
        tmp[index].contains = !tmp[index].contains;

        let body = { films_id: [props.filmID] };

        body = tmp[index].contains ? { ...body, is_remove_films: false } : { ...body, is_remove_films: true }
        console.log(body)
        const message = tmp[index].contains ? `Added to playlist ${title}` : `Deleted from playlist ${title}`
        await playlistApi.partialUpdate(id, body)
            .then(res => {
                console.log(res)
                createToast(message)
                dispatch({
                    type: 'field',
                    fieldName: 'playlists',
                    payload: tmp

                })
            })
            .catch(err => console.error(err))

    };

    const handleCreatePlaylist = async (e) => {
        e.stopPropagation()
        const body = { title: title, films: [props.filmID] };

        await playlistApi.create(body)
            .then(res => {
                console.log(res)
                createToast(`Created playlist ${title}`)
                props.handlePlaylistClose()

            })
            .catch(err => console.error(err))
    };

    const playlistItems = () => playlists.map((playlist, index) => {
        console.log(props.filmID)

        return <Col xs={12} sm={12} key={playlist.id + '_random'} >
            <Row className="pl-4 pr-4" >
                <Col xs={12} sm={12} className="p-0 mb-2" >
                    <Form.Check
                        onChange={(e) => handleAddToPlaylist(e, index, playlist.id, playlist.title)}
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
                    console.log('lxlls')
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
