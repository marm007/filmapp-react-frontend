import { useContext, useEffect, useCallback, useReducer } from 'react';
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from "query-string";
import TextTruncate from "react-text-truncate";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

import { filmPlaylistInitialState, filmPlaylistReducer } from './reducers/playlistReducer';

import BlurredImageComponent from '../../blurredImage';

import * as playlistApi from '../../../services/playlistService'

import FilmContext from '../../../helpers/contexts/film/filmContext';
import UserContext from '../../../helpers/contexts/user/userContext';
import RemoveModalContext from '../../../helpers/contexts/removeModal/removeModalContext';
import RemoveButton from '../../../helpers/components/removeButton';
import ChangePrivacyButton from '../../../helpers/components/changePrivacyButton';

import image_not_found from '../../../images/image_not_found.png'; // Tell Webpack this JS file uses this image

const PlaylistContainer = (props) => {

    const { showModal, clear, removeModalData } = useContext(RemoveModalContext)

    let location = useLocation()

    const { user } = useContext(UserContext)
    const [filmState, filmDispatch] = useContext(FilmContext)

    const [state, dispatch] = useReducer(filmPlaylistReducer, filmPlaylistInitialState)

    const {
        playlist,
        isRemovingPlaylist,
        isRemovingFilm,
        removingFilmId,
        currentFilm,
        currentFilmIndex,
        headerHeight,
        playerHeight,
        error
    } = state

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

        if (filmState.reloadPlaylist && playlist) handleReloadPlaylist()

    }, [filmState.reloadPlaylist, playlist, filmDispatch, props.match.params.id])



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
        if (!error && filmState.isPreviewLoaded) handleGetPlaylist()
    }, [props.match.params.id, location.search, error, filmState.isPreviewLoaded])


    useEffect(() => {
        async function removePlaylist() {
            await playlistApi.remove(playlist.id)
                .then(res => {
                    clearPlaylist()
                    clear()
                })
                .catch(err => {
                    console.error(err)
                    clear()
                })
        }
        if (isRemovingPlaylist && removeModalData.isRemoving &&
            removeModalData.id === playlist.id && removeModalData.type === 'playlist' &&
            removeModalData.title === playlist.title) removePlaylist()
    }, [clear, isRemovingPlaylist, playlist, removeModalData])


    useEffect(() => {
        async function removeFilm() {
            await playlistApi.partialUpdate(playlist.id, { films_id: [removingFilmId], is_remove_films: true })
                .then(res => {
                    dispatch({
                        type: 'remove-film-success'
                    })
                })
                .catch(err => {
                    console.error(err)
                })
        }

        if (isRemovingFilm) removeFilm()
    }, [isRemovingFilm, playlist, removingFilmId])

    const handleRemovePlaylist = () => {

        if (removeModalData.isRemoving) return

        dispatch({
            type: 'field',
            fieldName: 'isRemovingPlaylist',
            payload: true
        })

        showModal(playlist.id, 'playlist', playlist.title)
    }

    const handleRemoveFromPlaylist = (id) => {
        if (isRemovingFilm) return

        dispatch({
            type: 'remove-film',
            payload: id
        })
    }


    return (

        playlist && playerHeight && !error &&
        <div className='col mb-4'>
            <div className='col p-0 border'>
                <div ref={headerRef}
                    style={{ height: headerHeight + 'px' }}
                    className="col remove-container pt-2 pb-2 film-preview-playlist-header" sm={12}>
                    <div className="row m-0 px-2">
                        <div className="colbutton-ripple-div-next-width">
                            <p className="mb-1 fw-bold film-preview-playlist-text-truncate">{playlist.title}</p>
                        </div>
                        <div className="col justify-content-end d-flex">
                            {
                                user.id === playlist.author_id &&
                                <RemoveButton handleRemove={() => handleRemovePlaylist()} />
                            }
                        </div>
                        <div className="col-12 col-sm-12">
                            {
                                user.id === playlist.author_id &&
                                <ChangePrivacyButton
                                    id={playlist.id}
                                    isPublic={playlist.is_public}
                                    isProfile={false}
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
                                return(
                                    <div className="row m-0 p-0 pe-2 remove-container" key={film.id}>
                                        <div className={`${index === playlist.films.length - 1 ?
                                            "mt-3 mb-3 " :
                                            "mt-3"} button-ripple-div-next-width col`}
                                            onClick={() => {
                                                if (!film.isNonExisting)
                                                    props.handleRedirect(film.id)
                                            }}>
                                            <div className="row m-0 p-0 play-outer-container">
                                                <div
                                                    className="col-1 col-sm-1 text-center justify-content-center d-flex align-items-center p-0 ps-1" >
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
                                                <div className="col-6 col-sm-6 pe-2 ps-2">
                                                    <div className="embed-responsive embed-responsive-16by9 z-depth-1-half w-100 play-container">
                                                        {film.isNonExisting ?
                                                            <img alt="" className="embed-responsive-item play-image"
                                                                src={image_not_found} />
                                                            :
                                                            <BlurredImageComponent
                                                                image={`${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail`} />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-5 col-sm-5 p-0">
                                                    {film.isNonExisting ?
                                                        (<TextTruncate line={2} text="Not found"
                                                            className="mb-0 title fw-bold" />)
                                                        :
                                                        (<>
                                                            <TextTruncate line={1} text={film.title}
                                                                className="mb-0 title fw-bold" />
                                                            <p className="mb-1 author-nick">
                                                                <span>{film.author_name}</span>
                                                            </p>
                                                        </>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            user.id === playlist.author_id &&
                                            <div style={{ width: '24px' }} className="p-0 d-flex align-items-center justify-content-center">
                                                <RemoveButton handleRemove={() => handleRemoveFromPlaylist(film.id)} />
                                            </div>
                                        }

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
