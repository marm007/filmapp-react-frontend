import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { like } from "../../../services/filmService"
import { me } from "../../../services/userService"
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export default function RateFilm({ filmId, data }) {


    let history = useHistory()

    const [isRating, setIsRating] = useState(false)

    const [rateData, setRateData] = useState({ likes: '', dislikes: '', isLiked: false, isDisliked: false })


    useEffect(() => {
        setRateData(data)
    }, [data])

    async function handleRateClick(action) {
        if (action === null || isRating) return

        setIsRating(true)

        try {
            const likeResult = await like(filmId, { action })

            const userResult = await me({ details: true })
            const details = userResult.data.details
            const isLiked = details.liked.indexOf(filmId) > -1
            const isDisliked = details.disliked.indexOf(filmId) > -1

            setRateData({ isLiked, isDisliked, likes: likeResult.data.likes, dislikes: likeResult.data.dislikes })
            setIsRating(false)

        } catch (err) {
            console.error(err)
            setIsRating(false)
            if (err.response && err.response.status === 401) {
                history.push(`${history.location.pathname}/login`);
            }
        }
    }


    return (
        <>
            <div className="col-4 col-sm-4 text-right d-flex justify-content-end">
                <p className={`${rateData.isLiked ? 'film-picked-thumb-color' : ''} cursor-pointer noselect`}
                    onClick={() => handleRateClick('like')}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    &ensp;{rateData.likes}
                </p>
            </div>
            <div className="col-4 col-sm-4 d-flex justify-content-start">
                <p className={`${rateData.isDisliked ? 'film-picked-thumb-color' : ''} cursor-pointer noselect`}
                    onClick={() => handleRateClick('dislike')}>
                    <FontAwesomeIcon icon={faThumbsDown} />
                    &ensp;{rateData.dislikes}
                </p>
            </div>
        </>
    )
}