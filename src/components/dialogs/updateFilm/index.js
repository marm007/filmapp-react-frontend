import React, { useContext, useEffect, useReducer } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Input from '../../models/input'
import Modal from '../../models/modal'
import { updateFilmInitialState, updateFilmReducer } from './reducer'

import * as filmApi from '../../../services/filmService'
import { handleCloseModalWindow } from '../../../helpers'
import UpdateContext from '../../../helpers/contexts/updateModal/updateContext'

const UpdateFilm = () => {

    const { setToUpdate } = useContext(UpdateContext)

    let history = useHistory()
    let { id } = useParams();

    const [state, dispatch] = useReducer(updateFilmReducer, updateFilmInitialState)
    const { title, description, initialFilm, isInitialLoaded,
        isSumbitted, isSending, isError, error, isSuccess } = state


    useEffect(() => {
        const getInitialFilm = async () => {
            await filmApi.index(id)
                .then(res => {
                    dispatch({
                        type: 'initial-success',
                        title: res.data.title,
                        description: res.data.description
                    })
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                })
        }

        if (history.location.state && history.location.state.title &&
            history.location.state.description) {
            dispatch({
                type: 'initial-success',
                title: history.location.state.title,
                description: history.location.state.description
            })
        } else {
            getInitialFilm()
        }

    }, [id, history])

    useEffect(() => {
        const updateFilm = async () => {
            await filmApi.partialUpdate(id, { title, description })
                .then(res => {
                    dispatch({
                        type: 'success'
                    })
                    
                    setToUpdate(false, res.data)

                    setTimeout(() => handleCloseModalWindow(history, '/update-film'), 500)
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                })
        }

        if (isSending) updateFilm()
    }, [description, id, history, isSending, title, setToUpdate])

    const modalClose = () => {
        handleCloseModalWindow(history, '/update-film')
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        dispatch({
            type: 'submit'
        })

        if (title && description) {
            dispatch({
                type: 'send'
            })
        }
    }

    return (
        <Modal id="updatateFilmModal" title="Update" onClose={modalClose}>
            <form onSubmit={isSending ? null : handleSumbit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Input type="text" name="title" value={title}
                        isInvalid={isSumbitted && !title}
                        onChange={e => dispatch({ type: 'field', fieldName: 'title', payload: e.target.value })}
                    />
                    <div className="invalid-feedback">
                        Title cannot be empty
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Input type="textarea" name="description" value={description}
                        isInvalid={isSumbitted && !description}
                        onChange={e => dispatch({ type: 'field', fieldName: 'description', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Description cannot be empty
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary"
                        disabled={!isInitialLoaded ||
                            (isInitialLoaded && description === initialFilm.description && title === initialFilm.title)}
                        type="submit">Save</button>
                    {
                        isSending &&
                        <div className="ml-2 spinner-grow" />
                    }
                </div>
            </form>
            {
                isError && <div className="alert alert-danger mt-2 mb-0">
                    {error ? error : 'Something went wrong'}
                </div>
            }

            {
                isSuccess && <div className="alert alert-success mt-2 mb-0">
                    Changes saved successfully!
                </div>
            }
        </Modal>
    )
}

export default UpdateFilm