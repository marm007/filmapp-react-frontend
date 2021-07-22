import React, { useEffect, useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Spinner } from 'react-bootstrap';

import { initialProfileState, profileReducer } from './reducer';
import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';

import Film from '../../helpers/components/film';
import Playlist from '../../helpers/components/playlist';

import * as userApi from '../../services/userService'
import * as playlistApi from '../../services/playlistService'
import * as filmApi from '../../services/filmService'

import image_not_found from '../../images/image_not_found.png'; // Tell Webpack this JS file uses this image

const Profile = (props) => {

    let history = useHistory()

    const [state, dispatch] = useReducer(profileReducer, initialProfileState)
    const { data, isLoading, isAllFetched, error, filmsCount, playlistsCount } = state

    const handleProfileOnBottom = useCallback(() => {
        if (!isLoading && !isAllFetched) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched])

    useBottomScrollListener(handleProfileOnBottom, { triggerOnNoScroll: true })

    useEffect(() => {
        async function handleGetAllData() {
            const [response] = await Promise.allSettled([
                userApi.me({ skipFilms: filmsCount, skipPlaylists: playlistsCount, limit: 12 })
            ])

            let data = []

            let films = []
            let playlists = []

            if (response.status === "fulfilled") {
                films = response.value.data.films.map(film => {
                    return {
                        ...film,
                        img: `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=preview`,

                    }
                })

                playlists = response.value.data.playlists.map(playlist => {
                    const image = playlist.film_id ?
                        `${process.env.REACT_APP_API_URL}films/${playlist.film_id}/thumbnail?width=preview` :
                        image_not_found
                    return {
                        ...playlist,
                        img: image,
                        isPlaylist: true

                    }
                })

                data = [...data, ...films, ...playlists]
            }

            dispatch({
                type: 'success',
                data: data,
                filmsCount: films.length,
                playlistsCount: playlists.length,
            })
        }

        if (isLoading) handleGetAllData()
    })

    const handleRemove = (e, id, isPlaylist) => {
        e.stopPropagation()

        async function removePlaylist() {
            try {
                const resPlaylist = await playlistApi.remove(id)
                if (resPlaylist.status === 204) {
                    dispatch({
                        type: 'field',
                        fieldName: 'data',
                        payload: data.filter(resource => resource.id !== id)
                    })
                }
            } catch (err) {
                console.error(err)

            }
        }

        async function removeFilm() {
            try {
                const resFilm = await filmApi.remove(id)
                if (resFilm.status === 204) {
                    dispatch({
                        type: 'field',
                        fieldName: 'data',
                        payload: data.filter(resource => resource.id !== id)
                    })
                    /* const playlistsToReload = data.filter(resource => resource.isPlaylist && resource.film_id === id)
                    let requests = []
                    playlistsToReload.foreach(playlist => {
                        requests.push(playlistApi.index(playlist.id, {reload: true}))
                    })
                    
                    const results = await Promise.allSettled(requests)
                    for(let i = 0; i < data.length; i++) {

                    }
                    results.forEach(result => {
                        data.map(resource => {
                            if(resource.id === reuslt.id)
                        })
                    })
                    const resReload = await userApi.me */
                }
            } catch (err) {
                console.error(err)

            }
        }
        if (isPlaylist) removePlaylist()
        else removeFilm()
    };


    const handleRedirectFilm = (id) => {
        history.push({ pathname: `${process.env.REACT_APP_PATH_NAME}film/` + id });
    }

    const handleRedirectPlaylist = (record) => {
        if (!record.film_id) return
        history.push({
            pathname: `${process.env.REACT_APP_PATH_NAME}film/` + record.film_id,
            search: `?list=${record.id}`
        });
    }



    return (
        <Row className="mt-5 mx-2">
            {
                data.map((record, index) => {
                    if (record.isPlaylist) {
                        return <Playlist key={record.id} isProfile={true}
                            playlist={record} index={index}
                            handleRedirect={() => handleRedirectPlaylist(record)}
                            handleRemove={(e) => handleRemove(e, record.id, record.isPlaylist)} />
                    } else {
                        return <Film key={record.id} isProfile={true}
                            film={record} index={index}
                            handleRedirect={() => handleRedirectFilm(record.id)}
                            handleRemove={(e) => handleRemove(e, record.id, record.isPlaylist)} />
                    }
                })
            }
            {
                !isAllFetched && <div style={{ height: 32 + 'px', width: '100%' }} className="d-flex justify-content-center">
                    {isLoading && <Spinner animation="border" />}
                </div>
            }
        </Row>
    )
}


export default Profile
