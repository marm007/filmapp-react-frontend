import React, { useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../input';

import { authInitialState, authReducer } from '../../reducers/auth-reducer';

import { register } from '../../services/authService'
import UserContext from '../../contexts/user/userContext'
import { handleCloseModalWindow } from '../../helpers';

const Register = () => {

    let history = useHistory()

    const { login } = useContext(UserContext)
    const [{ email, nick, password, isSubmitted, isSuccess, isSending, isError, error }, dispatch] = useReducer(authReducer, authInitialState)


    const handleSubmit = (e) => {
        e.preventDefault();


        dispatch({ type: 'submit' })

        if (email && nick && password && password.length >= 6) {
            dispatch({ type: 'send' })
            return register({ email: email, password: password, name: nick })
                .then(res => {
                    dispatch({
                        type: 'success'
                    })
                    setTimeout(() => {
                        login(res.data.user.name, res.data.user.id, res.data.token, res.data.refreshToken)
                        handleCloseModalWindow(history, '/register', true)
                    }, 1500)
                })
                .catch(err => {
                    let errorMessage = null;

                    if (err.response && err.response.data && err.response.data.errors)
                        errorMessage = err.response.data.errors;
                    else if (err.response && err.response.data && err.response.data.error)
                        errorMessage = err.response.data.error

                    dispatch({
                        type: 'error',
                        payload: errorMessage
                    })
                    console.error(err)
                })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="nick">Nick</label>
                    <Input isInvalid={isSubmitted && !nick} type="text" name="nick" value={nick}
                        onChange={e => dispatch({ type: 'field', fieldName: 'nick', payload: e.target.value })} />

                    <div className="invalid-feedback">
                        Nick is required
                    </div>
                </div>

                <div className="mt-2 form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <Input
                        isInvalid={(isSubmitted && !email)}
                        type="email" name="email" value={email} onChange={e => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })} />

                    <div className="invalid-feedback">
                        Email is required
                    </div>
                </div>

                <div className="mt-2 form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <Input isInvalid={isSubmitted && (password.length < 6)} type="password"
                        name="password" value={password}
                        onChange={e => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })} />

                    <div className="invalid-feedback">
                        {
                            password.length === 0 ? "Password is required" : "Password too short (min 6 chars)"
                        }

                    </div>
                </div>


                <div className="d-flex align-items-center mt-2 form-group">
                    <button type="submit" className="btn btn-primary">
                        Register
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
                    You have successfully registered and logged in.
                </div>
            }

            {
                isError &&
                <div className="alert alert-danger mt-2">
                    {error ? error : 'Error while registtering.'}
                </div>
            }

        </>
    );
}

export default Register