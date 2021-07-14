import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Form, Modal } from 'react-bootstrap';

function ResetPassword(props) {
    
    let history = useHistory()

    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [show, setShow] = useState(true)

    const [isResetRequested, setIsResetRequested] = useState(false)
    const [isResetSuccessful, setIsResetSuccessful] = useState(false)
    const [isResetError, setIsResetError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const handleSubmitPasswordChange = (e) => {
        e.preventDefault();
        
        setSubmitted(true)
        setIsResetRequested(true)
        setIsResetError(false)


       /*  if (this.props.match.params.token && user.password && user.password.length >= 6) {
            axios.post(`${process.env.REACT_APP_API_URL}users/password/reset/${this.props.match.params.token}`,
                { password: this.state.user.password })
                .then(res => {

                    this.setState({ resetSuccessful: true, resetRequested: false });

                    setTimeout(function () {
                        this.setState({ show: false });
                        this.props.history.push(`${pathName}`);
                        setTimeout(function () {
                            this.props.history.push(`${pathName}login`);
                        }.bind(this), 500);
                    }.bind(this), 1500);

                })
                .catch(err => {
                    let errorMessage = '';

                    if (err.response && err.response.data && err.response.data.errors)
                        errorMessage = err.response.data.errors;

                    this.setState({ resetError: true, resetSuccessful: false, resetRequested: false, errorMessage: errorMessage });

                })
        } else {
            this.setState({ resetRequested: false });
        } */
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
                    Register
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmitPasswordChange}>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control isInvalid={submitted && (password.length < 6)} type="password"
                            name="password" value={password} maxLength="11"
                            onChange={e => setPassword(e.target.value)}>
                        </Form.Control>
                        <Form.Control.Feedback type={"invalid"}>
                            {
                                password.length === 0 ? "Password is required" : "Password too short (min 6 chars)"
                            }

                        </Form.Control.Feedback>
                    </Form.Group>

                    {
                        isResetSuccessful &&
                        <Alert variant="success">
                            Password has been reseated! Redirecting to login page.
                        </Alert>
                    }

                    {
                        isResetError &&
                        <Alert variant="danger">
                            {errorMessage ? errorMessage : 'Error while resetting password.'}
                        </Alert>
                    }

                    <Form.Group>
                        <Button type="submit" className="btn-primary">
                            Reset password
                        </Button>

                        {isResetRequested &&
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


export default ResetPassword