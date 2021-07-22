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

function Comments(props) {

    const { user } = useContext(UserContext);

    const [state, dispatch] = useReducer(commentsReducer, commentsInitialState)
    const { comments, commentsLength, isLoading, isAllFetched, commentsLoaded, text, isAdding, error } = state

    const handleOnCommentsBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && commentsLoaded && !error) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched, commentsLoaded, error])

    useBottomScrollListener(handleOnCommentsBottom, { triggerOnNoScroll: true })

    useEffect(() => {
        if (props.comments === null) return

        dispatch({
            type: 'clear',
            payload: props.comments
        })
    }, [props.comments])

    useEffect(() => {
        async function loadComments() {
            await commentApi.all(props.match.params.id, { skip: commentsLength, limit: commentsMaxFetchCount })
                .then(res => {
                    dispatch({
                        type: 'load-success',
                        payload: res.data,
                    })
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                })
        }


        if (isLoading && commentsLoaded) loadComments()
    }, [commentsLength, isLoading, commentsLoaded, props.match.params.id])

    const addComment = async () => {
        if (!user.auth) {

            return
        }

        if (isAdding) return
        const comment = { text: text }

        dispatch({
            type: 'add',
        })

        await commentApi.create(props.match.params.id, comment)
            .then(res => {
                dispatch({
                    type: 'add-success',
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'error'
                })
                console.error(err)
            })
    };

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

    const displayDate = (comment) => {
        let date = new Date(Date.parse(comment.createdAt));
        let time = (('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
            + ('0' + date.getFullYear()).slice(-2)
            + ' o ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2))
        return time;
    };

    const handleRemoveComment = (id) => {

    }

    return (

        <Col>

            <Col className="p-0" sm={12}>
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

                            onClick={() => addComment()}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Col>
            <Col className="p-0 mt-4 mb-4" sm={12}>
                <Row>
                    <Col xs={7} sm={5} md={4}>
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
                                    <small className="m-0 font-weight-bold">{comment.author_name}</small>
                                </p>
                                <p>
                                    <small className="m-0">{displayDate(comment)}</small>
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
                                            {
                                                <FontAwesomeIcon icon="trash-alt" />
                                            }
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
                    {(isLoading) && <Spinner animation="border" />}
                </div>
            }

        </Col>

    )
}

export default Comments