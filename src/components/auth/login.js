import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import { Button, Col, Form, Modal } from 'react-bootstrap';

import * as authApi from '../../services/authService'

import UserContext from '../../helpers/userContext'

function Login(props) {

    const { login } = useContext(UserContext);

    let history = useHistory()
    let location = useLocation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [show, setShow] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true)
        if (email && password) {
            console.log({email, password})
            authApi.login({email, password})
            .then(res => {
                login(res.data.user.name, res.data.token)
                history.goBack()
            })
            .catch(err => {
                console.error(err)
            })
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
        history.goBack();
    };

    const handleRegister = () => {
        history.goBack();

        setTimeout(function () {
            history.push(`${location.pathname.slice(0, -5)}register${location.search}`);
        }, 500);
    };


    const { loggingIn } = props;
    const { alert } = props;

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
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Form.Group>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control isInvalid={submitted && !email} type="email" name="email" value={email}
                            onChange={e => setEmail(e.target.value)}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Email is required
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control isInvalid={submitted && !password} type="password" name="password"
                            value={password} onChange={e => setPassword(e.target.value)}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Password is required
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Button type="submit" className="btn-primary">
                            Login
                        </Button>

                        {loggingIn &&
                            <img alt="loading..." className="pl-2"
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </Form.Group>

                </Form>

                {alert && alert.message &&
                    <Col className={`alert ${alert.type}`}>{alert.message}</Col>
                }

                <Button variant="link" onClick={handleRegister} className="p-0 m-0 btn btn-link">Register</Button>

                <Col className="p-0 m-0 " xs={12} sm={12}>
                    <Button variant="link" onClick={handleForgotPassword} className="p-0 m-0 btn btn-link">Forgot password?</Button>
                </Col>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={modalClose}>Close</Button>
            </Modal.Footer>


        </Modal>


    );
}

export default Login