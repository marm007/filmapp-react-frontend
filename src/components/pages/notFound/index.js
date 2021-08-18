import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import error_404 from '../../../images/page-not-found.svg'; // Tell Webpack this JS file uses this image

const NotFound = () => {

    let history = useHistory()
    let location = useLocation()

    useEffect(() => {

        if (location.pathname.includes('login')) history.replace(`${process.env.REACT_APP_PATH_NAME}login`)
    }, [history, location])

    return (
        <div className="col-12 col-sm-12 mt-4 px-4 embed-responsive embed-responsive-16by9">
            <div className="ratio ratio-16x9">
                <img className="embed-responsive-item" src={error_404} alt="" />
            </div>
        </div>
    )
}

export default NotFound;