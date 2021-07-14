import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';


function Register(props) {

    let history = useHistory()

    const [email, setEmail] = useState('')
    const [nick, setNick] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [show, setShow] = useState(true)


    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true)

        if (email && nick && password && password.length >= 6) {
        }
    }



    const modalClose = () => {
        setShow(false)
        history.goBack();
    };

    const { alert, registering } = props;

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
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="nick">Nick</Form.Label>
                        <Form.Control isInvalid={submitted && !nick} type="text" name="nick" value={nick}
                            onChange={e => setNick(e.target.value)}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Nick is required
                        </Form.Control.Feedback>
                    </Form.Group>

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

                    <Form.Group>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control isInvalid={submitted && (password.length < 6)} type="password"
                            name="password" value={password} maxLength="11"
                            onChange={e => setPassword(e.target.value)}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {
                                password.length === 0 ? "Password is required" : "Password too short (min 6 chars)"
                            }

                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Button type="submit" className="btn-primary">
                            Register
                        </Button>

                        {registering &&
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

export default Register