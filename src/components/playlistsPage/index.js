import React, { useEffect, useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";
import BlurredImageComponent from "../blurredImage";

import * as playlistApi from '../../services/playlistService'

import { playlistsPageReducer, initialState } from './reducer'
import useBottomScrollListener from '../../helpers/useBottomScrollListener';

const pathName = process.env.REACT_APP_PATH_NAME;

function PlaylistsPage(props) {

    let history = useHistory()

    const [state, dispatch] = useReducer(playlistsPageReducer, initialState)
    const { playlists, isLoading, isAllFetched, error, playlistsCount } = state

    const handleOnPlaylistsBottom = useCallback(() => {
        if (!isLoading && !isAllFetched) {
            dispatch({
                type: 'load'
            })
        }
    }, [isAllFetched, isLoading])

    useBottomScrollListener(handleOnPlaylistsBottom, { triggerOnNoScroll: true })

    useEffect(() => {
        async function fetchAllPlaylists() {
            await playlistApi.show({ skip: playlistsCount, limit: 12 })
                .then(res => {
                    const result = res.data;

                    let filtered = result.filter(playlist => playlist.film_id)

                    filtered.forEach(playlist => {
                        playlist.img = `${process.env.REACT_APP_API_URL}films/${playlist.film_id}/thumbnail?width=preview`
                    });
                    console.log('fecasz', result.length)

                    dispatch({
                        type: 'success',
                        payload: filtered,
                        responseCount: result.length
                    })

                })
                .catch(err => {
                    console.error(err)
                })
        }

        if (isLoading) fetchAllPlaylists()

    }, [playlists, isLoading, playlistsCount])


    const setRedirect = (playlistID, filmID) => {
        history.push({
            pathname: `${pathName}film/` + filmID,
            search: `?list=${playlistID}`
        });
    };


    return (
        <Col >
            <Row className="mt-5">
                {
                    playlists.map((playlist, index) => {
                        return <Col className="mb-5 film-play-outer-container"
                            xs={6} sm={4} md={3} lg={2} key={playlist.id}>
                            <div onClick={() => setRedirect(playlist.id, playlist.film_id)}
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

                            <Col xs={12} sm={12} className="p-0">
                                <TextTruncate line={2} text={playlist.title}
                                    id="s-c-2"
                                    className="mb-1 mt-1 title " />
                            </Col>
                            <p className="mb-0 author-nick">
                                <small>{playlist.authorName}</small>
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

export default PlaylistsPage
