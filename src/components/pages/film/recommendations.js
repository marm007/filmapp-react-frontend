import React, { useEffect, useReducer, useCallback, useContext } from 'react';

import { recommendationsReducer, recommendationsInitialState } from './reducers/recommendationsReducer'

import Film from '../../helpers/film';

import * as filmApi from '../../../services/filmService'

import { recommendationsMaxFetchCount } from "../../../config"

import useBottomScrollListener from '../../../helpers/hooks/useBottomScrollListener';
import FilmContext from '../../../helpers/contexts/film/filmContext';

import RecommendationsSkeleton from './recommendationsSkeleton'
import FilmSkeleton from '../../helpers/film/skeleton';

import useWindowsWidth from '../../../helpers/hooks/useWindowsWidth';

const FilmsRecommendations = (props) => {

    const isSmallScreen = useWindowsWidth(768);

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
            }).catch(err => console.error(err))
        }
        if (isLoading && films && id) fetchData()
    }, [isLoading, id, films])


    return (

        <div className="row m-0">

            {
                films ? films.map((film, index) => <Film key={film.id} film={film} index={index} isRecommendations={true} filmDispatch={filmDispatch} handleRedirect={() => props.handleRedirect(film.id)} />)
                    : ([...Array(20)].map((_, index) => isSmallScreen ?
                        (<FilmSkeleton key={index} isRecommendations={true} />) :
                        (<RecommendationsSkeleton key={index} />)
                    ))
            }


            {
                !isAllFetched && <div className="fetch-loader d-flex justify-content-center">
                    {(isLoading) && !error && <div className="spinner-border" />}
                </div>
            }
        </div>
    )
}

export default FilmsRecommendations
