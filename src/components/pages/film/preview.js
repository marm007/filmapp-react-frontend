import React, { useState, useEffect, useCallback, useContext, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Player } from 'video-react';
import TextTruncate from 'react-text-truncate';
import "../../../../node_modules/video-react/dist/video-react.css";

import { initialPreviewState, previewReducer } from './reducers/previewReducer';

import * as filmApi from '../../../services/filmService'
import * as userApi from '../../../services/userService'

import FilmContext from '../../../helpers/contexts/film/filmContext'
import UserContext from '../../../helpers/contexts/user/userContext';
import 'core-js/modules/esnext.promise.all-settled'

const FilmPreview = (props) => {

    let history = useHistory()
    let location = useLocation()

    const { user } = useContext(UserContext)

    // eslint-disable-next-line no-unused-vars
    const [filmState, filmDispatch] = useContext(FilmContext)

    const playerRef = useCallback(node => {
        if (node !== null) {
            filmDispatch({
                type: 'field',
                fieldName: 'playerHeight',
                payload: node.getBoundingClientRect().height
            })
            setPlayerNode(node)
        }
    }, [filmDispatch])

    const [state, dispatch] = useReducer(previewReducer, initialPreviewState)

    const { film, isLiked, isDisliked, isLikeButtonClicked, likeAction, isDescExpanded } = state

    const [playerNode, setPlayerNode] = useState(null);


    useEffect(() => {
        if (playerNode) {

            const measure = () => {
                filmDispatch({
                    type: 'field',
                    fieldName: 'playerHeight',
                    payload: playerNode.getBoundingClientRect().height
                })
            }

            window.addEventListener("resize", measure);

            return () => window.removeEventListener("resize", measure);
        }
    }, [playerNode, filmDispatch]);

    useEffect(() => {
        async function handleGetFilm() {
            let requests = [filmApi.index(props.match.params.id), filmApi.view(props.match.params.id)]
            if (user.auth) requests.push(userApi.me({ details: true }))

            const [filmResponse, filmViewResponse, userResponse] = await Promise.allSettled(requests);

            if (filmResponse.status === "rejected" || filmViewResponse.status === "rejected") {
                filmDispatch({
                    type: 'field',
                    fieldName: 'error',
                    payload: true
                })
                return
            }


            const filmData = filmResponse.value.data

            filmDispatch({
                type: 'success',
                comments: filmData.comments,
                commentsCount: filmData.comments_count
            })

            const film = {
                ...filmData,
                img: `${process.env.REACT_APP_API_URL}films/${filmData.id}/thumbnail?width=poster`,
                video: `${process.env.REACT_APP_API_URL}films/${filmData.id}/video`,
                views: filmViewResponse.value.data.views
            }
            let isLiked = false
            let isDisliked = false


            if (userResponse && userResponse.status === "fulfilled") {
                const details = userResponse.value.data.details
                isLiked = details.liked.indexOf(props.match.params.id) > -1
                isDisliked = details.disliked.indexOf(props.match.params.id) > -1
            }

            dispatch({
                type: 'success',
                film: film,
                isLiked: isLiked,
                isDisliked: isDisliked
            })

        }
        handleGetFilm()
    }, [props.match.params.id, filmDispatch, user.auth])

    useEffect(() => {
        async function handleLike() {
            if (likeAction === null) return

            try {
                const likeResult = await filmApi.like(film.id, { action: likeAction })

                let likeData = likeResult.data
                likeData.img = `${process.env.REACT_APP_API_URL}films/${likeData.id}/thumbnail?width=poster`
                likeData.video = `${process.env.REACT_APP_API_URL}films/${likeData.id}/video`

                const userResult = await userApi.me({ details: true })
                const details = userResult.data.details
                const isLiked = details.liked.indexOf(likeData.id) > -1
                const isDisliked = details.disliked.indexOf(likeData.id) > -1

                dispatch({
                    type: 'success',
                    film: likeData,
                    isLiked: isLiked,
                    isDisliked: isDisliked
                })

            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'error'
                })
                if (err.response && err.response.status === 401) {
                    history.push(`${location.pathname}/login`);
                }
            }
        }

        if (isLikeButtonClicked) handleLike()
    }, [film.id, isLikeButtonClicked, likeAction, history, location])

    const handleTruncate = (e) => {
        e.preventDefault();
        dispatch({
            type: 'field',
            fieldName: 'isDescExpanded',
            payload: !isDescExpanded
        })
    }

    const handleLike = (action) => {
        if (isLikeButtonClicked) return
        dispatch({
            type: 'like',
            payload: action
        })

    };

    const TruncateButton = (title) => {
        return (<span>
            <button className="btn btn-link p-0 m-0 mb-1 title font-weight-bold"
                onClick={handleTruncate}>{title}</button>
        </span>)
    }
    return (

        <div className="p-0">
            <div className="col-12 col-sm-12 preview-margins p-0">
                <div ref={playerRef}>
                    <Player
                        playsInline
                        poster={film.img}
                        src={film.video} />
                </div>
            </div>
            {
                film &&
                <div className="px-0">
                    <div className="col-12 col-sm-12 mt-4 p-0">
                        <div className="row p-0 m-0">
                            <div className="col-12 col-sm-12 p-0">
                                {!film.title && <p className="font-weight-bold"><br /></p>}
                                <p className="font-weight-bold">{film.title}</p>
                            </div>
                            <div className="col-4 col-sm-4 p-0">
                                <p><FontAwesomeIcon icon={faEye} /> &ensp;{film.views}</p>
                            </div>
                            <div className="col-4 col-sm-4 text-right d-flex justify-content-end">
                                <p className={`${isLiked ? 'film-picked-thumb-color' : ''} cursor-pointer noselect`}
                                    onClick={() => handleLike('like')}>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                    &ensp;{film.likes}
                                </p>
                            </div>
                            <div className="col-4 col-sm-4 d-flex justify-content-start">
                                <p className={`${isDisliked ? 'film-picked-thumb-color' : ''} cursor-pointer noselect`}
                                    onClick={() => handleLike('dislike')}>
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                    &ensp;{film.dislikes}
                                </p>
                            </div>
                            <div className="col-12 col-sm-12 mt-4 mb-4 divider" />

                            <div className="col-12 col-sm-12 p-0" style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
                                <TextTruncate line={!isDescExpanded && 2}
                                    truncateText="…"
                                    text={film.description}
                                    textTruncateChild={TruncateButton('Show more')} />

                                {isDescExpanded && TruncateButton('Show less')}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 mt-4 mb-2 divider p-0" />
                </div>
            }
        </div>


    )
}


export default FilmPreview
