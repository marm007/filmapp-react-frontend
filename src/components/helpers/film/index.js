import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";

import BlurredImageComponent from "../blurredImage";
import PlaylistAddButtonComponent from "../playlistAdd";

import RemoveButton from '../../helpers/removeButton';

import '../../pages/film/film.css'

const Film = ({ film, index, handleRedirect, handleRemove, isProfile, isRecommendations, filmDispatch }) => {

    const recommendationsClass = "row mx-0 mb-4"
    const normalClass = "col mb-5 col-12 col-sm-6 col-md-3 col-lg-2"

    return (
        <div className={`${isRecommendations ? recommendationsClass : normalClass}`}>
            <div className={(isRecommendations ? "row p-0 m-0" : "col").concat(" play-outer-container remove-container")}>
                <div className={`${isRecommendations ? 'col-6 col-sm-6' : 'col-12 col-sm-12'} m-0 p-0`} onClick={() => handleRedirect(film.id)}>
                    <div className="embed-responsive embed-responsive-16by9 z-depth-1-half play-container">
                        <BlurredImageComponent
                            image={film.img} />
                        <FontAwesomeIcon className="play-middle" icon="play" />
                    </div>
                </div>
                <div className={`${isRecommendations ? 'col-6 col-sm-6' : 'col-12 col-sm-12 p-0'} m-0`}>
                    <div className="row mx-0 mb-0 mt-1">
                        <div className="col button-ripple-div-next-width p-0 pe-2 cursor-pointer" onClick={() => handleRedirect(film.id)}>
                            <TextTruncate line={1} text={film.title}
                                className="mb-1 mt-1 title " />
                            <div className="mb-0 author-nick">
                                <span>{film.author_name}&nbsp;</span>
                                <span>•&nbsp;</span>
                                <span>{film.views} views</span>
                            </div>
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