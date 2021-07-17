import React, { useContext, useEffect, useCallback, useReducer } from 'react';
import { useLocation } from 'react-router-dom'
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from "query-string";

import TextTruncate from "react-text-truncate";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

import '../playlistsPage/playlist.css';

import * as playlistApi from '../../services/playlistService'
import * as userApi from '../../services/userService'
import FilmDispatch from './filmDispatch';

const filmPlaylistReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'success': {
            return {
                ...state,
                isLoading: false,
                playlist: action.playlist,
                currentFilm: action.currentFilm,
                currentFilmIndex: action.currentFilmIndex
            }
        }
        case 'clear': {
            return { ...filmPlaylistInitialState }
        }
        case 'remove-film': {
            console.log(state.playlist)
            return {
                ...state,
                currentFilm: action.payload === state.currentFilm ? null : state.currentFilm,
                currentFilmIndex: action.payload === state.currentFilm ? 0 : state.currentFilmIndex - 1,
                playlist: {
                    ...state.playlist,
                    films: state.playlist.films.filter(film => film.id !== action.payload)
                }

            }
        }
        default:
            return state
    }
}

const filmPlaylistInitialState = {
    isLoading: true,
    playlist: null,
    currentFilm: null,
    currentFilmIndex: 0,
    isOwner: false,
    headerHeight: null,
    playerHeight: null
}

function Playlist(props) {

    let location = useLocation()

    const filmDispatch = useContext(FilmDispatch)

    const [state, dispatch] = useReducer(filmPlaylistReducer, filmPlaylistInitialState)
    
    const clearPlaylist = () => {
        dispatch({ type: 'clear' })
    }
    
    const headerRef = useCallback(node => {
        if (node !== null) {
            dispatch({
                type: 'field',
                fieldName: 'headerHeight',
                payload: node.getBoundingClientRect().height
            });
        }
    }, [])

    useEffect(() => {
        async function handleReloadPlaylist() {
            await playlistApi.index(state.playlist.id)
                .then(res => {

                    let filmIndex = 0
                    let filmId = null

                    Array.prototype.forEach.call(res.data.films, (film, index) => {
                        if (film.id === props.match.params.id) {
                            filmIndex = index + 1
                            filmId = film.id
                        }
                    })

                    dispatch({
                        type: 'success',
                        playlist: res.data,
                        currentFilm: filmId,
                        currentFilmIndex: filmIndex
                    })

                    filmDispatch({
                        type: 'field',
                        fieldName: 'reloadPlaylist',
                        payload: false
                    })

                    return res.data
                })
                .catch(err => {
                    console.error(err)
                })
        }

        if (props.reloadPlaylist) handleReloadPlaylist()

    }, [props.reloadPlaylist, state.playlist, filmDispatch, props.match.params.id])

    useEffect(() => {
        dispatch({
            type: 'field',
            fieldName: 'playerHeight',
            payload: props.playerHeight
        });
    }, [props.playerHeight])

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if (!parsed.list) {
            clearPlaylist()
            return
        }

        async function handleGetPlaylist() {
            await playlistApi.index(parsed.list).then(res => {

                let filmIndex = 0
                let filmId = null

                Array.prototype.forEach.call(res.data.films, (film, index) => {
                    if (film.id === props.match.params.id) {
                        filmIndex = index + 1
                        filmId = film.id
                    }
                })

                dispatch({
                    type: 'success',
                    playlist: res.data,
                    currentFilm: filmId,
                    currentFilmIndex: filmIndex
                })
                return res.data
            })
                .then(async playlist => {
                    await userApi.me().then(res => {
                        dispatch({
                            type: 'field',
                            fieldName: 'isOwner',
                            payload: res.data.id === playlist.author_id
                        })
                    })
                }).catch(err => {
                    clearPlaylist()
                })
        }
        handleGetPlaylist()
    }, [props.match.params.id, location.search])

   

    const handleRemovePlaylist = async () => {

        await playlistApi.remove(state.playlist.id)
            .then(res => {
                clearPlaylist()
                console.log('success', res)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const handleRemoveFromPlaylist = async (id) => {

        await playlistApi.partialUpdate(state.playlist.id, { films_id: [id], is_remove_films: true })
            .then(res => {
                console.log(state.playlist.films)
                dispatch({
                    type: 'remove-film',
                    payload: id
                })
                console.log('success partial', res)
            })
            .catch(err => {
                console.error(err)
            })
    }


    return (

        state.playlist && state.playerHeight &&
        <Col className='mb-4'>
            <Col ref={headerRef}
                style={{ height: state.headerHeight + 'px' }}
                className="playlist-remove-container pt-2 pb-2 playlist-header" sm={12}>
                <Row className="m-0 p-0 px-2">
                    <Col className="m-0 p-0" xs={10} sm={10}>
                        <p className="mb-1">{state.playlist.title}</p>
                        <small>{state.playlist.author_name}</small>
                        <small
                            className="playlist-index">- {state.currentFilmIndex}/{state.playlist.films.length}</small>
                    </Col>
                    {
                        state.isOwner &&
                        <Col
                            style={{ height: 24 + 'px', width: 24 + "px" }}
                            xs={2} sm={2} className={
                                "playlist-remove-holder m-0 p-0 text-center justify-content-center d-flex align-items-center center-vertically my-center-vertically"}
                            onClick={() => handleRemovePlaylist()}>
                            <ButtonBase
                                style={{ borderRadius: 20 + "px", width: 24 + "px", height: 24 + "px" }}
                                className="m-button" >
                                {
                                    <FontAwesomeIcon icon="trash-alt" />
                                }
                            </ButtonBase>
                        </Col>
                    }
                </Row>
            </Col>
            <Col style={{ height: state.playerHeight - state.headerHeight + 'px' }}
                className="p-0 playlist-container" xs={12} sm={12}>
                <PerfectScrollbar
                    onYReachEnd={() => { }}
                    onScrollY={() => { }}>
                    {
                        state.playlist.films.map((film, index) => {
                            return (
                                <Row xs={12} sm={12} className="m-0 p-0 playlist-remove-container" key={film.id}>
                                    <Col xs={9} sm={9}
                                        className={index === state.playlist.films.length - 1 ?
                                            "mt-3 mb-3 " :
                                            "mt-3"}
                                        onClick={() => props.handleRedirect(film.id)}
                                    >
                                        <Row className="m-0 p-0 film-play-outer-container">
                                            <Col
                                                className="text-center justify-content-center d-flex align-items-center p-0 pl-1"
                                                xs={1} sm={1}>
                                                {
                                                    (state.currentFilm === film.id) ?
                                                        <small><FontAwesomeIcon style={{ fontWeight: 300 }}
                                                            icon="play" /></small>
                                                        :
                                                        <small>{index + 1}</small>

                                                }
                                            </Col>
                                            <Col className="pr-2 pl-2" xs={6} sm={6} style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <div
                                                    className="embed-responsive embed-responsive-16by9 z-depth-1-half film-play-container">
                                                    <img alt="" className="embed-responsive-item film-play-image"
                                                        src={`${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`} />
                                                    <FontAwesomeIcon className="film-play-middle" icon="play" />
                                                </div>
                                            </Col>
                                            <Col xs={5} sm={5} className="p-0">
                                                <TextTruncate line={2} text={film.title}
                                                    className="mb-0 title font-weight-bold" />
                                                <p className="mb-1 author-nick">
                                                    <small>{film.author_name}</small>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {
                                        state.isOwner &&
                                        <Col xs={2} sm={2}
                                            className={index === state.playlist.films.length - 1 ?
                                                "mt-3 mb-3 text-center justify-content-center d-flex align-items-center p-0" :
                                                "mt-3 text-center justify-content-center d-flex align-items-center p-0"}>
                                            <Col
                                                className="playlist-remove-holder p-0 m-0"
                                                style={{ height: 24 + 'px', width: 24 + "px" }}>
                                                <ButtonBase
                                                    style={{ borderRadius: 20 + "px", width: 24 + "px", height: 24 + "px" }}
                                                    className="m-button "
                                                    onClick={() => handleRemoveFromPlaylist(film.id)}>
                                                    {
                                                        <FontAwesomeIcon icon="trash-alt" />
                                                    }
                                                </ButtonBase>
                                            </Col>
                                        </Col>
                                    }

                                </Row>
                            )
                        })
                    }
                </PerfectScrollbar>

            </Col>

        </Col >


    )
}


export default Playlist
