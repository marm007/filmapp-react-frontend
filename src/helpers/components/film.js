import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";

import BlurredImageComponent from "../../components/blurredImage";
import PlaylistAddButtonComponent from "../../components/add/playlistAddButton";

import { checkIfPlaylistButtonClick } from '../index'
import RemoveButton from './removeButton';

const Film = (props) => {

    const { film, index, handleRedirect, handleRemove, isProfile } = props

    return (
        <Col className="mb-5 film-play-outer-container playlist-remove-container"
            xs={12} sm={6} md={3} lg={2}
            onClick={(e) => {
                const isPlaylistButton = checkIfPlaylistButtonClick(e.target)
                if (!isPlaylistButton) handleRedirect(film.id)
            }}>
            <div
                className="embed-responsive embed-responsive-16by9 z-depth-1-half film-play-container">
                <BlurredImageComponent
                    image={film.img} />
                <FontAwesomeIcon className="film-play-middle" icon="play" />
            </div>
            <Row className="m-0 mt-1">
                <Col xs={10} sm={10} className="p-0">
                    <TextTruncate line={1} text={film.title}
                        id="s-c-2"
                        className="mb-1 mt-1 title " />
                </Col>

                {
                    isProfile ?
                        <RemoveButton handleRemove={handleRemove}/> :
                        <PlaylistAddButtonComponent
                            index={index}
                            filmID={film.id} />
                }
            </Row>
            <p className="mb-0 author-nick">
                <small>{film.author_name}</small>
            </p>
            <p className="mb-0 film-views">
                <small>{film.views} views</small>
            </p>
        </Col>
    )
}

export default Film