import React, { useEffect, useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";
import BlurredImageComponent from "../blurredImage";

import * as playlistApi from '../../services/playlistService'

import { playlistsPageReducer, initialState } from './reducer'
import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';
import Playlist from '../../helpers/components/playlist';

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
        <Row className="mt-5 mx-2">
            {
                playlists.map((playlist, index) => <Playlist key={playlist.id} playlist={playlist} index={index} handleRedirect={setRedirect} />)
            }
            {
                !isAllFetched && <div style={{ height: 32 + 'px', width: '100%' }} className="d-flex justify-content-center">
                    {isLoading && <Spinner animation="border" />}
                </div>
            }

        </Row>

    )
}

export default PlaylistsPage
