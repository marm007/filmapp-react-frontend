import React, { useEffect, useReducer, useCallback, useContext } from 'react';

import { Col, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TextTruncate from 'react-text-truncate';

import * as filmApi from '../../services/filmService'
import PlaylistAddButtonComponent from "../add/playlistAddButton";

import { checkIfPlaylistButtonClick } from '../../helpers'

import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';

import { recommendationsReducer, recommendationsInitialState } from './reducers/recommendationsReducer'
import { recommendationsMaxFetchCount } from "../../config"
import FilmContext from '../../helpers/film/filmContext';

function FilmsRecommendations(props) {

    const [filmState, filmDispatch] = useContext(FilmContext)

    const [state, dispatch] = useReducer(recommendationsReducer, recommendationsInitialState)

    const { films, isLoading, isAllFetched, isInitialLoaded, id, error } = state

    const handleRecommendationsOnBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && isInitialLoaded && !error && id) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched, isInitialLoaded, error, id])

    useBottomScrollListener(handleRecommendationsOnBottom)

    useEffect(() => {
        async function initialLoad() {
            await filmApi.all({ exclude: props.match.params.id, limit: recommendationsMaxFetchCount }).then(res => {
                let films = res.data;

                films.forEach(film => {
                    film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`

                });

                dispatch({
                    type: 'initial-success',
                    films: films,
                    id: props.match.params.id
                })
            })
        }

        dispatch({
            type: 'clear'
        })

        if (filmState.isPreviewLoaded) initialLoad()
    }, [props.match.params.id, filmState.isPreviewLoaded])

    useEffect(() => {
        if (filmState.error) {
            dispatch({
                type: 'error',
                payload: filmState.error
            })
        } 
    }, [filmState.error])

    useEffect(() => {
        async function fetchData() {
            await filmApi.all({ exclude: id, skip: films.length, limit: recommendationsMaxFetchCount }).then(res => {
                let films = res.data;

                films.forEach(film => {
                    film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`

                });

                dispatch({
                    type: 'success',
                    payload: films
                })
            })
        }
        if (isLoading && films && id) fetchData()
    }, [isLoading, id, films])

    return (

        <Col>

            {
                films && films.map((film, index) => {

                    return (
                        <Col className="film-play-outer-container p-0 mb-4"
                            key={film.id} onClick={(e) => {
                                const isPlaylistButton = checkIfPlaylistButtonClick(e.target)
                                if (!isPlaylistButton) props.handleRedirect(film.id)
                            }}>
                            <Row>
                                <Col xs={7} sm={7} >
                                    <div className="embed-responsive embed-responsive-16by9 z-depth-1-half film-play-container">
                                        <img className="film-play-image embed-responsive-item"
                                            alt=""
                                            src={film.img} />
                                        <FontAwesomeIcon className="film-play-middle" icon="play" />
                                    </div>
                                </Col>
                                <Col xs={5} sm={5} className="p-0 ">
                                    <Row className="m-0">
                                        <Col style={{ flex: '0 0 calc(83.333333% - 24px)', maxWidth: 'calc(83.3333% - 24px)' }}
                                            className="p-0">
                                            <TextTruncate line={1}
                                                text={film.title}
                                                className="mb-1 title" />

                                        </Col>
                                        <PlaylistAddButtonComponent
                                            isPreview={true}
                                            filmDispatch={filmDispatch}
                                            index={index}
                                            filmID={film.id} />
                                    </Row>
                                    <p id="s-c-3" className="mb-0 author-nick">
                                        <small>{film.authorName}</small>
                                    </p>
                                    <p id="s-c-4" className="film-views">
                                        <small>{film.views} views</small>
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    )
                })
            }

            {
                !isAllFetched && <div style={{ height: 32 + 'px' }} className="d-flex justify-content-center">
                    {(isLoading || !isInitialLoaded) && !error && <Spinner animation="border" />}
                </div>
            }
        </Col>
    )
}

export default FilmsRecommendations
