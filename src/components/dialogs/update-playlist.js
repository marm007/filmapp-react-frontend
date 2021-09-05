import React, { useContext, useEffect, useReducer } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Input from '../input'
import { updateInitialState, updateReducer } from "../../reducers/update-reducer";

import { index, partialUpdate } from '../../services/playlistService'
import { handleCloseModalWindow } from '../../helpers'
import UpdateContext from '../../contexts/updateModal/updateContext'

const UpdatePlaylist = () => {

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
            { ...updateInitialState, update: { title: '' }, initial: { title: '' } })


    useEffect(() => {
        const getInitialPlaylist = async () => {

            await index(id)
                .then(res => {
                    dispatch({
                        type: 'initial-success',
                        payload: { title: res.data.title }
                    })
                })
                .catch(err => {
                    dispatch({ type: 'error' })
                })
        }

        if (history.location.state && history.location.state.title) {
            dispatch({
                type: 'initial-success',
                payload: { title: history.location.state.title }
            })
        } else {
            getInitialPlaylist()
        }

    }, [id, history])


    const handleSumbit = (event) => {
        event.preventDefault()
        dispatch({ type: 'submit' })

        if (update.title) {
            dispatch({ type: 'send' })

            return partialUpdate(id, { title: update.title })
                .then(res => {
                    dispatch({ type: 'success' })

                    setToUpdate(true, res.data)

                    setTimeout(() => handleCloseModalWindow(history, '/update-playlist'), 500)
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
                    <button className="btn btn-primary"
                        disabled={!isInitialLoaded ||
                            (isInitialLoaded && update.title === initial.title)}
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

export default UpdatePlaylist