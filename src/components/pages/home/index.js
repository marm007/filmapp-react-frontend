import React, { useEffect, useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Spinner } from 'react-bootstrap';

import { homePageReducer, initialState } from './reducer';

import Film from '../../film'
import FilmSkeleton from '../../film/skeleton';

import * as filmApi from '../../../services/filmService'

import { pageMaxFetchCount, pageInitialMaxFetchCount } from '../../../config';

import { jsxLoop } from '../../../helpers';
import useBottomScrollListener from '../../../helpers/hooks/useBottomScrollListener';



function Home(props) {

    let history = useHistory()

    const [state, dispatch] = useReducer(homePageReducer, initialState)
    const { films, isLoading, isAllFetched, isInitialLoaded } = state


    const handleOnHomePageData = useCallback(() => {
        if (!isLoading && !isAllFetched && isInitialLoaded) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched, isInitialLoaded])

    useBottomScrollListener(handleOnHomePageData, { triggerOnNoScroll: true })

    useEffect(() => {
        async function fetchData() {
            await filmApi.all({ limit: pageInitialMaxFetchCount }).then(res => {
                let response = res.data;

                response.forEach(film => {
                    film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail`

                });

                dispatch({
                    type: 'initial-load',
                    payload: response
                })
            })
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function getAllFilms() {
            await filmApi.all({ skip: films.length, limit: pageMaxFetchCount })
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

    const handleRedirect = (id) => {
        history.push({ pathname: `${process.env.REACT_APP_PATH_NAME}film/` + id });
    };

  

    return (
        <Row className="mt-5 mx-2">
            {
                films ? films.map((film, index) => <Film key={film.id} film={film} index={index} handleRedirect={handleRedirect} />)
                    : [...jsxLoop(20, i =>
                        <FilmSkeleton key={i} />
                    )]
            }

            {
                !isAllFetched && <div className="fetch-loader d-flex justify-content-center">
                    {
                        (isLoading) &&
                        <Spinner animation="border" />
                    }
                </div>
            }

        </Row>
    )
}

export default Home;