import { useHistory, useLocation } from 'react-router-dom'
import queryString from "query-string";

import FilmPreview from './preview'
import FilmsRecommendations from './recommendations';
import Comments from './comments';
import PlaylistContainer from './playlistContainer';

import useWindowWidth from '../../../helpers/hooks/useWindowsWidth'
import FilmProvider from '../../../helpers/contexts/film/filmProvider'

import './film.css'


const Film = (props) => {

    let history = useHistory()
    let location = useLocation()

    const onSmallScreen = useWindowWidth(768);

    const handleRedirect = (id) => {
        const parsed = queryString.parse(location.search);
        let historyObject = { pathname: `${process.env.REACT_APP_PATH_NAME}film/` + id }
        if (parsed.list) historyObject = { ...historyObject, search: `?list=${parsed.list}` }
        history.push(historyObject);
    };

    return (
        <FilmProvider>
            <div className="row p-0 m-0 mt-4 mx-2">
                <div className="col-12 order-first col-sm-12 order-first col-md-8 film-preview-container-px">
                    <FilmPreview {...props} />
                    {!onSmallScreen && <Comments {...props} />}
                </div>
                <div className="col-12 order-2 col-sm-12 order-2 col-md-4 p-0">
                    <PlaylistContainer handleRedirect={handleRedirect} {...props} />
                    <FilmsRecommendations handleRedirect={handleRedirect} {...props} />
                </div>
                {onSmallScreen &&
                    <div className="col-12 order-last col-sm-12 order-sm-last col-md-8 pb-5 container-px">
                        <Comments {...props} />
                    </div>
                }
            </div>

        </FilmProvider>
    )
}

export default Film