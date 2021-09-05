import React, { useRef, useReducer, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Input from '../input';

import { CHOOSE_FILM, CHOOSE_THUMBNAIL, filmAddInitialState, filmAddReducer } from './reducer';

import { create } from '../../services/filmService'
import UserContext from '../../contexts/user/userContext';

import './style.css'

const FilmAdd = () => {


    const { user, clearUser } = useContext(UserContext)

    let history = useHistory()

    const filmInputRef = useRef(null)
    const thumbnailInputRef = useRef(null)

    const [{ title, description, film, thumbnail, isSubmitted, isSending, isError, error }, dispatch] = useReducer(filmAddReducer, filmAddInitialState)

    useEffect(() => {
        if (!user.auth && user.isInitialLoaded) {
            history.replace(`${process.env.REACT_APP_PATH_NAME}`)
            history.push(`${process.env.REACT_APP_PATH_NAME}login`)
            clearUser()
        }
    }, [user, history, clearUser])

    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch({ type: 'submit' })

        if (!user.auth) {
            history.push(`${process.env.REACT_APP_PATH_NAME}add/login`);
            return;
        }

        if (title && description) {
            dispatch({ type: 'send' })

            let filmData = new FormData();
            filmData.set('title', title);
            filmData.set('description', description);
            filmData.set('film', film.file);
            filmData.set('thumbnail', thumbnail.file);

            await create(filmData)
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
        <div className="row my-4 mx-2 h-100 mx-auto">
            <div className="col col-12 col-md-5">
                <div className="row">
                    <div className="col col-12 mx-auto mb-4">
                        <div>
                            <div className="position-relative justify-content-center d-flex align-items-center text-center box has-advanced-upload">

                                <div className="embed-responsive embed-responsive-16by9 ">
                                    <video muted={true} autoPlay={true} className="embed-responsive-item" loop={true}
                                        src={film.preview ? film.preview : ""}>
                                    </video>
                                </div>

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
                                    <div className="col card-img-overlay film-add-item-opacity" />
                                }

                                {
                                    film.preview &&
                                    <FontAwesomeIcon className="film-add-item-middle fa-3x text-white"
                                        icon="times"
                                        onClick={() => {
                                            dispatch({ type: 'file-clear', isFilm: true })
                                        }} />
                                }

                            </div>
                        </div>
                    </div>
                    <div className="col col-12 mx-auto mb-4 mb-md-0">
                        <div>
                            <div className="position-relative justify-content-center d-flex align-items-center text-center box has-advanced-upload">
                                <div className="embed-responsive embed-responsive-16by9 ">
                                    <img className="embed-responsive-item" alt="" src={thumbnail.preview ? thumbnail.preview : "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="} />
                                </div>
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
                                    <div className="col card-img-overlay film-add-item-opacity" />
                                }

                                {
                                    thumbnail.preview &&
                                    <FontAwesomeIcon className="film-add-item-middle fa-3x text-white" icon="times"
                                        onClick={() => {
                                            dispatch({ type: 'file-clear', isFilm: false })
                                        }} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col col-12 col-md-7 m-0 ml-auto mr-auto mb-4 mb-md-0">
                <div className="mb-3 input-group">
                    <Input placeholder="Title"
                        type="text"
                        isInvalid={isSubmitted && !title}
                        name="title"
                        value={title}
                        onChange={e => dispatch({ type: 'field', fieldName: 'title', payload: e.target.value })} />

                    <div className="invalid-feedback">
                        Title is required
                    </div>
                </div>

                <div className="mb-3" >
                    <Input
                        placeholder="Description"
                        type="textarea"
                        isInvalid={isSubmitted && !description}
                        name="description"
                        value={description}
                        onChange={e => dispatch({ type: 'field', fieldName: 'description', payload: e.target.value })}
                    />
                    <div className="invalid-feedback">
                        Description is required
                    </div>
                </div>

                <div className="col-12 mb-3 p-0">
                    <div className="d-flex align-items-center justify-content-end">
                        {
                            isSending &&
                            <div className="spinner-grow mr-2" />

                        }
                        <button className="btn btn-primary"
                            disabled={isSending || !title || !description}
                            onClick={!isSending ? handleSubmit : null}>
                            Add
                        </button>


                    </div>
                </div>

                {
                    isError &&
                    <div className="alert alert-danger">
                        {error ? error : 'Error while creating film.'}
                    </div>
                }

            </div>
        </div >
    )
}

export default FilmAdd
