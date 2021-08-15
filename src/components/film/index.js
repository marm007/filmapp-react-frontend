import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";

import BlurredImageComponent from "../blurredImage";
import PlaylistAddButtonComponent from "../add/playlistAddButton";

import { checkIfPlaylistButtonClick } from '../../helpers';
import RemoveButton from '../../helpers/components/removeButton';

import '../filmPage/film.css'

const Film = ({ film, index, handleRedirect, handleRemove, isProfile, isRecommendations, filmDispatch }) => {

    const recommendationsClass = "row mx-0 mb-4"
    const normalClass = "col mb-5 col-12 col-sm-6 col-md-3 col-lg-2"

    return (
        <div className={isRecommendations ? recommendationsClass : normalClass}>
            <div className={(isRecommendations ? "row p-0 m-0" : "col").concat(" play-outer-container remove-container")}
                onClick={(e) => {
                    const isPlaylistButton = checkIfPlaylistButtonClick(e.target)
                    if (!isPlaylistButton) handleRedirect(film.id)
                }}>
                <Col xs={isRecommendations ? 6 : 12} sm={isRecommendations ? 6 : 12}
                    className="m-0 p-0">
                    <div
                        className="embed-responsive embed-responsive-16by9 z-depth-1-half play-container">
                        <BlurredImageComponent
                            image={film.img} />
                        <FontAwesomeIcon className="play-middle" icon="play" />
                    </div>
                </Col>
                <Col xs={isRecommendations ? 6 : 12} sm={isRecommendations ? 6 : 12}
                    className={isRecommendations ? "m-0" : "m-0 p-0"}>
                    <Row className="m-0 mt-1">
                        <Col className="film-preview-playlist-title-width p-0">
                            <TextTruncate line={1} text={film.title}
                                className="mb-1 mt-1 title " />
                        </Col>

                        <Col className="p-0 d-flex justify-content-end">
                            {
                                isProfile ?
                                    <RemoveButton handleRemove={handleRemove} /> :
                                    <PlaylistAddButtonComponent
                                        isRecommendations={isRecommendations}
                                        filmDispatch={filmDispatch}
                                        index={index}
                                        filmID={film.id} />
                            }
                        </Col>
                    </Row>
                    <p className="mb-0 author-nick-color">
                        <small>{film.author_name}</small>
                    </p>
                    <p className="mb-0 film-views">
                        <small>{film.views} views</small>
                    </p>
                </Col>
            </div>
        </div>
    )
}

export default Film