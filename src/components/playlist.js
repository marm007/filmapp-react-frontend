import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";
import BlurredImageComponent from "./blurred-image";
import RemoveButton from './buttons/remove';
import ChangePrivacyButton from './buttons/change-privacy';
import EditButton from './buttons/edit';

const Playlist = ({ playlist, handleRedirect, handleRemove, isProfile, dispatchPrivacyUpdate }) => {

    const [style, setStyle] = useState("mb-4 play-outer-container remove-container")

    useEffect(() => {
        if (!playlist.film_id) setStyle("mb-4 play-cursor-default remove-container")
    }, [playlist.film_id])


    return (
        <div className="col-12 col-sm-6 col-md-3 col-lg-2 container-px"
            key={playlist.id}>
            <div className={`col ${style} p-0`} onClick={() => handleRedirect(playlist.id, playlist.film_id)}>
                <div className="play-container p-0">
                    <BlurredImageComponent
                        image={playlist.img} />

                    <div className="row play-middle w-100 m-0">
                        <div className="col-5 col-sm-5 pr-1 d-flex justify-content-end align-items-center">
                            <FontAwesomeIcon icon="play" />
                        </div>
                        <div className="col-7 col-sm-7 pl-1 d-flex justify-content-start align-items-center">
                            <small className="font-weight-bold" >Play all</small>
                        </div>
                    </div>
                </div>

                <div className="row m-0 mt-1">
                    <div className={`p-0 col ${isProfile ? 'button-ripple-div-next-width-3x' : 'col-12'}`}>
                        <TextTruncate line={1} text={playlist.title}
                            className="mb-1 mt-1 title " />
                    </div>


                    {
                        isProfile && <>
                            <ChangePrivacyButton
                                id={playlist.id}
                                isPublic={playlist.is_public}
                                isProfile={true}
                                dispatchPrivacyUpdate={dispatchPrivacyUpdate} />
                            <RemoveButton handleRemove={handleRemove} />
                            <EditButton isPlaylist={true} id={playlist.id} title={playlist.title} />
                        </>
                    }
                </div>
                <p className="mb-0 author-nick">
                    <span>{playlist.author_name}</span>
                </p>
            </div>
        </div>
    )
}

export default Playlist