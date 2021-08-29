import React, { useContext, useEffect, useReducer } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Input from '../../models/input'
import Modal from '../../models/modal'
import { updatePlaylistInitialState, updatePlaylistReducer } from './reducer'

import * as playlistApi from '../../../services/playlistService'
import { handleCloseModalWindow } from '../../../helpers'
import UpdateContext from '../../../helpers/contexts/updateModal/updateContext'

const UpdatePlaylist = () => {

    const { setToUpdate } = useContext(UpdateContext)

    let history = useHistory()
    let { id } = useParams();

    const [state, dispatch] = useReducer(updatePlaylistReducer, updatePlaylistInitialState)
    const { title, initialPlaylist, isInitialLoaded,
        isSumbitted, isSending, isError, error, isSuccess } = state


    useEffect(() => {
        const getInitialPlaylist = async () => {
            await playlistApi.index(id)
                .then(res => {

                    dispatch({
                        type: 'initial-success',
                        payload: res.data.title
                    })
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                })
        }
        console.log(history.location.state)

        if (history.location.state && history.location.state.title) {
            dispatch({
                type: 'initial-success',
                payload: history.location.state.title
            })
        } else {
            getInitialPlaylist()
        }

    }, [id, history])

    useEffect(() => {
        const updatePlaylist = async () => {
            await playlistApi.partialUpdate(id, { title })
                .then(res => {
                    dispatch({
                        type: 'success'
                    })

                    setToUpdate(true, res.data)

                    setTimeout(() => handleCloseModalWindow(history, '/update-playlist'), 500)
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                })
        }

        if (isSending) updatePlaylist()
    }, [id, history, isSending, title, setToUpdate])

    const modalClose = () => {
        handleCloseModalWindow(history, '/update-playlist')
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        dispatch({
            type: 'submit'
        })

        if (title) {
            dispatch({
                type: 'send'
            })
        }
    }

    return (
        <Modal id="updatatePlaylistModal" title="Update" onClose={modalClose}>
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
                    <button className="btn btn-primary"
                        disabled={!isInitialLoaded ||
                            (isInitialLoaded && title === initialPlaylist.title)}
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

export default UpdatePlaylist