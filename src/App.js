import React, { Suspense, useContext, lazy } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComponent from './components/navbar';

import HomeComponent from './components/homePage';
import FilmComponent from './components/filmPage';
import LoginComponent from './components/auth/login';
import RegisterComponent from './components/auth/register';
import SearchComponent from './components/searchPage';
import PlaylistsPage from './components/playlistsPage';
import AddFilmComponent from './components/add/filmAdd';
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
import PrivateRoute from './helpers/components/privateRoute';
import ProfileComponent from './components/profilePage';

import { Toast } from 'react-bootstrap'
import ToastContext from './helpers/toast/toastContext'

library.add(faSearch, faPlus, faThumbsUp, faThumbsDown, faEye, faPlay, faFilter, faCaretUp, faCaretDown, faEllipsisV,
    faSortDown, faSortUp, faTrashAlt, faTimes);

const pathName = process.env.REACT_APP_PATH_NAME

const HomePageLazy = lazy(() => import('./components/homePage'));
const FilmPageLazy = lazy(() => import('./components/filmPage'));

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
            <Suspense fallback={<div style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>Wczytywanie</div>}>
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
                        `${pathName}film/:id/forgot`]}
                            render={(props) => <FilmPageLazy {...props} />} />

                        <Route exact path={[`${pathName}`, `${pathName}login`, `${pathName}register`,
                        `${pathName}reset/:token`, `${pathName}forgot`]}
                            render={() => <Suspense fallback={<div style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>Wczytywanie</div>}><HomePageLazy /></Suspense>} />

                        <Route exact path={[`${pathName}search`, `${pathName}search/login`, `${pathName}search/register`, `${pathName}search/reset/:token`, `${pathName}search/forgot`]} component={SearchComponent} />

                        <PrivateRoute exact path={[`${pathName}add`, `${pathName}add/login`, `${pathName}add/register`, `${pathName}add/reset/:token`, `${pathName}add/forgot`]} component={AddFilmComponent} />

                        <Route exact path={[`${pathName}playlists`, `${pathName}playlists/login`, `${pathName}playlists/register`, `${pathName}playlists/reset/:token`,
                        `${pathName}playlists/forgot`]} component={PlaylistsPage} />

                        <PrivateRoute exact path={[`${pathName}profile`]} component={ProfileComponent} />

                        <Route exact path="*" component={NotFoundComponent} />

                    </Switch>
                </Router>
            </Suspense>
        </div>
    );
}

export default App

