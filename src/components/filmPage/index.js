import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import FilmPreview from './filmPreview'
import { Row, Col } from "react-bootstrap";
import FilmsRecommendations from './filmsRecommendations';
import Comments from './comments';
import Playlist from './playlist';
import useWindowWidth from '../../helpers/useWindowsWidth'
import queryString from "query-string";

function Film(props) {
    let location = useLocation()
    let history = useHistory()

    const onSmallScreen = useWindowWidth();

    const [comments, setComments] = useState([])
    const [playerHeight, setPlayerHeight] = useState(null)

    const handleRedirect = (id) => {
        const parsed = queryString.parse(location.search);
        let historyObject = { pathname: `${process.env.REACT_APP_PATH_NAME}film/` + id }
        if (parsed.list) historyObject = { ...historyObject, search: `?list=${parsed.list}` }
        history.push(historyObject);
    };

    const handleFilmsComments = (comments) => {
        setComments(comments)
    }

    const handlePlayerHeight = (height) => {
        setPlayerHeight(height)
    }

    return (
        <React.Fragment>
            <Row className="p-0 m-0 mt-4">
                <Col xs={{ span: 12, order: 'first' }} sm={8}>
                    <FilmPreview 
                        onPlayerHeightChange={handlePlayerHeight}
                        onCommentsChange={handleFilmsComments} {...props} />
                    {!onSmallScreen && <Comments comments={comments} {...props} />}
                </Col>
                <Col xs={{ span: 12, order: 2 }} sm={4}>
                    <Playlist handleRedirect={handleRedirect} playerHeight={playerHeight} {...props} />
                    <FilmsRecommendations handleRedirect={handleRedirect} {...props} />
                </Col>
                {onSmallScreen &&
                    <Col xs={{ span: 12, order: 'last' }} sm={8}>
                        <Comments comments={comments} {...props} />
                    </Col>
                }
            </Row>

        </React.Fragment>
    )
}

export default Film