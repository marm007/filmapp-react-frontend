import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Col, Ratio } from "react-bootstrap";

import error_404 from '../../images/page-not-found.svg'; // Tell Webpack this JS file uses this image

function NotFound() {

    let history = useHistory()
    let location = useLocation()

    useEffect(() => {

        if (location.pathname.includes('login')) history.replace(`${process.env.REACT_APP_PATH_NAME}login`)
    }, [history, location])
    
    return (
        <Col xs={12} sm={12} className="mt-4 px-4 embed-responsive embed-responsive-16by9">
            <Ratio aspectRatio="16x9">
                <img className="embed-responsive-item" src={error_404} alt="" />
            </Ratio>
        </Col>
    )
}

export default NotFound;