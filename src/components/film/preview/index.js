import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Player } from 'video-react';

import { view, index } from '../../../services/filmService'
import { me } from '../../../services/userService'

import FilmContext from '../../../contexts/film/filmContext'
import UserContext from '../../../contexts/user/userContext';
import RateFilm from './rate-film';
import Description from './description';

import "../../../../node_modules/video-react/dist/video-react.css";
import 'core-js/modules/esnext.promise.all-settled'


const FilmPreview = () => {

    let history = useHistory()
    let { id } = useParams()

    const { user } = useContext(UserContext)

    // eslint-disable-next-line no-unused-vars
    const [filmState, filmDispatch] = useContext(FilmContext)

    const [film, setFilm] = useState({
        img: '',
        video: '',
        film: '',
        title: '',
        views: '',
        description: `\r\n\n\n`,
    })

    const [rateData, setRateData] = useState({
        likes: '',
        dislikes: '',
        isLiked: false,
        isDisliked: false
    })

    const playerRef = useCallback(node => {
        if (node !== null) {
            filmDispatch({
                type: 'field',
                fieldName: 'playerHeight',
                payload: node.getBoundingClientRect().height
            })
            setPlayerNode(node)
        }
    }, [filmDispatch])



    const [playerNode, setPlayerNode] = useState(null);


    useEffect(() => {
        if (playerNode) {

            const measure = () => {
                filmDispatch({
                    type: 'field',
                    fieldName: 'playerHeight',
                    payload: playerNode.getBoundingClientRect().height
                })
            }

            window.addEventListener("resize", measure);

            return () => window.removeEventListener("resize", measure);
        }
    }, [playerNode, filmDispatch]);

    useEffect(() => {
        async function handleGetFilm() {

            let requests = [view(id), index(id)]
            if (user.auth) requests.push(me({ details: true }))
            const [filmViewResponse, filmResponse, userResponse] = await Promise.allSettled(requests);

            if (filmResponse.status === "rejected" || filmViewResponse.status === "rejected") {

                filmDispatch({
                    type: 'field',
                    fieldName: 'error',
                    payload: true
                })

                document.title = `FilmApp`

                return
            }

            const filmData = filmResponse.value.data

            filmDispatch({
                type: 'success'
            })

            const film = {
                ...filmData,
                img: `${process.env.REACT_APP_API_URL}films/${filmData.id}/thumbnail?width=poster`,
                video: `${process.env.REACT_APP_API_URL}films/${filmData.id}/video`,
                views: filmViewResponse.value.data.views
            }

            let isLiked = false
            let isDisliked = false

            if (userResponse && userResponse.status === "fulfilled") {
                const details = userResponse.value.data.details
                isLiked = details.liked.indexOf(id) > -1
                isDisliked = details.disliked.indexOf(id) > -1
            }

            setRateData({ isLiked, isDisliked, likes: film.likes, dislikes: film.dislikes })
            setFilm(film)
            document.title = `${film.title} - FilmApp`
        }
        handleGetFilm()
    }, [id, filmDispatch, user.auth, history.location.state])




    return (

        <div className="p-0">
            <div className="col-12 col-sm-12 preview-margins p-0">
                <div ref={playerRef}>
                    <Player
                        playsInline
                        poster={film.img}
                        src={film.video} />
                </div>
            </div>
            {
                film &&
                <div className="px-0">
                    <div className="col-12 col-sm-12 mt-4 p-0">
                        <div className="row p-0 m-0">
                            <div className="col-12 col-sm-12 p-0">
                                {!film.title && <p className="font-weight-bold"><br /></p>}
                                <p className="font-weight-bold">{film.title}</p>
                            </div>
                            <div className="col-4 col-sm-4 p-0">
                                <p><FontAwesomeIcon icon={faEye} /> &ensp;{film.views}</p>
                            </div>

                            <RateFilm filmId={id} data={rateData} />

                            <div className="col-12 col-sm-12 mt-4 mb-4 divider" />

                            <Description description={film.description} />

                        </div>
                    </div>
                    <div className="col-12 col-sm-12 mt-4 mb-2 divider p-0" />
                </div>
            }
        </div>


    )
}


export default FilmPreview
