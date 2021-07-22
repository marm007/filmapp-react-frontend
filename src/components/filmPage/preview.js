import React, { useState, useEffect, useCallback, useContext, useReducer } from 'react';
import { withRouter } from 'react-router-dom'

import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as filmApi from '../../services/filmService'
import * as userApi from '../../services/userService'

import { Player } from 'video-react';
import TextTruncate from 'react-text-truncate';

import FilmDispatch from '../../helpers/film/filmContext'

import "../../../node_modules/video-react/dist/video-react.css";
import { initialPreviewState, previewReducer } from './reducers/previewReducer';
import UserContext from '../../helpers/user/userContext';


function FilmPreview(props) {

    const { user } = useContext(UserContext)

    const filmDispatch = useContext(FilmDispatch)

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
            if(user.auth) requests.push(userApi.me({ details: true }))

            const [filmResponse, filmViewResponse, userResponse] = await Promise.allSettled(requests);

            if (filmResponse.status === "rejected" || filmViewResponse.status === "rejected") {
                // TODO implement error
                return
            }
            const filmData = filmResponse.value.data

            const film = {
                ...filmData,
                img: `${process.env.REACT_APP_API_URL}films/${filmData.id}/thumbnail?width=poster`,
                video: `${process.env.REACT_APP_API_URL}films/${filmData.id}/video`,
                views: filmViewResponse.value.data.views
            }
            let isLiked = false
            let isDisliked = false


            if ( userResponse && userResponse.status === "fulfilled") {
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

            filmDispatch({
                type: 'field',
                fieldName: 'comments',
                payload: filmData.comments
            })
        }
        handleGetFilm()
    }, [props.match.params.id, filmDispatch, user.auth])

    useEffect(() => {
        async function handleLike() {

            if (likeAction === null) return
            
            if(!user.auth) {

                return
            }

            await filmApi.like(film.id, { action: likeAction })
                .then(async res => {
                    let data = res.data
                    data.img = `${process.env.REACT_APP_API_URL}films/${res.data.id}/thumbnail?width=poster`
                    data.video = `${process.env.REACT_APP_API_URL}films/${res.data.id}/video`
                    await userApi.me({ details: true })
                        .then(res => {
                            const details = res.data.details
                            const isLiked = details.liked.indexOf(data.id) > -1
                            const isDisliked = details.disliked.indexOf(data.id) > -1
                            dispatch({
                                type: 'success',
                                film: data,
                                isLiked: isLiked,
                                isDisliked: isDisliked
                            })

                        })
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                    console.error(err)
                })
        }

        if (isLikeButtonClicked) handleLike()
    }, [film.id, isLikeButtonClicked, likeAction])

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
            <Button variant="link"
                className="p-0 m-0 mb-1 title font-weight-bold"
                onClick={handleTruncate}>{title}</Button>
        </span>)
    }
    return (

        <Col>
            <Col sm={12}>
                <div ref={playerRef}>
                    <Player
                        playsInline
                        poster={film.img}
                        src={film.video} />
                </div>
            </Col>
            {
                film &&
                <React.Fragment>
                    <Col className="pl-3 pr-3 mt-4" sm={12}>
                        <Row>
                            <Col sm={12}>
                                {!film.title && <p className="font-weight-bold"><br /></p>}
                                <p className="font-weight-bold">{film.title}</p>
                            </Col>
                            <Col xs={4} sm={4}>
                                <p><FontAwesomeIcon icon="eye" /> &ensp;{film.views}</p>
                            </Col>
                            <Col xs={4} sm={4} className="text-right d-flex justify-content-end">
                                <p style={{ cursor: "pointer", width: "fit-content", width: "-moz-fit-content" }} className={isLiked ? 'blue' : ''}
                                    onClick={() => handleLike('like')}>
                                    <FontAwesomeIcon icon="thumbs-up" />
                                    &ensp;{film.likes}
                                </p>
                            </Col>
                            <Col xs={4} sm={4}>
                                <p style={{ cursor: "pointer", width: "fit-content", width: "-moz-fit-content" }} className={isDisliked ? 'blue' : ''}
                                    onClick={() => handleLike('dislike')}>
                                    <FontAwesomeIcon icon="thumbs-down" />
                                    &ensp;{film.dislikes}
                                </p>
                            </Col>
                            <Col sm={12} className="mt-4 mb-4 divider" />

                            <Col sm={12} style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
                                <TextTruncate line={!isDescExpanded && 2}
                                    truncateText="…"
                                    text={film.description}
                                    textTruncateChild={TruncateButton('Show more')} />

                                {isDescExpanded && TruncateButton('Show less')}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} className="mt-4 mb-2 divider d-block d-md-none" />
                </React.Fragment>
            }
        </Col>


    )
}


export default withRouter(FilmPreview)
