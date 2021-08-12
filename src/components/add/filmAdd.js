import './filmAdd.css'

import React, { useRef, useReducer, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Col, Form, FormControl, Row, Ratio, Spinner } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CHOOSE_FILM, CHOOSE_THUMBNAIL, filmAddInitialState, filmAddReducer } from './reducers/filmAddReducer';

import * as filmApi from '../../services/filmService'
import UserContext from '../../helpers/contexts/user/userContext';

function FilmAdd() {


    const { user, clearUser } = useContext(UserContext)

    let history = useHistory()

    const filmInputRef = useRef(null)
    const thumbnailInputRef = useRef(null)

    const [state, dispatch] = useReducer(filmAddReducer, filmAddInitialState)

    const { title, description, film, thumbnail, isSubmitted, isSending, isError, error } = state

    useEffect(() => {
        if (!user.auth && user.isInitialLoaded) {
            history.replace(`${process.env.REACT_APP_PATH_NAME}`)
            history.push(`${process.env.REACT_APP_PATH_NAME}login`)
            clearUser()
        }
    }, [user, history, clearUser])

    useEffect(() => {
        async function sendData() {

            let filmData = new FormData();
            filmData.set('title', title);
            filmData.set('description', description);
            filmData.set('film', film.file);
            filmData.set('thumbnail', thumbnail.file);

            await filmApi.create(filmData)
                .then((res) => {
                    dispatch({ type: 'success' })
                    history.push(`${process.env.REACT_APP_PATH_NAME}film/${res.data.id}`);
                })
                .catch((error) => {
                    let errorMessage = null

                    if (error.response && error.response.data && error.response.data.error) {
                        errorMessage = error.response.data.error
                    } else if (error.response && error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.description)
                            errorMessage = error.response.data.errors.description.message
                        else if (error.response.data.errors.title)
                            errorMessage = error.response.data.errors.title.message
                    }

                    if (error.response.status === 422) {
                        dispatch({ type: 'error-422', payload: errorMessage })
                    } else {
                        dispatch({ type: 'error', payload: errorMessage })
                    }
                })
        }

        if (isSending) sendData()
    }, [description, film.file, history, isSending, thumbnail.file, title])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({ type: 'submit' })

        if (!user.auth) {
            history.push(`${process.env.REACT_APP_PATH_NAME}add/login`);
            return;
        }

        if (title && description) {
            dispatch({ type: 'send' })
        }
    }

    const handleFileChoose = (event, type) => {
        event.preventDefault();

        switch (type) {
            case 'film':
                dispatch({
                    type: 'file-add',
                    isFilm: true,
                    file: filmInputRef.current.files[0],
                    fileName: filmInputRef.current.files[0].name,
                    preview: URL.createObjectURL(event.target.files[0])
                })
                break;

            case 'thumbnail':
                dispatch({
                    type: 'file-add',
                    isFilm: false,
                    file: thumbnailInputRef.current.files[0],
                    fileName: thumbnailInputRef.current.files[0].name,
                    preview: URL.createObjectURL(event.target.files[0])
                })
                break;
            default:
                break;
        }
    }

    return (
        <Row className="mt-4 mx-2" sm={12}>
            <Col className="mb-4" sm={6} lg={5}>

                <Col className="mb-4" xs={12} sm={12} lg={10} >
                    <div className="embed-responsive embed-responsive-16by9 z-depth-1-half">
                        <div
                            className="position-relative justify-content-center d-flex align-items-center embed-responsive-item text-center box has-advanced-upload">


                            <Ratio aspectRatio="16x9">
                                <video muted={true} autoPlay={true} className="embed-responsive-item" loop={true}
                                    src={film.preview ? film.preview : ""}>
                                </video>
                            </Ratio>

                            <input id="film" accept="video/mp4, video/ogg"
                                onChange={event => handleFileChoose(event, 'film')}
                                type="file" ref={filmInputRef} className="inputfile" />
                            <label htmlFor="film" className="position-absolute">
                                {
                                    film.name === CHOOSE_FILM &&
                                    <span>{film.name}</span>
                                }
                            </label>

                            {
                                film.preview &&
                                <Col className="card-img-overlay film-add-item-opacity" />
                            }

                            {
                                film.preview &&
                                <FontAwesomeIcon className="film-add-item-middle fa-3x"
                                    style={{ color: "#ffffff" }} icon="times"
                                    onClick={() => {
                                        dispatch({ type: 'file-clear', isFilm: true })
                                    }} />
                            }

                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} lg={10}>
                    <div
                        className="embed-responsive embed-responsive-16by9 z-depth-1-half">
                        <div
                            className="position-relative justify-content-center d-flex align-items-center embed-responsive-item text-center box has-advanced-upload">
                            <Ratio aspectRatio="16x9">
                                <img alt="" src={thumbnail.preview ? thumbnail.preview : "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="} />
                            </Ratio>
                            <input id="thumbnail" accept="image/jpg, image/png, image/jpeg"
                                onChange={event => handleFileChoose(event, 'thumbnail')}
                                type="file" ref={thumbnailInputRef} className=" inputfile position-absolute" />
                            <label htmlFor="thumbnail" className="position-absolute">

                                {
                                    thumbnail.name === CHOOSE_THUMBNAIL &&
                                    <span>{thumbnail.name}</span>
                                }
                            </label>
                            {
                                thumbnail.preview &&
                                <Col className="card-img-overlay film-add-item-opacity" />
                            }

                            {
                                thumbnail.preview &&
                                <FontAwesomeIcon className="film-add-item-middle fa-3x" style={{ color: "#ffffff" }} icon="times"
                                    onClick={() => {
                                        dispatch({ type: 'file-clear', isFilm: false })
                                    }} />
                            }
                        </div>
                    </div>

                </Col>
            </Col>
            <Col className="mb-2" sm={6} lg={5}>

                <Form.Group className="mb-3" sm={12}>
                    <FormControl
                        placeholder="Title"
                        aria-label="Title"
                        aria-describedby="basic-addon1"
                        isInvalid={isSubmitted && !title}
                        name="title"
                        value={title}
                        onChange={e => dispatch({ type: 'field', fieldName: 'title', payload: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Title is required
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" sm={12}>
                    <FormControl
                        placeholder="Description"
                        as="textarea"
                        aria-label="With textarea"
                        isInvalid={isSubmitted && !description}
                        name="description"
                        value={description}
                        onChange={e => dispatch({ type: 'field', fieldName: 'description', payload: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Description is required
                    </Form.Control.Feedback>
                </Form.Group>

                <Col className="mb-3 p-0 " sm={12}>
                    <Form.Group className="d-flex align-items-center">
                        <Button variant="primary"
                            disabled={isSending || !title || !description}
                            onClick={!isSending ? handleSubmit : null}>
                            {isSending ? 'Loading…' : 'Add'}
                        </Button>

                        {
                            isSending &&
                            <Spinner className="ms-2" animation="grow" />

                        }
                    </Form.Group>
                </Col>

                {
                    isError &&
                    <Alert variant="danger">
                        {error ? error : 'Error while creating film.'}
                    </Alert>
                }

            </Col>


        </Row>
    )
}

export default FilmAdd
