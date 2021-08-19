import React, { useEffect, useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { playlistsPageReducer, initialState } from './reducer'

import Skeleton from '../../helpers/film/skeleton';
import Playlist from '../../helpers/playlist';

import * as playlistApi from '../../../services/playlistService'

import { pageInitialMaxFetchCount, pageMaxFetchCount } from '../../../config';

import { jsxLoop } from '../../../helpers';
import useBottomScrollListener from '../../../helpers/hooks/useBottomScrollListener';

const pathName = process.env.REACT_APP_PATH_NAME;

function PlaylistsPage() {

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
            await playlistApi.show({ limit: pageInitialMaxFetchCount })
                .then(res => {
                    const result = res.data;

                    let filtered = result.filter(playlist => playlist.film_id)

                    filtered.forEach(playlist => {
                        playlist.img = `${process.env.REACT_APP_API_URL}films/${playlist.film_id}/thumbnail`
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
            await playlistApi.show({ skip: playlistsCount, limit: pageMaxFetchCount })
                .then(res => {
                    const result = res.data;

                    let filtered = result.filter(playlist => playlist.film_id)

                    filtered.forEach(playlist => {
                        playlist.img = `${process.env.REACT_APP_API_URL}films/${playlist.film_id}/thumbnail`
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
        <div className="row mt-5 mx-2">
            {
                playlists ? playlists.map((playlist, index) => <Playlist key={playlist.id} playlist={playlist} index={index} handleRedirect={setRedirect} />)
                    : [...jsxLoop(20, i =>
                        <Skeleton key={i} />
                    )]
            }
            {
                !isAllFetched && <div className="fetch-loader d-flex justify-content-center">
                    {
                        isLoading &&
                        <div className="spinner spinner-border" />
                    }
                </div>
            }

        </div>

    )
}

export default PlaylistsPage
