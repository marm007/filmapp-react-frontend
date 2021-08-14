import React, { useEffect, useReducer, useCallback, useContext } from 'react';

import { Col, Spinner } from "react-bootstrap";

import * as filmApi from '../../services/filmService'

import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';
import Film from '../../helpers/components/film';
import { recommendationsReducer, recommendationsInitialState } from './reducers/recommendationsReducer'
import { recommendationsMaxFetchCount } from "../../config"
import FilmContext from '../../helpers/contexts/film/filmContext';

function FilmsRecommendations(props) {

    // eslint-disable-next-line no-unused-vars
    const [filmState, filmDispatch] = useContext(FilmContext)

    const [state, dispatch] = useReducer(recommendationsReducer, recommendationsInitialState)

    const { films, isLoading, isAllFetched, isInitialLoaded, id, error } = state

    const handleRecommendationsOnBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && isInitialLoaded && !error && id) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched, isInitialLoaded, error, id])

    useBottomScrollListener(handleRecommendationsOnBottom)

    useEffect(() => {
        async function initialLoad() {
            await filmApi.all({ exclude: props.match.params.id, limit: recommendationsMaxFetchCount })
                .then(res => {
                    let films = res.data;

                    films.forEach(film => {
                        film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail`

                    });

                    dispatch({
                        type: 'initial-success',
                        films: films,
                        id: props.match.params.id
                    })


                })
                .catch(err => console.error(err))
        }

        dispatch({
            type: 'clear'
        })

        if (filmState.isPreviewLoaded) {
            initialLoad()
        }
    }, [props.match.params.id, filmState.isPreviewLoaded])

    useEffect(() => {
        if (filmState.error) {
            dispatch({
                type: 'error',
                payload: filmState.error
            })
        }
    }, [filmState.error])

    useEffect(() => {
        async function fetchData() {
            await filmApi.all({ exclude: id, skip: films.length, limit: recommendationsMaxFetchCount }).then(res => {
                let films = res.data;

                films.forEach(film => {
                    film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail`

                });

                dispatch({
                    type: 'success',
                    payload: films
                })
            })
        }
        if (isLoading && films && id) fetchData()
    }, [isLoading, id, films])

    return (

        <Col>

            {
                films && films.map((film, index) => <Film key={film.id} film={film} index={index} isRecommendations={true} filmDispatch={filmDispatch} handleRedirect={() => props.handleRedirect(film.id)} />)
            }


            {
                !isAllFetched && <div className="fetch-loader d-flex justify-content-center">
                    {(isLoading) && !error && <Spinner animation="border" />}
                </div>
            }
        </Col>
    )
}

export default FilmsRecommendations
