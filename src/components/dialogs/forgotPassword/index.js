import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../../models/modal';
import Input from '../../models/input';

import { authInitialState, authReducer } from '../reducer';

import * as authApi from '../../../services/authService'
import { handleCloseModalWindow } from '../../../helpers';

const ForgotPassword = () => {
    let history = useHistory()

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
        handleCloseModalWindow(history, '/forgot')
    };


    return (

        <Modal id="forgotPasswordModal" title="Forgot" onClose={modalClose}>
            <form onSubmit={handleSubmitForgotRequest}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input
                        isInvalid={(isSubmitted && !email)}
                        type="email" name="email" value={email} onChange={e => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Email is required
                    </div>
                </div>

                {
                    isSuccess &&
                    <div className="alert alert-danger mt-2">
                        Email with link to reset password has been sent.
                    </div>
                }

                {
                    isError &&
                    <div className="alert alert-danger mt-2">
                        {error ? error : "Error while sending email."}
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

export default ForgotPassword