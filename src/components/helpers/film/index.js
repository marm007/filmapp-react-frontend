import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";

import BlurredImageComponent from "../blurredImage";
import PlaylistAddButtonComponent from "../playlistAdd";

import RemoveButton from '../../helpers/removeButton';

import '../../pages/film/film.css'
import useWindowsWidth from '../../../helpers/hooks/useWindowsWidth';

const Film = ({ film, index, handleRedirect, handleRemove, isProfile, isRecommendations, isSearch, filmDispatch, children }) => {

    const isSmallScreen = useWindowsWidth((isRecommendations ? 768 : 576))

    const recommendationsClass = "row mx-0 mb-4"

    return (
        <div className={`${((isRecommendations || isSearch) && !isSmallScreen) ? recommendationsClass :  `${(isRecommendations && isSmallScreen) ? 'col-sm-12' :'col-sm-6'}  mb-5 col-12 col-md-3 col-lg-2`}`}>
            <div className={(((isRecommendations || isSearch) && !isSmallScreen) ? "row p-0 m-0" : "col").concat(" play-outer-container remove-container")}>
                <div className={`${((isRecommendations || isSearch) && !isSmallScreen) ? `col-6 ${isSearch ? 'col-sm-4' : ''}` : 'col-12 col-sm-12'} m-0 p-0`}
                    onClick={() => handleRedirect(film.id)}>
                    <div className="embed-responsive embed-responsive-16by9 z-depth-1-half play-container">
                        <BlurredImageComponent
                            image={film.img} />
                        <FontAwesomeIcon className="play-middle" icon="play" />
                    </div>
                </div>
                <div className={`${((isRecommendations || isSearch) && !isSmallScreen) ? `col-6 ${isSearch ? 'col-sm-8' : ''}` : 'col-12 col-sm-12 p-0'} m-0`}>
                    <div className="row mx-0 mb-0 mt-1">
                        <div className="col button-ripple-div-next-width p-0 pe-2 cursor-pointer" onClick={() => handleRedirect(film.id)}>

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
                                <PlaylistAddButtonComponent
                                    isRecommendations={isRecommendations}
                                    filmDispatch={filmDispatch}
                                    index={index}
                                    filmID={film.id} />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Film