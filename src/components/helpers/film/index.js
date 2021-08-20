import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";

import BlurredImageComponent from "../blurredImage";
import PlaylistAddButtonComponent from "../playlistAdd";

import RemoveButton from '../../helpers/removeButton';

import '../../pages/film/film.css'
import useWindowsWidth from '../../../helpers/hooks/useWindowsWidth';
import { useContext } from 'react';
import UserContext from '../../../helpers/contexts/user/userContext';

const Film = ({ film, index, handleRedirect, handleRemove, isProfile, isRecommendations, isSearch, filmDispatch, children }) => {

    const { user } = useContext(UserContext);

    const isSmallScreen = useWindowsWidth((isRecommendations ? 768 : 576))

    const flag = isRecommendations || isSearch

    return (
        <div className={`${(flag && !isSmallScreen) ?
            `${isSearch ? 'col-12 col-lg-8' : 'row'} mx-0 mb-4` :
            `${isRecommendations ? 'col-sm-12' : 'col-sm-6'} mb-5 col-12 col-md-3 col-lg-2`}`}>
            <div className={`${(flag && !isSmallScreen) ?
                'row p-0 m-0' : 'col'} play-outer-container remove-container`}>
                <div className={`${(flag && !isSmallScreen) ?
                    `${isSearch ? 'col-sm-4' : ''} col-6` : 'col-12 col-sm-12'} m-0 p-0`}
                    onClick={() => handleRedirect(film.id)}>
                    <div className="play-container">
                        <BlurredImageComponent
                            image={film.img} />
                        <FontAwesomeIcon className="play-middle" icon="play" />
                    </div>
                </div>
                <div className={`${(flag && !isSmallScreen) ?
                    `${isSearch ? 'col-sm-8' : ''} col-6 ` : 'col-12 col-sm-12 p-0'} m-0`}>
                    <div className="row mx-0 mb-0 mt-1">
                        <div className={`${user.auth ? 'button-ripple-div-next-width' : 'col-12'} col p-0 pe-2 cursor-pointer`}
                            onClick={() => handleRedirect(film.id)}>

                            {children ? children : <>
                                <TextTruncate line={1} text={film.title}
                                    className="mb-1 mt-1 title " />
                                <div className="mb-0 author-nick">
                                    <span>{film.author_name}&nbsp;</span>
                                    <span>•&nbsp;</span>
                                    <span>{film.views} views</span>
                                </div>
                            </>
                            }
                        </div>

                        {
                            isProfile ?
                                <RemoveButton handleRemove={handleRemove} /> :
                                user.auth ?
                                    <PlaylistAddButtonComponent
                                        isRecommendations={isRecommendations}
                                        filmDispatch={filmDispatch}
                                        index={index}
                                        filmID={film.id} /> : null
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Film