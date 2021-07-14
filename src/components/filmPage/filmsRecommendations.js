import React, { useState, useEffect } from 'react';

import { Col, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './FilmComponent.css';

import TextTruncate from 'react-text-truncate';

import * as filmApi from '../../services/filmService'
import PlaylistAddButtonComponent from "../add/add-playlist";

import { checkIfPlaylistButtonClick } from '../../helpers'

function FilmsRecommendations(props) {

    const [films, setFilms] = useState([])

    useEffect(() => {
        async function fetchData() {
            await filmApi.all({ exclude: props.match.params.id }).then(res => {
                let films = res.data;

                films.forEach(film => {
                    film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`

                });

                setFilms(films)
            })
        }
        fetchData()
    }, [props.match.params.id])


    return (

        <Col>

            {
                films.map((film, index) => {

                    return (
                        <Col className="film-play-outer-container p-0 mb-4"
                            key={film.id} onClick={(e) => {
                                const isPlaylistButton = checkIfPlaylistButtonClick(e.target)
                                if (!isPlaylistButton) props.handleRedirect(film.id)
                            }}>
                            <Row>
                                <Col xs={7} sm={7} >
                                    <div
                                        className="embed-responsive embed-responsive-16by9 z-depth-1-half film-play-container">
                                        <img alt="" id="s-c-1" className="film-play-image embed-responsive-item"
                                            src={film.img} />
                                        <FontAwesomeIcon className="film-play-middle" icon="play" />
                                    </div>
                                </Col>
                                <Col xs={5} sm={5} className="p-0 ">
                                    <Row className="m-0">
                                        <Col xs={10} sm={10} className="p-0">
                                            <TextTruncate line={2} text={film.title}
                                                id="s-c-2" className="mb-1 title" />

                                        </Col>
                                        <PlaylistAddButtonComponent
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

        </Col>
    )
}

export default FilmsRecommendations
