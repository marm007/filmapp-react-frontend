import React, { useContext, useEffect, useReducer } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Input from '../input'
import { updateInitialState, updateReducer } from "../../reducers/update-reducer";

import { index, partialUpdate } from '../../services/filmService'
import { handleCloseModalWindow } from '../../helpers'
import UpdateContext from '../../contexts/updateModal/updateContext'

const UpdateFilm = () => {

    const { setToUpdate } = useContext(UpdateContext)

    let history = useHistory()
    let { id } = useParams();

    const [{
        update,
        initial,
        isInitialLoaded,
        isSumbitted,
        isSending,
        isError,
        error,
        isSuccess }, dispatch] = useReducer(updateReducer,
            { ...updateInitialState, update: { title: '', description: '' }, initial: { title: '', description: '' } })


    useEffect(() => {
        const getInitialFilm = async () => {
            await index(id)
                .then(res => {
                    dispatch({
                        type: 'initial-success',
                        payload: { title: res.data.title, description: res.data.description }
                    })
                })
                .catch(err => {
                    dispatch({ type: 'error' })
                })
        }

        if (history.location.state && history.location.state.title && history.location.state.description) {
            dispatch({
                type: 'initial-success',
                payload: { title: history.location.state.title, description: history.location.state.description }
            })
        } else {
            getInitialFilm()
        }

    }, [id, history])


    const handleSumbit = (event) => {
        event.preventDefault()
        dispatch({ type: 'submit' })

        if (update.title && update.description) {
            dispatch({ type: 'send' })

            return partialUpdate(id, { title: update.title, description: update.description })
                .then(res => {
                    dispatch({ type: 'success' })

                    setToUpdate(false, res.data)

                    setTimeout(() => handleCloseModalWindow(history, '/update-film'), 500)
                })
                .catch(err => {
                    dispatch({ type: 'error' })
                })
        }
    }

    return (
        <>
            <form onSubmit={isSending ? null : handleSumbit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Input type="text" name="title" value={update.title}
                        isInvalid={isSumbitted && !update.title}
                        onChange={e => dispatch({ type: 'update', fieldName: 'title', payload: e.target.value })}
                    />
                    <div className="invalid-feedback">
                        Title cannot be empty
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Input type="textarea" name="description" value={update.description}
                        isInvalid={isSumbitted && !update.description}
                        onChange={e => dispatch({ type: 'update', fieldName: 'description', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Description cannot be empty
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary"
                        disabled={!isInitialLoaded ||
                            (isInitialLoaded && update.description === initial.description && update.title === initial.title)}
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

        </>
    )
}

export default UpdateFilm