import React, { useEffect, useReducer, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { playlistsPageReducer, initialState } from './reducer'

import Skeleton from '../../models/film/skeleton';
import Playlist from '../../models/playlist';

import * as playlistApi from '../../../services/playlistService'
import * as userApi from '../../../services/userService'

import { pageInitialMaxFetchCount, pageMaxFetchCount } from '../../../config';

import useBottomScrollListener from '../../../helpers/hooks/useBottomScrollListener';
import UserContext from '../../../helpers/contexts/user/userContext';

const pathName = process.env.REACT_APP_PATH_NAME;

function PlaylistsPage() {

    const { user } = useContext(UserContext);

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
            await userApi.me().then(res => {}).catch(err => console.error(err))
            await playlistApi.show({ limit: pageInitialMaxFetchCount, playlistPage: true })
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
        console.log('auth',user.auth)
        dispatch({ type: 'clear' })
        fetchInitialPlaylists()

    }, [user.auth])

    useEffect(() => {
        async function fetchPlaylists() {
        console.log('auth','aldalld')

            await playlistApi.show({ skip: playlistsCount, limit: pageMaxFetchCount, playlistPage: true })
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
