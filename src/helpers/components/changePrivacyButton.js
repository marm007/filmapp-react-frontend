import Col  from "react-bootstrap/Col"
import ButtonBase  from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import * as playlistApi from '../../services/playlistService'

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
        e.stopPropagation()
        if (!isChanging) setIsChanging(true)
    }

    const privacyButton = (
        <ButtonBase
            style={{ marginLeft: 'auto', borderRadius: 20 + "px", width: 24 + "px", height: 24 + "px" }}
            className="m-button"
            onClick={handleChangePrivacy}>
            <FontAwesomeIcon icon={isPublic ? "globe-europe" : "lock"} />
        </ButtonBase>
    )

    return isProfile ?
        (
            <Col className="text-center justify-content-center d-flex align-items-center p-0 flex-grow-0"
            >
                <Col
                    className="remove-holder p-0 m-0 flex-grow-0"
                    style={{ height: '24px', width: '24' }}>
                    {privacyButton}
                </Col>
            </Col>
        ) :
        privacyButton
}

export default ChangePrivacyButton