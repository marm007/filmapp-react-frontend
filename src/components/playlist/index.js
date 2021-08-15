import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";
import BlurredImageComponent from "../blurredImage";
import RemoveButton from '../../helpers/components/removeButton';
import ChangePrivacyButton from '../../helpers/components/changePrivacyButton';

const Playlist = ({ playlist, handleRedirect, handleRemove, isProfile, dispatchPrivacyUpdate }) => {

    const colWidth = isProfile ? 8 : 10

    const [style, setStyle] = useState("mb-5 play-outer-container remove-container")

    useEffect(() => {
        if (!playlist.film_id) setStyle("mb-5 play-cursor-default remove-container")
    }, [playlist.film_id])


    return (
        <Col xs={12} sm={6} md={3} lg={2}
            key={playlist.id}>
            <Col className={style} onClick={() => handleRedirect(playlist.id, playlist.film_id)}>
                <div className="embed-responsive embed-responsive-16by9 z-depth-1-half play-container">
                    <BlurredImageComponent
                        image={playlist.img} />

                    <Row style={{ width: '100%', margin: 0 }} className="play-middle">
                        <Col xs={5} sm={5} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <FontAwesomeIcon icon="play" />
                        </Col>
                        <Col xs={7} sm={7} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <small className="fw-bold" >Play all</small>
                        </Col>
                    </Row>
                </div>

                <Row className="m-0 mt-1">
                    <Col xs={colWidth} sm={colWidth} className="p-0">
                        <TextTruncate line={1} text={playlist.title}
                            className="mb-1 mt-1 title " />
                    </Col>


                    {
                        isProfile && <Col xs={4} sm={4} className="p-0 d-flex justify-content-end">
                            <ChangePrivacyButton
                                id={playlist.id}
                                isPublic={playlist.is_public}
                                isProfile={true}
                                dispatchPrivacyUpdate={dispatchPrivacyUpdate} />
                            <RemoveButton handleRemove={handleRemove} />
                        </Col>
                    }
                </Row>
                <p className="mb-0 author-nick-color">
                    <small>{playlist.author_name}</small>
                </p>
            </Col>
        </Col>

    )
}

export default Playlist