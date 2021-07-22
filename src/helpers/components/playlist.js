import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";
import BlurredImageComponent from "../../components/blurredImage";
import RemoveButton from './removeButton';

const Playlist = (props) => {

    const { playlist, handleRedirect, handleRemove, isProfile } = props
    const [style, setStyle] = useState("mb-5 film-play-outer-container playlist-remove-container")

    useEffect(() => {
        if (!playlist.film_id) setStyle("mb-5 film-cursor-default playlist-remove-container")
    }, [playlist.film_id])


    return (
        <Col className={style}
            xs={12} sm={6} md={3} lg={2}
            key={playlist.id}>
            <div onClick={() => handleRedirect(playlist.id, playlist.film_id)}
                className="embed-responsive embed-responsive-16by9 z-depth-1-half film-play-container">

                <BlurredImageComponent
                    image={playlist.img} />

                <Row style={{ width: '100%', margin: 0 }} className="film-play-middle">
                    <Col xs={5} sm={5} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <FontAwesomeIcon icon="play" />
                    </Col>
                    <Col xs={7} sm={7} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <small className="font-weight-bold" >Play all</small>
                    </Col>
                </Row>
            </div>

            <Row className="m-0">
                <Col xs={10} sm={10} className="p-0">
                    <TextTruncate line={1} text={playlist.title}
                        id="s-c-2"
                        className="mb-1 mt-1 title " />
                </Col>
                {
                    isProfile && <RemoveButton handleRemove={handleRemove} />
                }
            </Row>
            <p className="mb-0 author-nick">
                <small>{playlist.authorName}</small>
            </p>

        </Col>

    )
}

export default Playlist