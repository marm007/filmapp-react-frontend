import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom'

import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from "query-string";
import './FilmComponent.css';
import * as filmApi from '../../services/filmService'

import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import TextTruncate from 'react-text-truncate';

function FilmPreview(props) {

    let history = useHistory()
    let location = useLocation()

    const playerRef = useCallback(node => {
        if (node !== null) {
            onPlayerHeightChange(node.getBoundingClientRect().height)
            setPlayerNode(node)
        }
    }, [])

    const [film, setFilm] = useState(null)
    const [isDescExpanded, setIsDescExpanded] = useState(false)
    const [playerNode, setPlayerNode] = useState(null);

    const { onPlayerHeightChange } = props

    useEffect(() => {
        if (playerNode) {
            const measuer = () => {
                onPlayerHeightChange(playerNode.getBoundingClientRect().height);
              }

            window.addEventListener("resize", measuer);

            return () => window.removeEventListener("resize", measuer);
        }
    }, [playerNode]);

    useEffect(() => {
        async function handleGetFilm() {
            await filmApi.index(props.match.params.id).then(res => {
                let data = res.data
                data.img = `${process.env.REACT_APP_API_URL}films/${res.data.id}/thumbnail?width=poster`
                data.video = `${process.env.REACT_APP_API_URL}films/${res.data.id}/video`
                props.onCommentsChange(data.comments)
                return data
            }).then(async data => {
                await filmApi.view(data.id).then(res => {
                    data.views = res.data.views
                    setFilm(data)
                })
            })
        }
        handleGetFilm()
    }, [props.match.params.id])


    const handleTruncate = (e) => {
        e.preventDefault();
        setIsDescExpanded(!isDescExpanded)
    }



    const handleLike = (action) => {
        filmApi.like(film.id, action).then(res => {

        })
    };

    return (

        film &&
        <Col>
            <Col sm={12}>
                <div ref={playerRef}>
                    <Player
                        playsInline
                        poster={film.img}
                        src={film.video}
                    />
                </div>
            </Col>

            <Col className="pl-3 pr-3 mt-4" sm={12}>
                <Row>
                    <Col sm={12}>
                        <p className="font-weight-bold">{film.title}</p>
                    </Col>
                    <Col xs={4} sm={4}>
                        <p><FontAwesomeIcon icon="eye" /> &ensp;{film.views}</p>
                    </Col>
                    <Col xs={4} sm={4} className="text-right">

                        <p style={{ cursor: "pointer" }}
                            onClick={() => handleLike('like')}
                        >
                            <FontAwesomeIcon icon="thumbs-up" />
                            &ensp;{film.likes}</p>
                    </Col>
                    <Col xs={4} sm={4}>
                        <p style={{ cursor: "pointer" }}
                            onClick={() => handleLike('dislike')}
                        >
                            <FontAwesomeIcon icon="thumbs-down" />
                            &ensp;{film.dislikes}</p>
                    </Col>
                    <Col sm={12} className="mt-4 mb-4 divider" />

                    <Col sm={12}>
                        <TextTruncate line={!isDescExpanded && 2}
                            truncateText="…"
                            text={film.description}
                            textTruncateChild={
                                <span id="s-c-2">
                                    <Button variant="link" style={{ display: 'block' }}
                                        className="p-0 m-0 mb-1 title font-weight-bold"
                                        onClick={handleTruncate}>Read more</Button></span>

                            }>

                        </TextTruncate>

                        {isDescExpanded && (
                            <span style={{ display: 'block' }}>
                                <Button className="p-0 m-0 mb-1 title font-weight-bold"
                                    variant="link" onClick={handleTruncate}>Show less</Button></span>
                        )}
                    </Col>
                </Row>
            </Col>
            <Col style={{ height: 80 }} sm={12}
                className="pl-3 pr-3 mb-2 text-center justify-content-center d-flex align-items-center">
            </Col>
            <Col sm={12} className="mt-4 mb-2 divider d-block d-md-none" />


        </Col>


    )
}


export default withRouter(FilmPreview)
