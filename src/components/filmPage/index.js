import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from "query-string";

import FilmPreview from './preview'
import { Row, Col } from "react-bootstrap";
import FilmsRecommendations from './recommendations';
import Comments from './comments';
import PlaylistContainer from './playlistContainer';
import useWindowWidth from '../../helpers/hooks/useWindowsWidth'

import FilmProvider from '../../helpers/contexts/film/filmProvider'
import './film.css'


function Film(props) {

    let history = useHistory()
    let location = useLocation()

    const onSmallScreen = useWindowWidth();

    const handleRedirect = (id) => {
        const parsed = queryString.parse(location.search);
        let historyObject = { pathname: `${process.env.REACT_APP_PATH_NAME}film/` + id }
        if (parsed.list) historyObject = { ...historyObject, search: `?list=${parsed.list}` }
        history.push(historyObject);
    };

    return (
        <FilmProvider>
            <Row className="p-0 m-0 mt-4 mx-2">
                <Col xs={{ span: 12, order: 'first' }} sm={8}>
                    <FilmPreview {...props} />
                    {!onSmallScreen && <Comments {...props} />}
                </Col>
                <Col xs={{ span: 12, order: 2 }} sm={4}>
                    <PlaylistContainer handleRedirect={handleRedirect} {...props} />
                    <FilmsRecommendations handleRedirect={handleRedirect} {...props} />
                </Col>
                {onSmallScreen &&
                    <Col xs={{ span: 12, order: 'last' }} sm={8}>
                        <Comments {...props} />
                    </Col>
                }
            </Row>

        </FilmProvider>
    )
}

export default Film