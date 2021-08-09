import React, { useState, useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import * as authApi from '../../services/authService'
import { authInitialState, authReducer } from './reducer';

function ResetPassword(props) {

    let history = useHistory()

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    const { password, isSubmitted, isSending, isSuccess, isError, error } = state

    const [show, setShow] = useState(true)

    useEffect(() => {
        async function sendData() {
            await authApi.reset(props.match.params.token, { password: password })
                .then(res => {
                    dispatch({
                        type: 'success'
                    })

                    setTimeout(function () {
                        setShow(false);
                        history.push(`${process.env.REACT_APP_PATH_NAME}`);
                        setTimeout(function () {
                            history.push(`${process.env.REACT_APP_PATH_NAME}login`);
                        }, 500);
                    }, 1500);

                })
                .catch(err => {
                    let errorMessage = null;

                    if (err.response && err.response.data && err.response.data.errors)
                        errorMessage = err.response.data.errors;

                    dispatch({
                        type: 'error',
                        payload: errorMessage
                    })

                })

        }


        if (isSending) sendData()

    }, [isSending, history, password, props.match.params.token])

    const handleSubmitPasswordChange = (e) => {
        e.preventDefault();

        dispatch({
            type: 'submit'
        })

        if (props.match.params.token && password && password.length >= 6) {
            dispatch({ type: 'send' })
        }
    }

    const modalClose = () => {
        setShow(false)
        history.push(`${process.env.REACT_APP_PATH_NAME}`);
    };

    return (

        <Modal
            onHide={modalClose}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Reset
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmitPasswordChange}>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control isInvalid={isSubmitted && (password.length < 6)} type="password"
                            name="password" value={password} maxLength="11"
                            onChange={e => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })}>
                        </Form.Control>
                        <Form.Control.Feedback type={"invalid"}>
                            {
                                password.length === 0 ? "Password is required" : "Password too short (min 6 chars)"
                            }

                        </Form.Control.Feedback>
                    </Form.Group>

                    {
                        isSuccess &&
                        <Alert variant="success" className="mt-2">
                            Password has been reseated! Redirecting to login page.
                        </Alert>
                    }

                    {
                        isError &&
                        <Alert variant="danger" className="mt-2">
                            {error ? error : 'Error while resetting password.'}
                        </Alert>
                    }

                    <Form.Group className="d-flex align-items-center mt-2">
                        <Button type="submit" className="btn-primary">
                            Reset password
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


export default ResetPassword