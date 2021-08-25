import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";

import BlurredImageComponent from "../blurredImage";
import PlaylistAddButtonComponent from "../../buttons/updatePlaylist";

import RemoveButton from '../../buttons/remove';

import '../../pages/film/film.css'
import useWindowsWidth from '../../../helpers/hooks/useWindowsWidth';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../helpers/contexts/user/userContext';

import getFilmClass from './helper'
import EditButton from '../../buttons/edit';

const Film = ({ film, index, handleRedirect, handleRemove, isProfile, isRecommendations, isSearch, filmDispatch, children }) => {
    const isSmallScreen = useWindowsWidth((isRecommendations ? 768 : 576))

    const [filmCSS, setFilmCSS] = useState(getFilmClass(isRecommendations, isSearch, isSmallScreen))

    const { user } = useContext(UserContext);


    useEffect(() => {
        setFilmCSS(getFilmClass(isRecommendations, isSearch, isSmallScreen))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSmallScreen])


    return (
        <div className={filmCSS[0]}>

            <div className={filmCSS[1]}>

                <div className={filmCSS[2]}
                    onClick={() => handleRedirect(film.id)}>
                    <div className="play-container">
                        <BlurredImageComponent
                            image={film.img} />
                        <FontAwesomeIcon className="play-middle" icon="play" />
                    </div>
                </div>

                <div className={filmCSS[3]}>

                    <div className={filmCSS[4]}>
                        <div className={`${user.auth ? `${isProfile ? 'button-ripple-div-next-width-2x' : 'button-ripple-div-next-width'}` : 'col-12'} col p-0 pr-2 cursor-pointer`}
                            onClick={() => handleRedirect(film.id)}>

                            <TextTruncate line={1} text={film.title}
                                className={filmCSS[5]} />

                            {children ? children : <div className="mb-0 author-nick">
                                <span>{film.author_name}&nbsp;</span>
                                <span>•&nbsp;</span>
                                <span>{film.views} views</span>
                            </div>
                            }
                        </div>

                        {
                            isProfile ? <>
                                <RemoveButton handleRemove={handleRemove} />
                                <EditButton id={film.id} />
                            </>
                                : user.auth ?
                                    <PlaylistAddButtonComponent
                                        isRecommendations={isRecommendations}
                                        filmDispatch={filmDispatch}
                                        index={index}
                                        filmID={film.id} /> : null
                        }
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Film