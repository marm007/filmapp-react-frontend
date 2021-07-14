import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";

import BlurredImageComponent from "../blurredImage";
import PlaylistAddButtonComponent from "../add/add-playlist";

import { checkIfPlaylistButtonClick } from '../../helpers'

import * as filmApi from '../../services/filmService'

function Home(props) {

    let history = useHistory()

    const [films, setFilms] = useState([])

    useEffect(() => {
        async function getAllFilms() {
            await filmApi.all('').then(res => {
                let films = res.data;

                films.forEach(film => {
                    film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=preview`

                });

                setFilms(films)
            })
        }
        getAllFilms()
    }, [])

    const handleRedirect = (id) => {
        history.push({ pathname: `${process.env.REACT_APP_PATH_NAME}film/` + id });
    };

    return (
        <Col>
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

            </Row>
        </Col>

    )
}

export default Home;
