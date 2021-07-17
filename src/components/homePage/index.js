import React, { useRef, useEffect, useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";

import BlurredImageComponent from "../blurredImage";
import PlaylistAddButtonComponent from "../add/add-playlist";

import { checkIfPlaylistButtonClick } from '../../helpers'

import * as filmApi from '../../services/filmService'
import { homePageReducer, initialState } from './reducer';
import useBottomScrollListener from '../../helpers/useBottomScrollListener';



function Home(props) {

    let history = useHistory()

    const homePageRef = useRef(null)


    const [state, dispatch] = useReducer(homePageReducer, initialState)
    const { films, isLoading, isAllFetched, error } = state


    const handleOnHomePageData = useCallback(() => {
        if (!isLoading && !isAllFetched) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched])

    useBottomScrollListener(handleOnHomePageData, { triggerOnNoScroll: true })

    useEffect(() => {
        async function getAllFilms() {
            await filmApi.all({skip: films.length, limit: 12}).then(res => {
                let response = res.data;

                response.forEach(film => {
                    film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=preview`

                });

                dispatch({
                    type: 'success',
                    payload: response
                })
            })
        }
        if (isLoading) getAllFilms()
    }, [isLoading, films])

    const handleRedirect = (id) => {
        history.push({ pathname: `${process.env.REACT_APP_PATH_NAME}film/` + id });
    };

    return (
        <Col ref={homePageRef}>
            <Row className="mt-5 mx-2">
                {
                    films.map((film, index) => {
                        return <Col className="mb-5 film-play-outer-container"
                            onClick={(e) => {
                                const isPlaylistButton = checkIfPlaylistButtonClick(e.target)
                                if (!isPlaylistButton) handleRedirect(film.id)
                            }}
                            xs={6} sm={4} md={3} lg={2} key={film.id}>
                            <div
                                className="embed-responsive embed-responsive-16by9 z-depth-1-half film-play-container">
                                <BlurredImageComponent
                                    image={film.img}
                                />

                                <FontAwesomeIcon className="film-play-middle" icon="play" />
                            </div>
                            <Row className="m-0 mt-1">
                                <Col xs={10} sm={10} className="p-0">
                                    <TextTruncate line={1} text={film.title}
                                        id="s-c-2"
                                        className="mb-1 mt-1 title " />
                                </Col>

                                <PlaylistAddButtonComponent
                                    index={index}
                                    filmID={film.id} />
                            </Row>
                            <p className="mb-0 author-nick">
                                <small>{film.author_name}</small>
                            </p>
                            <p className="mb-0 film-views">
                                <small>{film.views} views</small>
                            </p>
                        </Col>
                    })
                }

                {
                    !isAllFetched && <div style={{ height: 32 + 'px', width: '100%' }} className="d-flex justify-content-center">
                        {isLoading && <Spinner animation="border" />}
                    </div>
                }

            </Row>
        </Col>

    )
}

export default Home;
