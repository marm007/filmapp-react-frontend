import React, { useState, useReducer, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import * as authApi from '../../services/authService'
import { authInitialState, authReducer } from './reducer';
import UserContext from '../../helpers/contexts/user/userContext'

function Register(props) {

    let history = useHistory()

    const { login } = useContext(UserContext)
    const [state, dispatch] = useReducer(authReducer, authInitialState)
    const { email, nick, password, isSubmitted, isSuccess, isSending, isError, error } = state

    const [show, setShow] = useState(true)

    useEffect(() => {
        async function submitData() {

            await authApi.register({ email: email, password: password, name: nick })
                .then(res => {
                    dispatch({
                        type: 'success'
                    })
                    setTimeout(() => {
                        login(res.data.user.name, res.data.user.id, res.data.token, res.data.refreshToken)
                        history.goBack()
                    }, 1500)
                })
                .catch(err => {
                    let errorMessage = null;

                    if (err.response && err.response.data && err.response.data.errors)
                        errorMessage = err.response.data.errors;
                    else if (err.response && err.response.data && err.response.data.error)
                        errorMessage = err.response.data.error

                    dispatch({
                        type: 'error',
                        payload: errorMessage
                    })
                    console.error(err)
                })
        }

        if (isSending) submitData()

    }, [isSending, email, nick, password, history, login])

    const handleSubmit = (e) => {
        e.preventDefault();


        dispatch({
            type: 'submit'
        })

        if (email && nick && password && password.length >= 6) {
            dispatch({
                type: 'send'
            })
        }
    }

    const modalClose = () => {
        setShow(false)
        history.goBack();
    };


    return (

        <Modal
            onHide={modalClose}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Register
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="nick">Nick</Form.Label>
                        <Form.Control isInvalid={isSubmitted && !nick} type="text" name="nick" value={nick}
                            onChange={e => dispatch({ type: 'field', fieldName: 'nick', payload: e.target.value })} >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Nick is required
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            isInvalid={(isSubmitted && !email)}
                            type="email" name="email" value={email} onChange={e => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })} >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Email is required
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control isInvalid={isSubmitted && (password.length < 6)} type="password"
                            name="password" value={password} maxLength="11"
                            onChange={e => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {
                                password.length === 0 ? "Password is required" : "Password too short (min 6 chars)"
                            }

                        </Form.Control.Feedback>
                    </Form.Group>

                    {
                        isSuccess &&
                        <Alert variant="success" className="mt-2">
                            You have successfully registered and logged in.
                        </Alert>
                    }

                    {
                        isError &&
                        <Alert variant="danger" className="mt-2">
                            {error ? error : 'Error while registtering.'}
                        </Alert>
                    }

                    <Form.Group className="d-flex align-items-center mt-2">
                        <Button type="submit" className="btn-primary">
                            Register
                        </Button>

                        {
                            isSending &&
                            <Spinner className="ms-2" animation="grow" />
                        }
                    </Form.Group>

                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={modalClose}>Close</Button>
            </Modal.Footer>


        </Modal>
    );
}

export default Register