
import { useContext } from "react"
import UserContext from "../../../contexts/user/userContext"
import { partialUpdate } from "../../../services/playlistService"
import RemoveButton from "../../buttons/remove"

export default function RemoveFilm({ playlist, filmId, dispatch }) {

    const { user } = useContext(UserContext)

    async function handleRemoveFilm() {
        await partialUpdate(playlist.id, { films_id: [filmId], is_remove_films: true })
            .then(res => {
                dispatch({ type: 'remove-film-success', payload: filmId })
            })
            .catch(err => {
                console.error(err)
            })
    }


    return (

        user.id === playlist.author_id ?
            <div style={{ width: '24px' }} className="p-0 d-flex align-items-center justify-content-center">
                <RemoveButton handleRemove={handleRemoveFilm} />
            </div> : null

    )

}