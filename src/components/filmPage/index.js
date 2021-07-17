import React, {useReducer } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from "query-string";

import FilmPreview from './preview'
import { Row, Col } from "react-bootstrap";
import FilmsRecommendations from './recommendations';
import Comments from './comments';
import Playlist from './playlist';
import useWindowWidth from '../../helpers/useWindowsWidth'

import FilmDispatch from './filmDispatch'
import './film.css'

const filmInitialState = {
    comments: null,
    playerHeight: null,
    reloadPlaylist: false
}

const filmReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        default:
            return state
    }
}

function Film(props) {
    
    let history = useHistory()
    let location = useLocation()

    const [state, dispatch] = useReducer(filmReducer, filmInitialState)

    const onSmallScreen = useWindowWidth();


    const handleRedirect = (id) => {
        const parsed = queryString.parse(location.search);
        let historyObject = { pathname: `${process.env.REACT_APP_PATH_NAME}film/` + id }
        if (parsed.list) historyObject = { ...historyObject, search: `?list=${parsed.list}` }
        history.push(historyObject);
    };

    return (
        <FilmDispatch.Provider value={dispatch}>
            <Row className="p-0 m-0 mt-4">
                <Col xs={{ span: 12, order: 'first' }} sm={8}>
                    <FilmPreview {...props} />
                    {!onSmallScreen && <Comments comments={state.comments} {...props} />}
                </Col>
                <Col xs={{ span: 12, order: 2 }} sm={4}>
                    <Playlist reloadPlaylist={state.reloadPlaylist} handleRedirect={handleRedirect} playerHeight={state.playerHeight} {...props} />
                    <FilmsRecommendations handleRedirect={handleRedirect} {...props} />
                </Col>
                {onSmallScreen &&
                    <Col xs={{ span: 12, order: 'last' }} sm={8}>
                        <Comments comments={state.comments} {...props} />
                    </Col>
                }
            </Row>

        </FilmDispatch.Provider>
    )
}

export default Film