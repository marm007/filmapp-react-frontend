import React, { useReducer } from 'react';

import Input from '../input';

import { authInitialState, authReducer } from '../../reducers/auth-reducer';

import { forget } from '../../services/authService'

const ForgotPassword = () => {

    const [{ email, isSuccess, isSubmitted, isSending, isError, error }, dispatch] = useReducer(authReducer, authInitialState)

    const handleSubmitForgotRequest = async (event) => {
        event.preventDefault();

        dispatch({ type: 'submit' })

        if (email) {
            await forget({ email: email })
                .then(res => {
                    dispatch({ type: 'success' })
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
    };


    return (
        <>
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
            {
                isSuccess &&
                <div className="alert alert-success mt-2">
                    Email with link to reset password has been sent.
                </div>
            }

            {
                isError &&
                <div className="alert alert-danger mt-2">
                    {error ? error : "Error while sending email."}
                </div>
            }
        </>

    );
}

export default ForgotPassword