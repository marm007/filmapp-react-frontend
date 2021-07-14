import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Form, Modal } from 'react-bootstrap';

function ForgotPassword(props) {
    let history = useHistory()

    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [show, setShow] = useState(true)

    const [isEmailSending, setIsEmailSending] = useState(false)
    const [isEmailSend, setIsEmailSend] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmitForgotRequest = (e) => {
        e.preventDefault();

        setIsEmailSending(true)
        setIsEmailError(false)
        setErrorMessage('')

      /*   axios.post(`${process.env.REACT_APP_API_URL}users/password/forgot`, { email: this.state.user.email })
            .then(res => {
                this.setState({ emailSend: true, emailSending: false });
            })
            .catch(err => {
                let errorMessage = '';

                if (err.response && err.response.data && err.response.data.errors)
                    errorMessage = err.response.data.errors;

                this.setState({ emailError: true, emailSending: false, errorMessage: errorMessage });

            }) */
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
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Register
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmitForgotRequest}>
                    <Form.Group>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            isInvalid={(submitted && !email) || (alert && alert.type === 'alert-danger' && alert.message)}
                            type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {
                                alert && alert.message ? alert.message : "Email is required"
                            }
                        </Form.Control.Feedback>
                    </Form.Group>



                    {
                        isEmailSend &&
                        <Alert variant="success">
                            Email with link to reset password has been sent.
                        </Alert>
                    }

                    {
                        isEmailError &&
                        <Alert variant="danger">
                            {errorMessage ? errorMessage : "Error while sending email."}
                        </Alert>
                    }

                    <Form.Group>
                        <Button type="submit" className="btn-primary">
                            Reset password
                        </Button>

                        {isEmailSending &&
                            <img alt="loading..." className="pl-2"
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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