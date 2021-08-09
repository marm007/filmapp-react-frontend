import React, { useState, useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import * as authApi from '../../services/authService'
import { authInitialState, authReducer } from './reducer';

function ForgotPassword(props) {
    let history = useHistory()

    const [show, setShow] = useState(true)

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    const { email, isSuccess, isSubmitted, isSending, isError, error } = state

    useEffect(() => {
        async function submitData() {

            await authApi.forget({ email: email })
                .then(res => {
                    dispatch({
                        type: 'success'
                    })
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
        if (isSending) submitData()
    }, [isSending, email])

    const handleSubmitForgotRequest = (e) => {
        e.preventDefault();

        dispatch({
            type: 'submit'
        })

        if (email) {
            dispatch({
                type: 'send'
            })
        }
    };

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
                    Forgot
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmitForgotRequest}>
                    <Form.Group>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            isInvalid={(isSubmitted && !email)}

                            type="email" name="email" value={email} onChange={e => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Email is required
                        </Form.Control.Feedback>
                    </Form.Group>



                    {
                        isSuccess &&
                        <Alert variant="success" className="mt-2">
                            Email with link to reset password has been sent.
                        </Alert>
                    }

                    {
                        isError &&
                        <Alert variant="danger" className="mt-2">
                            {error ? error : "Error while sending email."}
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

export default ForgotPassword