import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../helpers/modal';
import Input from '../helpers/input';

import { authInitialState, authReducer } from './reducer';

import * as authApi from '../../services/authService'

const ResetPassword = (props) => {

    let history = useHistory()

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    const { password, isSubmitted, isSending, isSuccess, isError, error } = state

    useEffect(() => {
        async function sendData() {
            await authApi.reset(props.match.params.token, { password: password })
                .then(res => {
                    dispatch({
                        type: 'success'
                    })

                    setTimeout(function () {
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
        history.push(`${process.env.REACT_APP_PATH_NAME}`);
    };

    return (

        <Modal id="resetPasswordModal" title="Reset" onClose={modalClose}>
            <form onSubmit={handleSubmitPasswordChange}>
                <div>
                    <label className="form-label" htmlFor="password">Password</label>
                    <Input isInvalid={isSubmitted && (password.length < 6)}
                        type="password" name="password" value={password}
                        onChange={e => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        {
                            password.length === 0 ? "Password is required" : "Password too short (min 6 chars)"
                        }
                    </div>
                </div>

                {
                    isSuccess &&
                    <div className="alert alert-success mt-2">
                        Password has been reseated! Redirecting to login page.
                    </div>
                }

                {
                    isError &&
                    <div className="alert alert-danger mt-2">
                        {error ? error : 'Error while resetting password.'}
                    </div>
                }

                <div className="d-flex align-items-center mt-2">
                    <button type="submit" className="btn btn-primary">
                        Reset password
                    </button>

                    {
                        isSending &&
                        <div className="spinner-grow ml-2" />
                    }
                </div>
            </form>
        </Modal>


    );
}


export default ResetPassword