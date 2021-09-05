import React, { useEffect, useReducer, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/user/userContext";
import { updateInitialState, updateReducer } from "../../reducers/update-reducer";
import * as userApi from '../../services/userService'
import Input from "../input";
import { handleCloseModalWindow } from "../../helpers";

const Settings = () => {

    const { user, clearUser, updateUser } = useContext(UserContext)

    let history = useHistory()

    const [{
        update,
        initial,
        isSubmitted,
        isSending,
        isInitialLoaded,
        success,
        isSuccess,
        error }, dispatch] = useReducer(updateReducer, updateInitialState)


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
                        payload: { name: res.data.name, email: res.data.email, password: '' }
                    })
                })
                .catch(err => {
                    console.error(err)
                    dispatch({ type: 'error' })
                })
        }
        getUser()
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch({ type: 'submit' })

        if ((update.password && update?.password.length >= 6) ||
            update.email ||
            update.name) {
            dispatch({ type: 'send' })

            let toUpdate = {}
            if (update.password && update?.password.length > 6) toUpdate = { password: update.password }
            if (update.email) toUpdate = { ...toUpdate, email: update.email }
            if (update.name) toUpdate = { ...toUpdate, name: update.name }

            return userApi.partialUpdate(toUpdate)
                .then(res => {
                    dispatch({ type: 'success' })

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
    }


    return (
        <>
            <form onSubmit={isSending ? null : handleSubmit}>
                <div>
                    <label className="form-label" htmlFor="name">Name</label>
                    <Input type="text" name="name"
                        value={update?.name}
                        isInvalid={isSubmitted && !update.name}
                        onChange={e => dispatch({ type: 'update', fieldName: 'name', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Name cannot be empty
                    </div>
                </div>
                <div className="mt-2 form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <Input type="email" name="email"
                        value={update?.email}
                        isInvalid={isSubmitted && !update.email}
                        onChange={e => dispatch({ type: 'update', fieldName: 'email', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Email cannot be empty
                    </div>
                </div>
                <div className="mt-2 form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <Input type="password" name="password" isInvalid={isSubmitted && (update.password && update.password.length < 6)}
                        value={update?.password} onChange={e => dispatch({ type: 'update', fieldName: 'password', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Password must be at least 6 characters long!
                    </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <button type="submit" className="btn btn-primary"
                        disabled={isSending || !isInitialLoaded ||
                            (isInitialLoaded && update?.email === initial?.email && update?.name === initial?.name &&
                                (!update.password || (update.password && update.password.length < 6)))}
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
        </>
    )
}

export default Settings