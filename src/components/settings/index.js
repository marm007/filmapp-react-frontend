import { useEffect, useReducer, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../../helpers/contexts/user/userContext";
import { settingsInitialState, settingsReducer } from "./reducer";
import * as userApi from '../../services/userService'
import Modal from "../auth/modal";

const Settings = () => {

    const { user, clearUser, updateUser } = useContext(UserContext)

    let history = useHistory()
    let location = useLocation()

    const [state, dispatch] = useReducer(settingsReducer, settingsInitialState)
    // eslint-disable-next-line no-unused-vars
    const { email, name, password, initialUser, isSubmitted, isSending, isInitialLoaded, success, error } = state


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
            if (password) toUpdate = { password: password }
            if (email && email !== '' && email !== initialUser.email) toUpdate = { ...toUpdate, email: email }
            if (name && name !== '' && name !== initialUser.name) toUpdate = { ...toUpdate, name: name }

            await userApi.partialUpdate(toUpdate)
                .then(res => {
                    dispatch({
                        type: 'success'
                    })

                    setTimeout(() => {
                        let pathname = location.pathname.slice(0, -9)
                        if (pathname === '') pathname = process.env.REACT_APP_PATH_NAME
                        history.replace({
                            pathname: pathname,
                            search: location.search,
                            state: location.state
                        })
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
    }, [email, initialUser.email, initialUser.name, isSending, name, password, history, location, updateUser])


    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch({
            type: 'submit'
        })

        if (password ||
            (email && email !== '' && email !== initialUser.email) ||
            (name && name !== '' && name !== initialUser.name)) {
            dispatch({
                type: 'send'
            })
        }
    }

    const modalClose = () => {
        history.goBack()
    }

    return (
        <Modal id="settingsModal" title="Settings" onClose={modalClose}>
            <form onSubmit={isSending ? null : handleSubmit}>
                <div>
                    <label className="form-label" htmlFor="name">Name</label>
                    <input className="form-control" type="text" name="name"
                        value={name} placeholder={initialUser.name}
                        onChange={e => dispatch({ type: 'field', fieldName: 'name', payload: e.target.value })} />
                </div>
                <div className="mt-2">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email"
                        value={email} placeholder={initialUser.email}
                        onChange={e => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })} />
                </div>
                <div className="mt-2">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password"
                        value={password} onChange={e => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })} />
                </div>
                <div className="d-flex align-items-center mt-2">
                    <button disabled={isSending || !isInitialLoaded} type="submit" className="btn btn-primary">
                        Change
                    </button>

                    {
                        isSending &&
                        <div className="ms-2 spinner-grow" />
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
                success &&
                <div className="alert alert-success mt-2 mb-0">
                    {success}
                </div>
            }
        </Modal>
    )
}

export default Settings