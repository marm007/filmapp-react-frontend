import React, { useContext, useEffect, useCallback, useReducer } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from "query-string";
import TextTruncate from "react-text-truncate";
import PerfectScrollbar from 'react-perfect-scrollbar'

import { filmPlaylistInitialState, filmPlaylistReducer } from './reducer';

import BlurredImageComponent from '../../blurred-image';

import * as playlistApi from '../../../services/playlistService'

import FilmContext from '../../../contexts/film/filmContext';
import UserContext from '../../../contexts/user/userContext';
import ChangePrivacyButton from '../../buttons/change-privacy';

import image_not_found from '../../../images/image_not_found.png';
import RemovePlaylist from './remove-playlist';
import RemoveFilm from './remove-film';

import 'react-perfect-scrollbar/dist/css/styles.css';

const PlaylistContainer = ({ handleRedirect }) => {

    let location = useLocation()
    let { id } = useParams()


    const { user } = useContext(UserContext)
    const [filmState, filmDispatch] = useContext(FilmContext)

    const [{
        playlist,
        currentFilm,
        currentFilmIndex,
        headerHeight,
        playerHeight,
        error
    }, dispatch] = useReducer(filmPlaylistReducer, filmPlaylistInitialState)


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
            payload: filmState.playerHeight
        });
    }, [filmState.playerHeight])

    useEffect(() => {
        dispatch({
            type: 'error',
            payload: filmState.error
        });
    }, [filmState.error])


    useEffect(() => {
        async function handleReloadPlaylist() {
            await playlistApi.index(playlist.id)
                .then(res => {

                    let filmIndex = 0
                    let filmId = null

                    Array.prototype.forEach.call(res.data.films, (film, index) => {
                        if (film && film.id === id) {
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

        if (filmState.reloadPlaylist && playlist) handleReloadPlaylist()

    }, [filmState.reloadPlaylist, playlist, filmDispatch, id])



    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if (!parsed.list) {
            dispatch({ type: 'clear' })
            return
        }

        async function handleGetPlaylist() {
            await playlistApi.index(parsed.list).then(res => {

                let filmIndex = 0
                let filmId = null

                Array.prototype.forEach.call(res.data.films, (film, index) => {
                    if (film && film.id === id) {
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
                dispatch({ type: 'clear' })
            })
        }
        if (!error && filmState.isPreviewLoaded) handleGetPlaylist()
    }, [id, location.search, error, filmState.isPreviewLoaded])


    return (

        playlist && playerHeight && !error &&
        <div className='col mb-4'>
            <div className='col p-0 border'>
                <div ref={headerRef}
                    style={{ height: headerHeight + 'px' }}
                    className="col remove-container pt-2 pb-2 film-preview-playlist-header" sm={12}>
                    <div className="row m-0 px-2">
                        <div className="button-ripple-div-next-width colbutton-ripple-div-next-width">
                            <p className="mb-1 font-weight-bold film-preview-playlist-text-truncate">{playlist.title}</p>
                        </div>

                        <RemovePlaylist playlist={playlist} dispatch={dispatch} />

                        <div className="col-12 col-sm-12 p-0">
                            {
                                user.id === playlist.author_id &&
                                <ChangePrivacyButton
                                    id={playlist.id}
                                    isPublic={playlist.is_public}
                                    isPlaylist={true}
                                    dispatchPrivacyUpdate={dispatch} />
                            }
                            {
                                user.id === playlist.author_id && <small>&nbsp;</small>

                            }
                            <small>{playlist.author_name}&nbsp;</small>
                            <small
                                className="film-preview-playlist-index">
                                - {currentFilmIndex}/{playlist.films.length}
                            </small>
                        </div>
                    </div>
                </div>
                <div style={{ height: playerHeight - headerHeight + 'px' }}
                    className="col-12 col-sm-12 p-0 film-preview-playlist-container">
                    <PerfectScrollbar
                        onYReachEnd={() => { }}
                        onScrollY={() => { }}>
                        {
                            playlist.films.map((film, index) => {
                                return (
                                    <div className="row m-0 p-0 pr-2 remove-container" key={film.id}>
                                        <div className={`${index === playlist.films.length - 1 ?
                                            "mt-3 mb-3 " :
                                            "mt-3"} button-ripple-div-next-width col`}
                                            onClick={() => {
                                                if (!film.isNonExisting)
                                                    handleRedirect(film)
                                            }}>
                                            <div className="row m-0 p-0 play-outer-container">
                                                <div
                                                    className="col-1 col-sm-1 text-center justify-content-center d-flex align-items-center p-0 pl-1" >
                                                    {
                                                        (currentFilm === film.id) ?
                                                            <small>
                                                                <FontAwesomeIcon style={{ fontWeight: 300 }}
                                                                    icon="play" />
                                                            </small>
                                                            :
                                                            <small>{index + 1}</small>

                                                    }
                                                </div>
                                                <div className="col-6 col-sm-6 pr-2 pl-2">
                                                    <div className="w-100 play-container">
                                                        {
                                                            film.isNonExisting ?
                                                                <img alt="" className="embed-responsive-item play-image"
                                                                    src={image_not_found} />
                                                                :
                                                                <BlurredImageComponent
                                                                    image={`${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail`} />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-5 col-sm-5 p-0">
                                                    {
                                                        film.isNonExisting ?
                                                            <TextTruncate line={2} text="Not found"
                                                                className="mb-0 title font-weight-bold" />
                                                            :
                                                            <>
                                                                <TextTruncate line={1} text={film.title}
                                                                    className="mb-0 title font-weight-bold" />
                                                                <p className="mb-1 author-nick">
                                                                    <span>{film.author_name}</span>
                                                                </p>
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <RemoveFilm playlist={playlist} filmId={film.id} dispatch={dispatch} />

                                    </div>
                                )
                            })
                        }
                    </PerfectScrollbar>
                </div>
            </div>
        </div >


    )
}


export default PlaylistContainer
