import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextTruncate from "react-text-truncate";
import BlurredImageComponent from "../blurredImage";
import RemoveButton from '../../helpers/removeButton';
import ChangePrivacyButton from '../changePrivacyButton';

const Playlist = ({ playlist, handleRedirect, handleRemove, isProfile, dispatchPrivacyUpdate }) => {

    const colWidth = isProfile ? 8 : 10

    const [style, setStyle] = useState("mb-5 play-outer-container remove-container")

    useEffect(() => {
        if (!playlist.film_id) setStyle("mb-5 play-cursor-default remove-container")
    }, [playlist.film_id])


    return (
        <div className="col-12 col-sm-6 col-md-3 col-lg-2"
            key={playlist.id}>
            <div className={`col ${style}`} onClick={() => handleRedirect(playlist.id, playlist.film_id)}>
                <div className="play-container">
                    <BlurredImageComponent
                        image={playlist.img} />

                    <div style={{ width: '100%', margin: 0 }} className="row play-middle">
                        <div className="col-5 col-sm-5" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <FontAwesomeIcon icon="play" />
                        </div>
                        <div className="col-7 col-sm-7" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <small className="fw-bold" >Play all</small>
                        </div>
                    </div>
                </div>

                <div className="row m-0 mt-1">
                    <div className={`p-0 col-${colWidth} col-sm-${colWidth}`}>
                        <TextTruncate line={1} text={playlist.title}
                            className="mb-1 mt-1 title " />
                    </div>


                    {
                        isProfile && <div className="col-4 col-sm-4 p-0 d-flex justify-content-end">
                            <ChangePrivacyButton
                                id={playlist.id}
                                isPublic={playlist.is_public}
                                isProfile={true}
                                dispatchPrivacyUpdate={dispatchPrivacyUpdate} />
                            <RemoveButton handleRemove={handleRemove} />
                        </div>
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