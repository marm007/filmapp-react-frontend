import React, { useEffect, useReducer, useCallback, useContext } from 'react';

import { recommendationsReducer, recommendationsInitialState } from './reducer'

import Film from '../../film-row';
import FilmSkeleton from '../../film-row/skeleton';

import * as filmApi from '../../../services/filmService'

import { recommendationsMaxFetchCount } from "../../../config"

import useBottomScrollListener from '../../../hooks/use-bottom-scroll-listener';
import FilmContext from '../../../contexts/film/filmContext';

import RecommendationsSkeleton from '../recommendationsSkeleton'

import useWindowsWidth from '../../../hooks/use-window-width';
import { useParams } from 'react-router-dom';

const FilmsRecommendations = ({ handleRedirect }) => {

    let { id } = useParams()

    const isSmallScreen = useWindowsWidth(768);

    // eslint-disable-next-line no-unused-vars
    const [filmState, filmDispatch] = useContext(FilmContext)

    const [{ films, isLoading, isAllLoaded, error }, dispatch] = useReducer(recommendationsReducer, recommendationsInitialState)


    const handleRecommendationsOnBottom = useCallback(() => {
        dispatch({ type: 'load' })
    }, [])

    useBottomScrollListener(handleRecommendationsOnBottom)

    useEffect(() => {
        async function initialLoad() {
            await filmApi.all({ exclude: id, limit: recommendationsMaxFetchCount, preview: true })
                .then(res => {
                    let films = res.data;

                    films.forEach(film => {
                        film.img = `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail`

                    });

                    dispatch({
                        type: 'initial-success',
                        payload: films
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
    }, [id, filmState.isPreviewLoaded])

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
            await filmApi.all({ exclude: id, skip: films.length, limit: recommendationsMaxFetchCount, preview: true }).then(res => {
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
                films ? films.map((film, index) => <Film key={film.id} film={film}
                    index={index} isRecommendations={true} filmDispatch={filmDispatch}
                    handleRedirect={() => handleRedirect(film)} />)
                    : ([...Array(20)].map((_, index) => isSmallScreen ?
                        (<FilmSkeleton key={index} isRecommendations={true} />) :
                        (<RecommendationsSkeleton key={index} />)
                    ))
            }


            {
                !isAllLoaded && <div className="fetch-loader d-flex justify-content-center">
                    {(isLoading) && !error && <div className="spinner-border" />}
                </div>
            }
        </div>
    )
}

export default FilmsRecommendations
