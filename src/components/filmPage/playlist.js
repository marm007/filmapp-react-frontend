import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from "query-string";

import ScrollBar from 'react-perfect-scrollbar'
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import TextTruncate from "react-text-truncate";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

import '../Playlist/PlaylistComponent.css';

import * as playlistApi from '../../services/playlistService'

function Playlist(props) {

    let location = useLocation()

    const headerRef = useCallback(node => {
        if (node !== null) { setHeaderHeight(node.getBoundingClientRect().height); }
    }, [])

    const [isPlaylistOwner, setIsPlaylistOwner] = useState(null)
    const [playlist, setPlaylist] = useState(null)
    const [currentFilm, setCurrentFilm] = useState(null)
    const [currentFilmIndex, setCurrentFilmIndex] = useState(0)

    const [headerHeight, setHeaderHeight] = useState(null)
    const [playerHeight, setPlayerHeight] = useState(null)

    useEffect(() => {
        setPlayerHeight(props.playerHeight)
    }, [props.playerHeight])

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if (!parsed.list) {
            clearPlaylist()
            return
        }

        async function handleGetPlaylist() {
            await playlistApi.index(parsed.list).then(res => {

                let change = false

                Array.prototype.forEach.call(res.data.films, (film, index) => {
                    if (film.id === props.match.params.id) {
                        setCurrentFilm(film.id)
                        setCurrentFilmIndex(index + 1)
                        change = true
                    }
                })

                if (!change) {
                    setCurrentFilm(null)
                    setCurrentFilmIndex(0)
                }

                setPlaylist(res.data)
            }).catch(err => {
                clearPlaylist()
            })
        }
        handleGetPlaylist()
    }, [props.match.params.id, location.search])


    const clearPlaylist = () => {
        setPlaylist(null)
        setPlayerHeight(null)
        setCurrentFilm(null)
        setCurrentFilmIndex(0)
    }
    return (

        playlist && playerHeight &&
        <Col className='mb-4'>
            <Col ref={headerRef}
                style={{ height: headerHeight + 'px' }}
                className="playlist-remove-container pt-2 pb-2 playlist-header" sm={12}>
                <Row className="m-0 p-0 px-2">
                    <Col className="m-0 p-0" xs={10} sm={10}>
                        <p className="mb-1">{playlist.title}</p>
                        <small>{playlist.author_name}</small>
                        <small
                            className="playlist-index">- {currentFilmIndex}/{playlist.films.length}</small>
                    </Col>
                    {
                        isPlaylistOwner &&
                        <Col
                            style={{ height: 24 + 'px', width: 24 + "px" }}
                            xs={2} sm={2} className={
                                "playlist-remove-holder m-0 p-0 text-center justify-content-center d-flex align-items-center center-vertically my-center-vertically"}
                            onClick={() => this.handleRemovePlaylist()}>
                            <ButtonBase
                                style={{ borderRadius: 20 + "px", width: 24 + "px", height: 24 + "px" }}
                                className="m-button" >
                                {
                                    <FontAwesomeIcon icon="trash-alt" />
                                }
                            </ButtonBase>
                        </Col>
                    }
                </Row>
            </Col>
            <Col style={{ height: playerHeight - headerHeight + 'px' }}
                className="p-0 playlist-container" xs={12} sm={12}>
                <PerfectScrollbar
                    onYReachEnd={() => { }}
                    onScrollY={() => { }}>
                    {
                        playlist.films.map((film, index) => {
                            return (
                                <Row xs={12} sm={12} className="m-0 p-0 playlist-remove-container" key={film.id}>
                                    <Col xs={10} sm={10}
                                        className={index === playlist.films.length - 1 ?
                                            "mt-3 mb-3" :
                                            "mt-3"}
                                        onClick={() => props.handleRedirect(film.id)}
                                    >
                                        <Row className="film-play-outer-container">
                                            <Col
                                                className="text-center justify-content-center d-flex align-items-center p-0 pl-1"
                                                xs={1} sm={1}>
                                                {
                                                    (currentFilm === film.id) ?
                                                        <small><FontAwesomeIcon style={{ fontWeight: 300 }}
                                                            icon="play" /></small>
                                                        :
                                                        <small>{index + 1}</small>

                                                }
                                            </Col>
                                            <Col className="pr-2 pl-2" xs={6} sm={6}>
                                                <div
                                                    className="embed-responsive embed-responsive-16by9 z-depth-1-half film-play-container">
                                                    <img alt="" className="embed-responsive-item film-play-image"
                                                        src={`${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`} />
                                                    <FontAwesomeIcon className="film-play-middle" icon="play" />
                                                </div>
                                            </Col>
                                            <Col xs={5} sm={5} className="p-0">
                                                <TextTruncate line={2} text={film.title}
                                                    className="mb-0 title font-weight-bold" />
                                                <p className="mb-1 author-nick">
                                                    <small>{film.author_name}</small>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {
                                        isPlaylistOwner &&
                                        <Col xs={2} sm={2}
                                            className={index === playlist.films.length - 1 ?
                                                "mt-3 mb-3 text-center justify-content-center d-flex align-items-center" :
                                                "mt-3 text-center justify-content-center d-flex align-items-center"}>
                                            <Col
                                                className="playlist-remove-holder p-0 m-0"
                                                style={{ height: 24 + 'px', width: 24 + "px" }}>
                                                <ButtonBase
                                                    style={{ borderRadius: 20 + "px", width: 24 + "px", height: 24 + "px" }}
                                                    className="m-button "
                                                    onClick={() => this.handleRemoveFromPlaylist(index, film.id)}>
                                                    {
                                                        <FontAwesomeIcon icon="trash-alt" />
                                                    }
                                                </ButtonBase>
                                            </Col>
                                        </Col>
                                    }

                                </Row>
                            )
                        })
                    }
                </PerfectScrollbar>

            </Col>

        </Col>


    )
}


export default Playlist
