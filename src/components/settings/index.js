import { Modal, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useEffect, useState, useReducer, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../../helpers/contexts/user/userContext";
import { settingsInitialState, settingsReducer } from "./reducer";
import * as userApi from '../../services/userService'

const Settings = (props) => {

    const { user, clearUser, updateUser } = useContext(UserContext)

    let history = useHistory()
    let location = useLocation()

    const [state, dispatch] = useReducer(settingsReducer, settingsInitialState)
    // eslint-disable-next-line no-unused-vars
    const { email, name, password, initialUser, isSubmitted, isSending, isInitialLoaded, success, error } = state

    const [show, setShow] = useState(true)

    useEffect(() => {
        if (!user.auth && user.isInitialLoaded) {
            setShow(false)
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

    const modalClose = () => {
        setShow(false)
        history.goBack();
    };

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

    return (
        <Modal onHide={modalClose}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={isSending ? null : handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control type="text" name="email"
                            value={name} placeholder={initialUser.name}
                            onChange={e => dispatch({ type: 'field', fieldName: 'name', payload: e.target.value })}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control type="email" name="email"
                            value={email} placeholder={initialUser.email}
                            onChange={e => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" name="password"
                            value={password} onChange={e => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center mt-2">
                        <Button disabled={isSending || !isInitialLoaded} type="submit" className="btn-primary">
                            Change
                        </Button>

                        {
                            isSending &&
                            <Spinner className="ms-2" animation="grow" />
                        }
                    </Form.Group>
                </Form>
                {
                    error &&
                    <Alert variant="danger" className="mt-2 mb-0">
                        {error ? error : 'Error while logging in.'}
                    </Alert>
                }
                {
                    success &&
                    <Alert variant="success" className="mt-2 mb-0">
                        {success}
                    </Alert>
                }
            </Modal.Body>
        </Modal>
    )
}

export default Settings