import React, { Component, useContext } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComponent from './components/navbar';

import HomeComponent from './components/homePage';
import FilmComponent from './components/filmPage';
import LoginComponent from './components/auth/login';
import RegisterComponent from './components/auth/register';
import SearchComponent from './components/Search/SearchComponent';
import AllPlaylistsComponent from './components/Playlist/AllPlaylistsComponent';
import AddFilmComponent from './components/add/add-film';
import NotFoundComponent from './components/notFound';

import { Route, BrowserRouter as Router } from 'react-router-dom';

//  --------- icons ------------
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCaretDown,
    faCaretUp,
    faEllipsisV,
    faEye,
    faFilter,
    faPlay,
    faPlus,
    faSearch,
    faThumbsDown,
    faThumbsUp,
    faSortUp,
    faSortDown,
    faTrashAlt,
    faTimes
} from '@fortawesome/free-solid-svg-icons'
import { Switch } from "react-router";
import ResetPasswordComponent from './components/auth/resetPassword';
import ForgotPasswordComponent from './components/auth/forgotPassword';
import { PrivateRoute } from './helpers/PrivateRoute';
import ProfileComponent from './components/Profile/ProfileComponent';

import { Toast } from 'react-bootstrap'
import ToastContext from './helpers/toastContext'

library.add(faSearch, faPlus, faThumbsUp, faThumbsDown, faEye, faPlay, faFilter, faCaretUp, faCaretDown, faEllipsisV,
    faSortDown, faSortUp, faTrashAlt, faTimes);

const pathName = process.env.REACT_APP_PATH_NAME;

function App(props) {

    const { toast, clearToast } = useContext(ToastContext)

    return (
        <div>
            {
                <div className="toast-root">
                    <Toast
                        show={toast.isOpen}
                        onClose={clearToast}
                        autohide
                        className="toast-element"
                    >
                        <Toast.Header>
                            <strong className="mr-auto">Bootstrap</strong>
                        </Toast.Header>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                </div>
            }
            <Router>

                <Route component={() => <NavbarComponent />} />

                <Route exact path={[`${pathName}login`, `${pathName}film/:id/login`, `${pathName}search/login`, `${pathName}add/login`, `${pathName}playlists/login`]}
                    component={LoginComponent} />

                <Route exact path={[`${pathName}register`, `${pathName}film/:id/register`, `${pathName}search/register`, `${pathName}add/register`, `${pathName}playlists/register`]}
                    component={RegisterComponent} />

                <Route exact path={[`${pathName}reset/:token`, `${pathName}film/:id/reset/:token`, `${pathName}search/reset/:token`, `${pathName}add/reset/:token`, `${pathName}playlists/reset/:token`]}
                    component={ResetPasswordComponent} />

                <Route exact path={[`${pathName}forgot`, `${pathName}film/:id/forgot`, `${pathName}search/forgot`, `${pathName}add/forgot`, `${pathName}playlists/forgot`]}
                    component={ForgotPasswordComponent} />

                <Switch>

                    <Route exact path={[`${pathName}film/:id`, `${pathName}film/:id/login`, `${pathName}film/:id/register`, `${pathName}film/:id/reset/:token`,
                    `${pathName}film/:id/forgot`]} component={FilmComponent} />

                    <Route exact path={[`${pathName}`, `${pathName}login`, `${pathName}register`,
                    `${pathName}reset/:token`, `${pathName}forgot`]} component={HomeComponent} />

                    <Route exact path={[`${pathName}search`, `${pathName}search/login`, `${pathName}search/register`, `${pathName}search/reset/:token`, `${pathName}search/forgot`]} component={SearchComponent} />

                    <Route exact path={[`${pathName}add`, `${pathName}add/login`, `${pathName}add/register`, `${pathName}add/reset/:token`, `${pathName}add/forgot`]} component={AddFilmComponent} />

                    <Route exact path={[`${pathName}playlists`, `${pathName}playlists/login`, `${pathName}playlists/register`, `${pathName}playlists/reset/:token`,
                    `${pathName}playlists/forgot`]} component={AllPlaylistsComponent} />

                    <PrivateRoute exact path={[`${pathName}profile`]} component={ProfileComponent} />

                    <Route exact path="*" component={NotFoundComponent} />

                </Switch>
            </Router>
        </div>
    );
}

export default App

