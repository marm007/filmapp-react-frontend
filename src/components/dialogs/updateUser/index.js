import React, { useEffect, useReducer, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../../../helpers/contexts/user/userContext";
import { settingsInitialState, settingsReducer } from "./reducer";
import * as userApi from '../../../services/userService'
import Modal from "../../models/modal";
import Input from "../../models/input";
import { handleCloseModalWindow } from "../../../helpers";

const Settings = () => {

    const { user, clearUser, updateUser } = useContext(UserContext)

    let history = useHistory()
    let location = useLocation()

    const [state, dispatch] = useReducer(settingsReducer, settingsInitialState)
    // eslint-disable-next-line no-unused-vars
    const { email, name, password, initialUser, isSubmitted, isSending, isInitialLoaded, success, isSuccess, error } = state


    useEffect(() => {
        if (!user.auth && user.isInitialLoaded) {
            history.replace(`${process.env.REACT_APP_PATH_NAME}`)
            history.push(`${process.env.REACT_APP_PATH_NAME}login`)
            clearUser()
        }
    }, [user, history, clearUser])

    useEffect(() => {
        async function getUser() {
            await userApi.me()
                .then(res => {
                    dispatch({
                        type: 'initial-success',
                        name: res.data.name,
                        email: res.data.email
                    })
                })
                .catch(err => {
                    console.error(err)
                    dispatch({
                        type: 'error',
                        payload: true
                    })
                })
        }
        getUser()
    }, [])

    useEffect(() => {
        async function updateUserData() {
            let toUpdate = {}
            if (password && password.length > 6) toUpdate = { password: password }
            if (email) toUpdate = { ...toUpdate, email: email }
            if (name) toUpdate = { ...toUpdate, name: name }

            await userApi.partialUpdate(toUpdate)
                .then(res => {
                    dispatch({
                        type: 'success'
                    })

                    setTimeout(() => {
                        handleCloseModalWindow(history, '/settings')
                        updateUser(res.data.accessToken)
                    }, 500)
                })
                .catch(err => {
                    console.error(err)
                    dispatch({
                        type: 'error',
                        payload: err.response && err.response.data && err.response.data.error ? err.response.data.error : 'Something went wrong!'
                    })
                })
        }
        if (isSending) updateUserData()
    }, [email, isSending, name, password, history, location, updateUser])


    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch({
            type: 'submit'
        })

        if ((password && password.length >= 6) ||
            email ||
            name) {
            dispatch({
                type: 'send'
            })
        }
    }

    const modalClose = () => {
        handleCloseModalWindow(history, '/settings')
    }

    return (
        <Modal id="settingsModal" title="Settings" onClose={modalClose}>
            <form onSubmit={isSending ? null : handleSubmit}>
                <div>
                    <label className="form-label" htmlFor="name">Name</label>
                    <Input type="text" name="name"
                        value={name}
                        isInvalid={isSubmitted && !name}
                        onChange={e => dispatch({ type: 'field', fieldName: 'name', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Name cannot be empty
                    </div>
                </div>
                <div className="mt-2 form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <Input type="email" name="email"
                        value={email}
                        isInvalid={isSubmitted && !email}
                        onChange={e => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Email cannot be empty
                    </div>
                </div>
                <div className="mt-2 form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <Input type="password" name="password" isInvalid={isSubmitted && (password && password.length < 6)}
                        value={password} onChange={e => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Password must be at least 6 characters long!
                    </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <button type="submit" className="btn btn-primary"
                        disabled={isSending || !isInitialLoaded ||
                            (isInitialLoaded && email === initialUser.email && name === initialUser.name &&
                                (!password || (password && password.length < 6)))}
                    >
                        Change
                    </button>

                    {
                        isSending &&
                        <div className="ml-2 spinner-grow" />
                    }
                </div>
            </form>
            {
                error &&
                <div className="alert alert-danger mt-2 mb-0">
                    {error ? error : 'Error while logging in.'}
                </div>
            }
            {
                isSuccess &&
                <div className="alert alert-success mt-2 mb-0">
                    {success}
                </div>
            }
        </Modal>
    )
}

export default Settings