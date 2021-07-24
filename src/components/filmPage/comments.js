import React, { useContext, useEffect, useReducer, useCallback } from 'react';

import { Button, Col, Dropdown, DropdownButton, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TextField from '@material-ui/core/TextField';
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";

import * as commentApi from '../../services/commentService'

import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';
import { commentsReducer, commentsInitialState } from './reducers/commentsReducer';
import { commentsMaxFetchCount } from "../../config"
import UserContext from '../../helpers/user/userContext';
import FilmContext from '../../helpers/film/filmContext';
import { displayCommentDate } from '../../helpers';

function Comments(props) {

    const { user } = useContext(UserContext);
    const [filmState, filmDispatch] = useContext(FilmContext)

    const [state, dispatch] = useReducer(commentsReducer, commentsInitialState)
    const { comments, commentsCount, text, isInitialLoaded, isLoading, isAllFetched, isAdding, id, error } = state

    const handleOnCommentsBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && isInitialLoaded && !isAdding && !error && id) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched, isInitialLoaded, isAdding, error, id])

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

            filmDispatch({
                type: 'reset-comments'
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
        if (isLoading && isInitialLoaded && !isAdding && comments && id) loadComments()
    }, [isLoading, isAdding, id, comments, isInitialLoaded])


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

    const handleAddComment = () => {
        if (text) {
            dispatch({
                type: 'add'
            })
        } else {

        }
    }

    const handleRemoveComment = (id) => {

    }

    const sortComments = (e) => {
        let path = '';

        switch (e) {
            case 'commentByDate':
                path = 'date';

                break;
            case 'commentByName':
                path = 'author';
                break;
            default:
                break;
        }

        if (path === '')
            return;


    };


    return (

        <Col>
            <Col className="p-0 mt-4 mb-4" sm={12}>
                <Row>
                    <Col xs={7} sm={5} md={4} className="d-flex align-items-center ">
                        {commentsCount !== null && <span>{commentsCount}{commentsCount === 1 ? ' comment' : ' comments'} </span>}
                    </Col>
                    <Col xs={2} sm={2}>
                        <DropdownButton
                            alignRight
                            variant="secondary"
                            title="Sort"
                            id="dropdown-button-drop-down"
                            onSelect={k => sortComments(k)}>
                            <Dropdown.Item eventKey="commentByDate">By date</Dropdown.Item>
                            <Dropdown.Item eventKey="commentByName">By author name</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
            </Col>
            <Col className="p-0 mb-4" sm={12}>
                <Row>
                    <Col xs={8} sm={10}>
                        <TextField
                            value={text}
                            onChange={e => dispatch({ type: 'field', fieldName: 'text', payload: e.target.value })}
                            type="text"
                            id="standard-multiline-flexible"
                            label="Comment"
                            multiline
                            fullWidth
                            maxrow="4"
                        />
                    </Col>
                    <Col xs={2} sm={2}>
                        <Button disabled={isAdding}
                            className="mt-3" variant="primary"
                            onClick={handleAddComment}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Col>

            {
                isAdding && <div style={{ height: 32 + 'px' }} className="d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>
            }
            {
                comments && comments.map(comment => {
                    return (
                        <Col className="p-0 mt-4 playlist-remove-container" sm={12} key={comment.id}>
                            <Row className="pl-3">

                                <p className="m-0 font-weight-bold">
                                    <small className="m-0 font-weight-bold">{comment.author_name}&nbsp;</small>
                                </p>
                                <p>
                                    <small className="m-0">{displayCommentDate(comment)}</small>
                                </p>
                                {
                                    user.id === comment.author_id &&
                                    <Col
                                        className="playlist-remove-holder p-0 m-0 d-flex justify-content-end"
                                        style={{ height: 24 + 'px', width: 24 + "px" }}>
                                        <ButtonBase
                                            style={{ borderRadius: 20 + "px", width: 24 + "px", height: 24 + "px" }}
                                            className="m-button "
                                            onClick={() => handleRemoveComment(comment.id)}>
                                            <FontAwesomeIcon icon="trash-alt" />
                                        </ButtonBase>
                                    </Col>
                                }
                            </Row>
                            <p>
                                <small>{comment.text}</small>
                            </p>
                        </Col>
                    )
                })


            }

            {
                !isAllFetched && <div style={{ height: 32 + 'px' }} className="d-flex justify-content-center">
                    {(isLoading || !isInitialLoaded) && !error && <Spinner animation="border" />}
                </div>
            }

        </Col>

    )
}

export default Comments