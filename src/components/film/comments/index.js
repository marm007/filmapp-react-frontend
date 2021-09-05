/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useReducer, useCallback } from 'react';

import { commentsReducer, commentsInitialState } from './reducer';

import * as commentApi from '../../../services/commentService'
import * as filmApi from '../../../services/filmService'

import { commentsMaxFetchCount } from "../../../config"

import { displayCommentDate } from '../../../helpers';
import useBottomScrollListener from '../../../hooks/use-bottom-scroll-listener';
import UserContext from '../../../contexts/user/userContext';
import FilmContext from '../../../contexts/film/filmContext';
import { useParams } from 'react-router-dom';
import AddComment from './add-comment';
import SortComments from './sort-comments';
import RemoveComment from './remove-comment';

const Comments = () => {

    let { id } = useParams()


    const { user } = useContext(UserContext);

    // eslint-disable-next-line no-unused-vars
    const [filmState, filmDispatch] = useContext(FilmContext)

    const [{
        comments,
        commentsCount,
        isLoading,
        isAllLoaded,
        currentSort,
        error
    }, dispatch] = useReducer(commentsReducer, commentsInitialState)

    const handleOnCommentsBottom = useCallback(() => {
        dispatch({ type: 'load' })
    }, [])

    useBottomScrollListener(handleOnCommentsBottom)

    useEffect(() => {
        if (filmState.error) {
            dispatch({
                type: 'error',
                payload: filmState.error
            })
        }
    }, [filmState.error])

    useEffect(() => {
        const getInitialComments = async () => {
            await filmApi
                .indexDetails(id)
                .then(res => {
                    dispatch({
                        type: 'initial-success',
                        payload: res.data
                    })
                })
                .catch(err => {
                    console.error(err)
                    dispatch({
                        type: 'error',
                        payload: 'Something went wrong!'
                    })
                })
        }

        if (filmState.isPreviewLoaded) getInitialComments()

    }, [id, filmState.isPreviewLoaded])

    useEffect(() => {
        async function loadComments() {

            let params = { skip: comments.length, limit: commentsMaxFetchCount }
            params = currentSort ? { ...params, [currentSort.id]: currentSort.dir } : params

            await commentApi
                .all(id, params)
                .then(res => {
                    dispatch({
                        type: 'load-success',
                        payload: res.data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                })
        }

        if (isLoading && id) loadComments()

    }, [isLoading, comments, currentSort, id])





    return (

        <div className="col p-0">
            <div className="row p-0 mt-4 mb-4">
                <div className="col-7 col-sm-5 col-md-4 d-flex align-items-center ">
                    {commentsCount !== null && <span>{commentsCount}{commentsCount === 1 ? ' comment' : ' comments'} </span>}
                </div>
                <SortComments filmId={id} dispatch={dispatch} />
            </div>

            <AddComment filmId={id} dispatch={dispatch} />

            {
                comments && comments.map(comment => {
                    return (
                        <div className="col col-sm-12 p-0 mt-4 remove-container" key={comment.id}>
                            <div className="d-flex">
                                <p className="m-0 font-weight-bold">
                                    <small className="m-0 font-weight-bold">{comment.author_name}&nbsp;</small>
                                </p>
                                <p >
                                    <small className="m-0">{displayCommentDate(comment)}</small>
                                </p>
                                {
                                    user.id === comment.author_id &&
                                    <RemoveComment id={comment.id} text={comment.text} dispatch={dispatch} />
                                }
                            </div>
                            <p className="d-block d-sm-block">
                                <small>{comment.text}</small>
                            </p>
                        </div>
                    )
                })
            }

            {
                !isAllLoaded && <div className="fetch-loader d-flex justify-content-center">
                    {(isLoading) && !error && <div className="spinner-border" />}
                </div>
            }

        </div>

    )
}

export default Comments