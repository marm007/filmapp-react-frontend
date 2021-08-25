import React, { useEffect, useReducer } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Input from '../../models/input'
import Modal from '../../models/modal'
import { updateFilmInitialState, updateFilmReducer } from './reducer'

import * as filmApi from '../../../services/filmService'

const UpdateFilm = () => {
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

        getInitialFilm()

    }, [id, history])

    useEffect(() => {
        const updateFilm = async () => {
            await filmApi.update(id, { title, description })
                .then(res => {
                    dispatch({
                        type: 'success'
                    })

                    setTimeout(() => history.goBack(), 500)
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                })
        }

        if (isSending) updateFilm()
    }, [description, id, history, isSending, title])

    const modalClose = () => {
        history.goBack()
    }

    const handleSumbit = (e) => {
        e.preventDefautl()
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
            <form onSubmit={isSending ? handleSumbit : null}>
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