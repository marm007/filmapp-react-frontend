import React, { useParams, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { authInitialState, authReducer } from '../../reducers/auth-reducer';
import { reset } from '../../services/authService';
import Input from '../input';

const ResetPassword = (props) => {

    let history = useHistory()
    let { token } = useParams();

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    const { password, isSubmitted, isSending, isSuccess, isError, error } = state

    const handleSubmitPasswordChange = (event) => {
        event.preventDefault();

        dispatch({ type: 'submit' })

        if (token && password && password.length >= 6) {
            dispatch({ type: 'send' })
            return reset(token, { password: password })
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
    }


    return (
        <>
            <form onSubmit={handleSubmitPasswordChange}>
                <div className="form-group">
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

                <div className="d-flex align-items-center mt-2 form-group">
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
                    Password has been reseated! Redirecting to login page.
                </div>
            }

            {
                isError &&
                <div className="alert alert-danger mt-2">
                    {error ? error : 'Error while resetting password.'}
                </div>
            }
        </>

    );
}


export default ResetPassword