import React, { useState, useEffect, useContext, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import { Alert, Button, Col, Form, Modal, Spinner } from 'react-bootstrap';

import * as authApi from '../../services/authService'

import UserContext from '../../helpers/contexts/user/userContext'
import { authInitialState, authReducer } from './reducer';

function Login(props) {

    const { login } = useContext(UserContext);

    let history = useHistory()
    let location = useLocation()

    const [state, dispatch] = useReducer(authReducer, authInitialState)
    const { email, password, isSubmitted, isSending, isError, error } = state
    const [show, setShow] = useState(true)

    useEffect(() => {
        async function sendData() {
            await authApi.login({ email, password })
                .then(res => {
                    login(res.data.user.name, res.data.user.id, res.data.token, res.data.refreshToken)
                    //history.replace(location.pathname.slice(0, -6))

                    let pathname = location.pathname.slice(0, -6)
                    if (pathname === '') pathname = process.env.REACT_APP_PATH_NAME

                    history.replace({
                        pathname: pathname,
                        search: location.search,
                        state: location.state
                    })

                    //if (!location.state) {
                    // history.goBack();
                    //} else {
                    //   history.replace(location.state.from)
                    //}
                })
                .catch(err => {
                    let errorMessage = null;

                    if (err.response && err.response.data && err.response.data.errors)
                        errorMessage = err.response.data.errors;

                    dispatch({
                        type: 'error',
                        payload: errorMessage
                    })

                    console.error(err)
                })
        }
        if (isSending) sendData()
    }, [isSending, email, password, history, location, login])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({ type: 'submit' })

        if (email && password) {
            dispatch({ type: 'send' })
        }
    }

    const handleForgotPassword = () => {
        history.goBack();

        setTimeout(function () {
            history.push(`${location.pathname.slice(0, -5)}forgot${location.search}`);
        }, 500);
    };

    const modalClose = () => {
        setShow(false)
        if (!location.state) {
            history.goBack();
        } else {
            history.push(process.env.REACT_APP_PATH_NAME)
        }
    };

    const handleRegister = () => {
        history.goBack();

        setTimeout(function () {
            history.push(`${location.pathname.slice(0, -5)}register${location.search}`);
        }, 500);
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
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={isSending ? null : handleSubmit}>

                    <Form.Group>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control isInvalid={isSubmitted && !email} type="email" name="email" value={email}
                            onChange={e => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Email is required
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control isInvalid={isSubmitted && !password} type="password" name="password"
                            value={password} onChange={e => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Password is required
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="d-flex align-items-center mt-2">
                        <Button  disabled={isSending} type="submit" className="btn-primary">
                            Login
                        </Button>

                        {
                            isSending &&
                            <Spinner className="ms-2" animation="grow" />
                        }
                    </Form.Group>

                </Form>

                {
                    isError &&
                    <Alert variant="danger" className="mt-2 mb-0">
                        {error ? error : 'Error while logging in.'}
                    </Alert>
                }

                <Button variant="link" onClick={handleRegister} className="p-0 mt-2 btn btn-link">Register</Button>

                <Col className="p-0 m-0 " xs={12} sm={12}>
                    <Button variant="link" onClick={handleForgotPassword} className="p-0 mt-2 btn btn-link">Forgot password?</Button>
                </Col>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={modalClose}>Close</Button>
            </Modal.Footer>


        </Modal>


    );
}

export default Login