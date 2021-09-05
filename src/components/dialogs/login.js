import React, { useContext, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import Input from '../input';

import { login as authLogin } from '../../services/authService'

import UserContext from '../../contexts/user/userContext'
import { authInitialState, authReducer } from '../../reducers/auth-reducer';
import { handleCloseModalWindow } from '../../helpers';

const Login = () => {

    const { login } = useContext(UserContext);

    let history = useHistory()
    let location = useLocation()

    const [{ email, password, isSubmitted, isSending, isError, isSuccess, error }, dispatch] = useReducer(authReducer, authInitialState)


    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({ type: 'submit' })

        if (email && password) {
            dispatch({ type: 'send' })

            return authLogin({ email, password })
                .then(res => {
                    dispatch({
                        type: 'success'
                    })
                    login(res.data.user.name, res.data.user.id, res.data.token, res.data.refreshToken)
                    setTimeout(() => handleCloseModalWindow(history, '/login', true), 1000)
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
    }

    const handleForgotPassword = () => {
        handleCloseModalWindow(history, '/login')

        setTimeout(function () {
            history.push(`${location.pathname.slice(0, -5)}forgot${location.search}`);
        }, 500);
    };

    const handleRegister = () => {
        handleCloseModalWindow(history, '/login')

        setTimeout(function () {
            history.push(`${location.pathname.slice(0, -5)}register${location.search}`);
        }, 500);
    };



    return (
        <>
            <form onSubmit={isSending ? null : handleSubmit}>
                <div>
                    <label className="form-label" htmlFor="email">Email</label>
                    <Input isInvalid={isSubmitted && !email} type="email" name="email" value={email}
                        onChange={e => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Email is required
                    </div>
                </div>

                <div className="mt-2">
                    <label className="form-label" htmlFor="password">Password</label>
                    <Input isInvalid={isSubmitted && !password} type="password" name="password"
                        value={password} onChange={e => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })} />
                    <div className="invalid-feedback">
                        Password is required
                    </div>
                </div>

                <div className="d-flex align-items-center mt-2">
                    <button disabled={isSending} type="submit" className="btn btn-primary">
                        Login
                    </button>
                    {
                        isSending &&
                        <div className="spinner-grow ml-2" />
                    }
                </div>
            </form>

            {
                isError &&
                <div className="alert alert-danger mt-2 mb-0">
                    {error ? error : 'Error while logging in.'}
                </div>
            }

            {
                isSuccess &&
                <div className="alert alert-success mt-2 mb-0">
                    You are now logged in.
                </div>
            }

            <button onClick={handleRegister} className="p-0 mt-2 btn btn-link">Register</button>

            <div className="col-12 col-sm-12 p-0 m-0 ">
                <button type="button" onClick={handleForgotPassword} className="p-0 mt-2 btn btn-link">Forgot password?</button>
            </div>
        </>
    );
}

export default Login