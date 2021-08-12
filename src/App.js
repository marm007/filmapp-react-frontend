import React, { useContext, lazy, Suspense } from 'react';
import './App.css';

import NavbarComponent from './components/navbar';

import RemoveModal from './helpers/components/removeModal'

import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Spinner, Toast } from "react-bootstrap";

//  --------- icons ------------
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faPlay,
    faSortUp,
    faSortDown,
    faTrashAlt,
    faTimes,
    faGlobeEurope,
    faLock
} from '@fortawesome/free-solid-svg-icons'

import { Switch } from "react-router";
import ResetPasswordComponent from './components/auth/resetPassword';
import ForgotPasswordComponent from './components/auth/forgotPassword';
import PrivateRoute from './helpers/components/privateRoute';
import ProfileComponent from './components/profilePage';

import ToastContext from './helpers/contexts/toast/toastContext'

import WithAxios from "./helpers/components/withAxios";
import UserProvider from './helpers/contexts/user/userProvider';

library.add(faPlay, faSortDown, faSortUp, faTrashAlt, faTimes, faGlobeEurope, faLock);

const pathName = process.env.REACT_APP_PATH_NAME

const HomeComponent = lazy(() => import('./components/homePage'))
const FilmComponent = lazy(() => import('./components/filmPage'))
const LoginComponent = lazy(() => import('./components/auth/login'))
const RegisterComponent = lazy(() => import('./components/auth/register'))
const SearchComponent = lazy(() => import('./components/searchPage'))
const PlaylistsPage = lazy(() => import('./components/playlistsPage'))
const AddFilmComponent = lazy(() => import('./components/add/filmAdd'))
const NotFoundComponent = lazy(() => import('./components/notFound'))
const SettingsComponent = lazy(() => import('./components/settings'))

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
                        className="toast-element bg-secondary">
                        <Toast.Header>
                            <strong className="me-auto">Playlist</strong>
                        </Toast.Header>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                </div>
            }
            <Suspense fallback={<div className="suspense-loader"> <Spinner animation="border" /></div>}>

                <Router>
                    <UserProvider>
                        <WithAxios>
                            <Route render={(props) => <NavbarComponent {...props} />} />

                            <PrivateRoute exact path={[`${pathName}settings`, `${pathName}profile/settings`, `${pathName}film/:id/settings`, `${pathName}search/settings`, `${pathName}add/settings`, `${pathName}playlists/settings`]}
                                render={(props) => <SettingsComponent {...props} />} />

                            <Route exact path={[`${pathName}login`, `${pathName}film/:id/login`, `${pathName}search/login`, `${pathName}add/login`, `${pathName}playlists/login`]}
                                render={(props) => <LoginComponent {...props} />} />

                            <Route exact path={[`${pathName}register`, `${pathName}film/:id/register`, `${pathName}search/register`, `${pathName}add/register`, `${pathName}playlists/register`]}
                                render={(props) => <RegisterComponent {...props} />} />

                            <Route exact path={[`${pathName}reset/:token`, `${pathName}film/:id/reset/:token`, `${pathName}search/reset/:token`, `${pathName}add/reset/:token`, `${pathName}playlists/reset/:token`]}
                                render={(props) => <ResetPasswordComponent {...props} />} />

                            <Route exact path={[`${pathName}forgot`, `${pathName}film/:id/forgot`, `${pathName}search/forgot`, `${pathName}add/forgot`, `${pathName}playlists/forgot`]}
                                render={(props) => <ForgotPasswordComponent {...props} />} />

                            <Switch>

                                <Route exact path={[`${pathName}film/:id`, `${pathName}film/:id/login`, `${pathName}film/:id/register`, `${pathName}film/:id/reset/:token`,
                                `${pathName}film/:id/forgot`, `${pathName}film/:id/settings`]}
                                    render={(props) => <FilmComponent {...props} />} />

                                <Route exact path={[`${pathName}`, `${pathName}login`, `${pathName}register`, `${pathName}settings`,
                                `${pathName}reset/:token`, `${pathName}forgot`]}
                                    render={(props) => <HomeComponent {...props} />} />

                                <Route exact path={[`${pathName}search`, `${pathName}search/login`, `${pathName}search/settings`, `${pathName}search/register`, `${pathName}search/reset/:token`, `${pathName}search/forgot`]}
                                    render={(props) => <SearchComponent {...props} />} />

                                <PrivateRoute exact path={[`${pathName}add`, `${pathName}add/settings`]}
                                    render={(props) => <AddFilmComponent {...props} />} />

                                <Route exact path={[`${pathName}playlists`, `${pathName}playlists/login`, `${pathName}playlists/settings`, `${pathName}playlists/register`, `${pathName}playlists/reset/:token`,
                                `${pathName}playlists/forgot`]} render={(props) => <PlaylistsPage {...props} />} />

                                <PrivateRoute exact path={[`${pathName}profile`, `${pathName}profile/settings`]}
                                    render={(props) => <ProfileComponent {...props} />} />

                                <Route exact path="*" render={(props) => <NotFoundComponent {...props} />} />

                            </Switch>
                        </WithAxios>
                    </UserProvider>
                </Router>
            </Suspense>
            <RemoveModal />
        </div>
    );
}

export default App

