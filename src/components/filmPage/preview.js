import React, { useState, useEffect, useCallback, useContext } from 'react';
import { withRouter } from 'react-router-dom'

import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as filmApi from '../../services/filmService'

import { Player } from 'video-react';
import TextTruncate from 'react-text-truncate';

import FilmDispatch from './filmDispatch'

import "../../../node_modules/video-react/dist/video-react.css";

const initialFilm = {
    img: '',
    film: '',
    title: '',
    views: '',
    likes: '',
    dislikes: '',
    description: `\r\n\n\n`
}
function FilmPreview(props) {

    const dispatch = useContext(FilmDispatch)

    const playerRef = useCallback(node => {
        console.log('Ref updated')

        if (node !== null) {
            dispatch({
                type: 'field',
                fieldName: 'playerHeight',
                payload: node.getBoundingClientRect().height
            })
            setPlayerNode(node)
        }
    }, [dispatch])

    const [film, setFilm] = useState(initialFilm)
    const [isDescExpanded, setIsDescExpanded] = useState(false)
    const [playerNode, setPlayerNode] = useState(null);


    useEffect(() => {
        if (playerNode) {

            const measure = () => {
                dispatch({
                    type: 'field',
                    fieldName: 'playerHeight',
                    payload: playerNode.getBoundingClientRect().height
                })
            }

            window.addEventListener("resize", measure);

            return () => window.removeEventListener("resize", measure);
        }
    }, [playerNode, dispatch]);

    useEffect(() => {
        async function handleGetFilm() {
            await filmApi.index(props.match.params.id).then(res => {
                let data = res.data
                data.img = `${process.env.REACT_APP_API_URL}films/${res.data.id}/thumbnail?width=poster`
                data.video = `${process.env.REACT_APP_API_URL}films/${res.data.id}/video`
                dispatch({
                    type: 'field',
                    fieldName: 'comments',
                    payload: data.comments
                })
                data.views = data.views + 1
                setFilm(data)
                return data
            }).then(async data => {
                await filmApi.view(data.id).then(res => {
                    console.log('Views updated')
                })
            })
        }
        handleGetFilm()
    }, [props.match.params.id, dispatch])

    const handleTruncate = (e) => {
        e.preventDefault();
        setIsDescExpanded(!isDescExpanded)
    }



    const handleLike = (action) => {
        filmApi.like(film.id, action).then(res => {

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
                            <Col xs={4} sm={4} className="text-right">

                                <p style={{ cursor: "pointer" }}
                                    onClick={() => handleLike('like')}>
                                    <FontAwesomeIcon icon="thumbs-up" />
                                    &ensp;{film.likes}
                                </p>
                            </Col>
                            <Col xs={4} sm={4}>
                                <p style={{ cursor: "pointer" }}
                                    onClick={() => handleLike('dislike')}>
                                    <FontAwesomeIcon icon="thumbs-down" />
                                    &ensp;{film.dislikes}
                                </p>
                            </Col>
                            <Col sm={12} className="mt-4 mb-4 divider" />

                            <Col sm={12} style={{ whiteSpace: 'pre-line' }}>
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
