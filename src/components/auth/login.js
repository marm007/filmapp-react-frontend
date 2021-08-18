import { useEffect, useContext, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import Modal from './modal';
import Input from './input';

import * as authApi from '../../services/authService'

import UserContext from '../../helpers/contexts/user/userContext'
import { authInitialState, authReducer } from './reducer';

const Login = () => {

    const { login } = useContext(UserContext);

    let history = useHistory()
    let location = useLocation()

    const [state, dispatch] = useReducer(authReducer, authInitialState)
    const { email, password, isSubmitted, isSending, isError, error } = state

    useEffect(() => {
        async function sendData() {
            await authApi.login({ email, password })
                .then(res => {
                    login(res.data.user.name, res.data.user.id, res.data.token, res.data.refreshToken)
                    //history.replace(location.pathname.slice(0, -6))

                    let pathname = location.pathname.slice(0, -6)
                    if (pathname === '') pathname = process.env.REACT_APP_PATH_NAME

                    history.replace({
                        pathname: pathname,
                        search: location.search,
                        state: location.state
                    })

                    //if (!location.state) {
                    // history.goBack();
                    //} else {
                    //   history.replace(location.state.from)
                    //}
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
        if (isSending) sendData()
    }, [isSending, email, password, history, location, login])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({ type: 'submit' })

        if (email && password) {
            dispatch({ type: 'send' })
        }
    }

    const handleForgotPassword = () => {
        history.goBack();

        setTimeout(function () {
            history.push(`${location.pathname.slice(0, -5)}forgot${location.search}`);
        }, 500);
    };

    const modalClose = () => {
        if (!location.state) {
            history.goBack();
        } else {
            history.push(process.env.REACT_APP_PATH_NAME)
        }
    };

    const handleRegister = () => {
        history.goBack();

        setTimeout(function () {
            history.push(`${location.pathname.slice(0, -5)}register${location.search}`);
        }, 500);
    };



    return (
        <Modal id="loginModal" title="Login" onClose={modalClose}>

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
                        <div className="spinner-grow ms-2" />
                    }
                </div>
            </form>

            {
                isError &&
                <div className="alert-danger mt-2 mb-0">
                    {error ? error : 'Error while logging in.'}
                </div>
            }

            <button onClick={handleRegister} className="p-0 mt-2 btn btn-link">Register</button>

            <div className="col-12 col-sm-12 p-0 m-0 ">
                <button type="button" onClick={handleForgotPassword} className="p-0 mt-2 btn btn-link">Forgot password?</button>
            </div>
        </Modal>
    );
}

export default Login