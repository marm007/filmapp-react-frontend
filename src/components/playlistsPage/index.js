import React, { useEffect, useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Spinner } from 'react-bootstrap';

import * as playlistApi from '../../services/playlistService'

import { playlistsPageReducer, initialState } from './reducer'
import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';
import Playlist from '../../helpers/components/playlist';

const pathName = process.env.REACT_APP_PATH_NAME;

function PlaylistsPage(props) {

    let history = useHistory()

    const [state, dispatch] = useReducer(playlistsPageReducer, initialState)
    const { playlists, isLoading, isAllFetched, isInitialLoaded, playlistsCount } = state

    const handleOnPlaylistsBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && isInitialLoaded) {
            dispatch({
                type: 'load'
            })
        }
    }, [isAllFetched, isLoading, isInitialLoaded])

    useBottomScrollListener(handleOnPlaylistsBottom, { triggerOnNoScroll: true })

    useEffect(() => {
        async function fetchInitialPlaylists() {
            await playlistApi.show({ limit: 12 })
                .then(res => {
                    const result = res.data;

                    let filtered = result.filter(playlist => playlist.film_id)

                    filtered.forEach(playlist => {
                        playlist.img = `${process.env.REACT_APP_API_URL}films/${playlist.film_id}/thumbnail?width=preview`
                    });

                    dispatch({
                        type: 'initial-success',
                        playlists: filtered,
                        responseCount: result.length
                    })

                })
                .catch(err => {
                    console.error(err)
                })
        }

        dispatch({ type: 'clear' })
        fetchInitialPlaylists()

    }, [])

    useEffect(() => {
        async function fetchPlaylists() {
            await playlistApi.show({ skip: playlistsCount, limit: 12 })
                .then(res => {
                    const result = res.data;

                    let filtered = result.filter(playlist => playlist.film_id)

                    filtered.forEach(playlist => {
                        playlist.img = `${process.env.REACT_APP_API_URL}films/${playlist.film_id}/thumbnail?width=preview`
                    });

                    dispatch({
                        type: 'success',
                        playlists: filtered,
                        responseCount: result.length
                    })

                })
                .catch(err => {
                    console.error(err)
                })
        }

        if (isLoading && isInitialLoaded) fetchPlaylists()

    }, [isLoading, isInitialLoaded, playlists, playlistsCount])


    const setRedirect = (playlistID, filmID) => {
        history.push({
            pathname: `${pathName}film/` + filmID,
            search: `?list=${playlistID}`
        });
    };


    return (
        <Row className="mt-5 mx-2">
            {
                playlists && playlists.map((playlist, index) => <Playlist key={playlist.id} playlist={playlist} index={index} handleRedirect={setRedirect} />)
            }
            {
                !isAllFetched && <div style={{ height: 32 + 'px', width: '100%' }} className="d-flex justify-content-center">
                    {(isLoading || !isInitialLoaded) && <Spinner animation="border" />}
                </div>
            }

        </Row>

    )
}

export default PlaylistsPage
