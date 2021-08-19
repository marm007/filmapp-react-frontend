/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useReducer, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { commentsReducer, commentsInitialState } from './reducers/commentsReducer';

import * as commentApi from '../../../services/commentService'

import { commentsMaxFetchCount } from "../../../config"

import { displayCommentDate } from '../../../helpers';
import useBottomScrollListener from '../../../helpers/hooks/useBottomScrollListener';
import UserContext from '../../../helpers/contexts/user/userContext';
import FilmContext from '../../../helpers/contexts/film/filmContext';
import RemoveModalContext from '../../../helpers/contexts/removeModal/removeModalContext';
import RippleButton from '../../helpers/rippleButton';

const Comments = (props) => {

    const { showModal, clear, removeModalData } = useContext(RemoveModalContext)

    const { user } = useContext(UserContext);

    const [filmState, filmDispatch] = useContext(FilmContext)

    const [state, dispatch] = useReducer(commentsReducer, commentsInitialState)
    const {
        comments,
        commentsCount,
        text,
        isInitialLoaded,
        isLoading,
        isAllFetched,
        isAdding,
        id,
        isRemoving,
        toRemove,
        isSorting,
        sort,
        sorts,
        error
    } = state

    const handleOnCommentsBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && isInitialLoaded && !isAdding && !error && id && !isSorting) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched, isInitialLoaded, isAdding, error, id, isSorting])

    useBottomScrollListener(handleOnCommentsBottom)

    useEffect(() => {
        dispatch({
            type: 'clear',
            id: props.match.params.id
        })
    }, [props.match.params.id])

    useEffect(() => {
        if (filmState.error) {
            dispatch({
                type: 'error',
                payload: filmState.error
            })
        }
    }, [filmState.error])

    useEffect(() => {
        function getCommentsFromContext() {
            dispatch({
                type: 'initial-success',
                comments: filmState.comments,
                commentsCount: filmState.commentsCount,
            })
        }

        if (filmState.comments && filmState.commentsCount !== null) getCommentsFromContext()
    }, [filmState.comments, filmState.commentsCount, filmDispatch])

    useEffect(() => {
        async function loadComments() {
            await commentApi.all(id, { skip: comments.length, limit: commentsMaxFetchCount })
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
        async function loadSortedComments() {
            await commentApi.sort(id, { [sort.id]: sort.dir, skip: comments.length, limit: commentsMaxFetchCount })
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
        if (isLoading && isInitialLoaded && !isAdding &&
            comments && id && !isSorting) {
            if (!sort)
                loadComments()
            else
                loadSortedComments()
        }
    }, [isLoading, isAdding, id, comments, isInitialLoaded, isSorting, sort])


    useEffect(() => {
        const addComment = async () => {
            const comment = { text: text }

            await commentApi.create(id, comment)
                .then(res => {
                    dispatch({
                        type: 'add-success',
                        payload: res.data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: 'error',
                        payload: err.response.status
                    })
                })
        };
        if (isAdding && !isLoading && id) addComment()
    }, [isAdding, isLoading, id, text])

    useEffect(() => {
        async function removeComment() {
            await commentApi.remove(toRemove.id)
                .then(res => {
                    dispatch({ type: 'remove-success' })
                    clear()
                })
                .catch(err => {
                    clear()
                    console.error(err)
                })
        }

        if (isRemoving && toRemove && removeModalData.isRemoving &&
            removeModalData.id === toRemove.id && removeModalData.type === 'comment' &&
            removeModalData.title === toRemove.text.substring(0, 10).concat('...')) removeComment()
    }, [isRemoving, toRemove, clear, removeModalData])

    useEffect(() => {
        async function sortComments() {
            const sortParams = sort ? { [sort.id]: sort.dir, limit: commentsMaxFetchCount } : {}

            await commentApi.sort(id, sortParams)
                .then(res => {
                    dispatch({ type: 'sort-success', payload: res.data })
                })
                .catch(err => {
                    dispatch({ type: 'error', payload: 'Sort error.' })
                    console.error(err)
                })
        }
        if (isSorting) sortComments()
    }, [isSorting, sort, id])

    const handleAddComment = () => {
        dispatch({
            type: 'add'
        })
    }

    const handleRemoveComment = (comment) => {
        if (removeModalData.isRemoving) return
        dispatch({ type: 'remove', payload: comment })
        showModal(comment.id, 'comment', comment.text.substring(0, 10).concat('...'))
    }

    const handleSortComments = (e, id) => {
        e.preventDefault()

        let sortToChange = null

        switch (id) {
            case 'created_at':
                sortToChange = sorts[0]

                break;
            case 'author_name':
                sortToChange = sorts[1]
                break;
            default:
                return;
        }

        let tmpSort = null

        if (sort && sort.id === sortToChange.id) {
            sortToChange.dir *= -1
            tmpSort = sortToChange
            if (sortToChange.dir === 1) {
                tmpSort = null
            }
        } else {
            tmpSort = sortToChange
        }

        dispatch({
            type: 'sort',
            sortToChange: sortToChange,
            sort: tmpSort
        })

    };


    return (

        <div className="col">
            <div className="row p-0 mt-4 mb-4">
                <div className="col-7 col-sm-5 col-md-4 d-flex align-items-center ">
                    {commentsCount !== null && <span>{commentsCount}{commentsCount === 1 ? ' comment' : ' comments'} </span>}
                </div>
                <div className="dropdown col-2 col-sm-2">
                    <button className="btn btn-secondary dropdown-toggle" id="sortDropDown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Sort
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="#sortDropDown">
                        {
                            sorts.map(sortTmp => {
                                return (
                                    <li key={sortTmp.id} onClick={e => handleSortComments(e, sortTmp.id)}>
                                        <a className={`dropdown-item${(sort && sortTmp.id === sort.id) ? ' active' : ''}`} href="#" role="button">
                                            {sortTmp.title}
                                            {sort && sort.id === sortTmp.id && sortTmp.dir === 1 ?
                                                <FontAwesomeIcon className="ms-2" icon="sort-up" /> :
                                                sort && sort.id === sortTmp.id && sortTmp.dir === -1 ?
                                                    <FontAwesomeIcon className="ms-2" icon="sort-down" /> : ""}
                                        </a></li>);
                            })
                        }

                    </ul>
                </div>
            </div>
            <form onSubmit={(text && !isAdding) ? handleAddComment : null}>
                <div id="fiordur">
                    <input type="text" className="form-input" placeholder="Comment" value={text}
                        onChange={e => dispatch({ type: 'field', fieldName: 'text', payload: e.target.value })}
                    />
                </div>
                <div className="col d-flex justify-content-end" >
                    <button disabled={isAdding || !text}
                        type="submit"
                        className="btn btn-primary mt-3">
                        Submit
                    </button>
                </div>
            </form>

            {
                isAdding && <div style={{ height: 32 + 'px' }} className="d-flex justify-content-center">
                    <div className="spinner-border" />
                </div>
            }
            {
                comments && comments.map(comment => {
                    return (
                        <div className="col col-sm-12 p-0 mt-4 remove-container" key={comment.id}>
                            <div className="d-flex">
                                <p className="m-0 fw-bold">
                                    <small className="m-0 fw-bold">{comment.author_name}&nbsp;</small>
                                </p>
                                <p >
                                    <small className="m-0">{displayCommentDate(comment)}</small>
                                </p>
                                {
                                    user.id === comment.author_id &&

                                    <RippleButton className="m-button cursor-pointer button-ripple-24 d-flex justify-content-center align-items-center remove-holder p-0 m-0 ms-auto"
                                        onClick={() => handleRemoveComment(comment)}>
                                        <FontAwesomeIcon icon="trash-alt" />

                                    </RippleButton>
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
                !isAllFetched && <div className="fetch-loader d-flex justify-content-center">
                    {(isLoading || isSorting) && !error && <div className="spinner-border" />}
                </div>
            }

        </div>

    )
}

export default Comments