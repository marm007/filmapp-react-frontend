import React, { useContext, useEffect, useCallback, useReducer } from 'react';
import { useLocation } from 'react-router-dom'
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from "query-string";

import TextTruncate from "react-text-truncate";
import image_not_found from '../../images/image_not_found.png'; // Tell Webpack this JS file uses this image

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

import '../playlistsPage/playlist.css';

import * as playlistApi from '../../services/playlistService'
import FilmDispatch from '../../helpers/film/filmContext';

import { filmPlaylistInitialState, filmPlaylistReducer } from './reducers/playlistReducer';

import UserContext from '../../helpers/user/userContext';
import RemoveButton from '../../helpers/components/removeButton';

function Playlist(props) {

    let location = useLocation()

    const { user } = useContext(UserContext)
    const filmDispatch = useContext(FilmDispatch)

    const [state, dispatch] = useReducer(filmPlaylistReducer, filmPlaylistInitialState)

    const { playlist, isLoading, currentFilm, currentFilmIndex, headerHeight, playerHeight } = state

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
        dispatch({
            type: 'field',
            fieldName: 'playerHeight',
            payload: props.playerHeight
        });
    }, [props.playerHeight])


    useEffect(() => {
        async function handleReloadPlaylist() {
            await playlistApi.index(playlist.id)
                .then(res => {

                    let filmIndex = 0
                    let filmId = null

                    Array.prototype.forEach.call(res.data.films, (film, index) => {
                        if (film && film.id === props.match.params.id) {
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

    }, [props.reloadPlaylist, playlist, filmDispatch, props.match.params.id])



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
                    if (film && film.id === props.match.params.id) {
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
            }).catch(err => {
                console.error(err)
                clearPlaylist()
            })
        }
        handleGetPlaylist()
    }, [props.match.params.id, location.search])



    const handleRemovePlaylist = async () => {

        await playlistApi.remove(playlist.id)
            .then(res => {
                clearPlaylist()
            })
            .catch(err => {
                console.error(err)
            })
    }

    const handleRemoveFromPlaylist = async (id) => {

        await playlistApi.partialUpdate(playlist.id, { films_id: [id], is_remove_films: true })
            .then(res => {
                dispatch({
                    type: 'remove-film',
                    payload: id
                })
            })
            .catch(err => {
                console.error(err)
            })
    }


    return (

        playlist && playerHeight &&
        <Col className='mb-4'>
            <Col ref={headerRef}
                style={{ height: headerHeight + 'px' }}
                className="playlist-remove-container pt-2 pb-2 playlist-header" sm={12}>
                <Row className="m-0 p-0 px-2">
                    <Col className="m-0 p-0" xs={10} sm={10}>
                        <p className="mb-1">{playlist.title}</p>
                        <small>{playlist.author_name}</small>
                        <small
                            className="playlist-index">- {currentFilmIndex}/{playlist.films.length}</small>
                    </Col>
                    {
                        user.id === playlist.author_id &&
                        <RemoveButton handleRemove={() => handleRemovePlaylist()} />
                    }
                </Row>
            </Col>
            <Col style={{ height: playerHeight - headerHeight + 'px' }}
                className="p-0 playlist-container" xs={12} sm={12}>
                <PerfectScrollbar
                    onYReachEnd={() => { }}
                    onScrollY={() => { }}>
                    {
                        playlist.films.map((film, index) => {
                            return film && !film.isNonExisting ? (
                                <Row xs={12} sm={12} className="m-0 p-0 playlist-remove-container" key={film.id}>
                                    <Col xs={9} sm={9}
                                        className={index === playlist.films.length - 1 ?
                                            "mt-3 mb-3 " :
                                            "mt-3"}
                                        onClick={() => props.handleRedirect(film.id)} >
                                        <Row className="m-0 p-0 film-play-outer-container">
                                            <Col xs={1} sm={1}
                                                className="text-center justify-content-center d-flex align-items-center p-0 pl-1" >
                                                {
                                                    (currentFilm === film.id) ?
                                                        <small>
                                                            <FontAwesomeIcon style={{ fontWeight: 300 }}
                                                                icon="play" />
                                                        </small>
                                                        :
                                                        <small>{index + 1}</small>

                                                }
                                            </Col>
                                            <Col xs={6} sm={6} className="pr-2 pl-2"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                <div className="embed-responsive embed-responsive-16by9 z-depth-1-half film-play-container">
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
                                        user.id === playlist.author_id &&
                                        <RemoveButton handleRemove={() => handleRemoveFromPlaylist(film.id)} />
                                    }

                                </Row>
                            ) : (
                                <Row xs={12} sm={12} className="m-0 p-0 playlist-remove-container" key={film.id}>
                                    <Col xs={9} sm={9}
                                        className={index === playlist.films.length - 1 ?
                                            "mt-3 mb-3 " :
                                            "mt-3"} >
                                        <Row className="m-0 p-0">
                                            <Col xs={1} sm={1}
                                                className="text-center justify-content-center d-flex align-items-center p-0 pl-1" >
                                                <small>{index + 1}</small>
                                            </Col>
                                            <Col xs={6} sm={6} className="pr-2 pl-2"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                <div className="embed-responsive embed-responsive-16by9 z-depth-1-half film-play-container">
                                                    <img alt="" className="embed-responsive-item film-play-image"
                                                        src={image_not_found} />
                                                </div>
                                            </Col>
                                            <Col xs={5} sm={5} className="p-0">
                                                <TextTruncate line={2} text="Not found"
                                                    className="mb-0 title font-weight-bold" />
                                            </Col>
                                        </Row>
                                    </Col>
                                    {
                                        user.id === playlist.author_id &&
                                        <RemoveButton handleRemove={() => handleRemoveFromPlaylist(film.id)} />
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
