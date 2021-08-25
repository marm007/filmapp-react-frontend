import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import * as playlistApi from '../../../services/playlistService'
import RippleButton from "../ripple"

const ChangePrivacyButton = ({ isPublic, id, isProfile, dispatchPrivacyUpdate, filmDispatch }) => {

    const [isChanging, setIsChanging] = useState(false)


    useEffect(() => {
        async function changePrivacy() {
            await playlistApi.partialUpdate(id, { is_public: !isPublic })
                .then(res => {
                    setIsChanging(false)

                    dispatchPrivacyUpdate({
                        type: 'change-playlist-privacy-success',
                        payload: res.data
                    })

                    if (filmDispatch !== undefined) {
                        filmDispatch({
                            type: 'field',
                            fieldName: 'reloadPlaylist',
                            payload: true
                        })
                    }
                })
                .catch(err => {
                    console.error(err)
                    setIsChanging(false)
                })
        }
        if (isChanging) changePrivacy()
    }, [dispatchPrivacyUpdate, isChanging, isPublic, id, filmDispatch])

    const handleChangePrivacy = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isChanging) setIsChanging(true)
    }


    return <RippleButton
        className="button-ripple-24 remove-holder p-0"
        onClick={handleChangePrivacy}>
        <FontAwesomeIcon icon={isPublic ? "globe-europe" : "lock"} />
    </RippleButton>
}

export default ChangePrivacyButton