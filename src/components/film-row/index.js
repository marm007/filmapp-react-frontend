import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";

import BlurredImageComponent from "../blurred-image";

import PlaylistAddButtonComponent from "../buttons/update-playlist";
import RemoveButton from '../buttons/remove';
import EditButton from '../buttons/edit';

import UserContext from '../../contexts/user/userContext';

import './style.css'

const Film = ({ film, index, handleRedirect, handleRemove, isProfile, isRecommendations, filmDispatch, children }) => {

    const { user } = useContext(UserContext);

    return (
        <div className={`col-12 ${isRecommendations ? 'col-sm-12' : 'col-sm-6'} col-md-3 col-lg-2 mb-4 container-px`}>

            <div className={`col play-outer-container remove-container p-0`}>

                <div className={`col-12 col-sm-12 p-0`}
                    onClick={() => handleRedirect()}>
                    <div className="play-container">
                        <BlurredImageComponent
                            image={film.img} />
                        <FontAwesomeIcon className="play-middle" icon="play" />
                    </div>
                </div>

                <div className={`col-12 col-sm-12 p-0`}>
                    <div className={`row mx-0 mb-0 mt-1`}>
                        <div className={`${user.auth ? `${isProfile ? 'button-ripple-div-next-width-2x' : 'button-ripple-div-next-width'}` : 'col-12'} col p-0 pr-2 cursor-pointer`}
                            onClick={() => handleRedirect()}>

                            <TextTruncate line={1} text={film.title}
                                className={`mb-1 mt-1 title`} />

                            {children ? children : <div className="mb-0 author-nick">
                                <span>{film.author_name}&nbsp;</span>
                                <span>•&nbsp;</span>
                                <span>{film.views} views</span>
                            </div>
                            }
                        </div>
                        <div className={`${user.auth ? `${isProfile ? 'click-under-buttons-container-x2' : 'click-under-buttons-container'}` : 'click-under-buttons-container'}`}>
                            {
                                isProfile ? <>
                                    <RemoveButton handleRemove={handleRemove} />
                                    <EditButton id={film.id} title={film.title} description={film.description} />
                                </>
                                    : user.auth ?
                                        <PlaylistAddButtonComponent
                                            isRecommendations={isRecommendations}
                                            filmDispatch={filmDispatch}
                                            index={index}
                                            filmID={film.id} /> : null
                            }
                            <div className="col col-12 m-0 p-0 click-under-buttons"
                                onClick={() => handleRedirect()}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Film