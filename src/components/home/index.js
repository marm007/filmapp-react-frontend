import React, { useEffect, useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { homePageReducer, initialState } from './reducer';

import Film from '../film-row'
import Skeleton from '../../skeletons/film';

import { all } from '../../services/filmService'

import { pageMaxFetchCount, pageInitialMaxFetchCount } from '../../config';

import useBottomScrollListener from '../../hooks/use-bottom-scroll-listener';


function Home() {

    let history = useHistory()

    const [state, dispatch] = useReducer(homePageReducer, initialState)
    const { films, isLoading, isAllLoaded, isInitialLoaded } = state

    const handleOnHomePageData = useCallback(() => {
        if (!isLoading && !isAllLoaded && isInitialLoaded) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllLoaded, isInitialLoaded])

    useBottomScrollListener(handleOnHomePageData, { triggerOnNoScroll: true })

    useEffect(() => {
        async function fetchData() {
            await all({ preview: true, limit: pageInitialMaxFetchCount }).then(res => {
                let response = res.data;

                response.forEach(film => {
                    film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail`

                });

                dispatch({
                    type: 'initial-load',
                    payload: response
                })
            }).catch(err => console.error(err))
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function getAllFilms() {
            await all({ preview: true, skip: films.length, limit: pageMaxFetchCount })
                .then(res => {
                    let response = res.data;

                    response.forEach(film => {
                        film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail`

                    });

                    dispatch({
                        type: 'success',
                        payload: response
                    })
                }).catch(err => console.error(err))
        }
        if (isLoading && isInitialLoaded && films) getAllFilms()
    }, [isLoading, isInitialLoaded, films])

    const handleRedirect = (film) => {
        history.push({ pathname: `${process.env.REACT_APP_PATH_NAME}film/` + film.id, state: { film } });
    };

    return (
        <div className="row mt-5 mx-2" id="homePage">
            {
                films ? films.map((film, index) => <Film key={film.id}
                    film={film} index={index} handleRedirect={() => handleRedirect(film)} />)
                    : ([...Array(20)].map((_, index) => (
                        <Skeleton key={index} />
                    )))
            }

            {
                !isAllLoaded && <div className="fetch-loader d-flex justify-content-center">
                    {
                        (isLoading) &&
                        <div className="spinner-border" />
                    }
                </div>
            }

        </div>
    )
}

export default Home;
