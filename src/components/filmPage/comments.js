import React, { useState, useEffect, useReducer, useCallback } from 'react';

import { Button, Col, Dropdown, DropdownButton, Row, Spinner } from "react-bootstrap";

import TextField from '@material-ui/core/TextField';

import * as commentApi from '../../services/commentService'

import useBottomScrollListener from '../../helpers/useBottomScrollListener';
import { initialState } from '../add/add-playlist-menu-reducer';

const commentsMaxFetchCount = 20

const filmCommentsInitialState = {
    comments: [],
    commentsLength: 0,
    isLoading: true,
    isAllFetched: false,
    commentsLoaded: false,
    text: '',
    isAdding: false,
}

function filmCommentsReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'clear': {
            return {
                ...initialState,
                comments: action.payload,
                commentsLength: action.payload.length,
                commentsLoaded: true
            }
        }
        case 'load': {
            return {
                ...state,
                isLoading: true,
                isAllFetched: false
            }
        }
        case 'load-success': {
            const newComments = [...state.comments, ...action.payload]
            return {
                ...state,
                comments: newComments,
                commentsLength: newComments.length,
                isLoading: false,
                isAllFetched: action.payload.length < commentsMaxFetchCount
            }
        }
        case 'add': {
            return {
                ...state,
                isAdding: true
            }
        }
        case 'add-success': {
            return {
                ...state,
                text: '',
                comments: [action.payload, ...state.comments],
                isAdding: false
            }
        }
        default: return state
    }
}

function Comments(props) {

    const [state, dispatch] = useReducer(filmCommentsReducer, filmCommentsInitialState)
    const { comments, commentsLength, isLoading, isAllFetched, commentsLoaded, text, isAdding } = state

    const handleOnCommentsBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && commentsLoaded) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched, commentsLoaded])

    useBottomScrollListener(handleOnCommentsBottom, { triggerOnNoScroll: true })

    useEffect(() => {
        if (props.comments === null) return
        dispatch({
            type: 'clear',
            payload: props.comments
        })
    }, [props.comments])


    useEffect(() => {
        console.log("ccxa")

        async function loadComments() {
            console.log("ds")

            await commentApi.all(props.match.params.id, { skip: commentsLength, limit: commentsMaxFetchCount })
                .then(res => {
                    console.log(res.data)
                    dispatch({
                        type: 'load-success',
                        payload: res.data,
                    })
                })
        }


        if (isLoading && commentsLoaded) loadComments()
    }, [commentsLength, isLoading, commentsLoaded, props.match.params.id])

    const addComment = async () => {

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
                        <Button className="mt-3" variant="primary"
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
                        <Col className="p-0 mt-4" sm={12} key={comment.id}>
                            <Row className="pl-3">

                                <p className="m-0 font-weight-bold">
                                    <small className="m-0 font-weight-bold">{comment.author_name}</small>
                                </p>
                                <p>
                                    <small className="m-0">{displayDate(comment)}</small>
                                </p>
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