import React, { useEffect, useReducer, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { playlistsPageReducer, initialState } from './reducer'

import Skeleton from '../film-row/skeleton';
import Playlist from '../playlist';

import { show } from '../../services/playlistService'
import { me } from '../../services/userService'

import { pageInitialMaxFetchCount, pageMaxFetchCount } from '../../config';

import useBottomScrollListener from '../../hooks/use-bottom-scroll-listener';
import UserContext from '../../contexts/user/userContext';

const pathName = process.env.REACT_APP_PATH_NAME;

function PlaylistsPage() {

    const { user } = useContext(UserContext);

    let history = useHistory()

    const [state, dispatch] = useReducer(playlistsPageReducer, initialState)
    const { playlists, isLoading, isAllLoaded, isInitialLoaded, playlistsCount } = state

    const handleOnPlaylistsBottom = useCallback(() => {
        if (!isLoading && !isAllLoaded && isInitialLoaded) {
            dispatch({
                type: 'load'
            })
        }
    }, [isAllLoaded, isLoading, isInitialLoaded])

    useBottomScrollListener(handleOnPlaylistsBottom, { triggerOnNoScroll: true })

    useEffect(() => {
        async function fetchInitialPlaylists() {
            await me().then(res => { }).catch(err => console.error(err))
            await show({ limit: pageInitialMaxFetchCount, playlistPage: true })
                .then(res => {
                    const result = res.data;

                    let filtered = result.filter(playlist => playlist.film_id)

                    filtered.forEach(playlist => {
                        playlist.img = `${process.env.REACT_APP_API_URL}films/${playlist.film_id}/thumbnail`
                    });
                    console.log(res.data)
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
        console.log('auth', user.auth)
        dispatch({ type: 'clear' })
        fetchInitialPlaylists()

    }, [user.auth])

    useEffect(() => {
        async function fetchPlaylists() {

            await show({ skip: playlistsCount, limit: pageMaxFetchCount, playlistPage: true })
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
                    : ([...Array(20)].map((_, index) => (
                        <Skeleton key={index} />
                    )))
            }
            {
                !isAllLoaded && <div className="fetch-loader d-flex justify-content-center">
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
