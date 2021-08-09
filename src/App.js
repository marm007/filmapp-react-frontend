import React, { useContext } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComponent from './components/navbar';

import RemoveModal from './helpers/components/removeModal'

import HomeComponent from './components/homePage';
import FilmComponent from './components/filmPage';
import LoginComponent from './components/auth/login';
import RegisterComponent from './components/auth/register';
import SearchComponent from './components/searchPage';
import PlaylistsPage from './components/playlistsPage';
import AddFilmComponent from './components/add/filmAdd';
import NotFoundComponent from './components/notFound';
import SettingsComponent from './components/settings'

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
    faTimes,
    faGlobeEurope,
    faLock
} from '@fortawesome/free-solid-svg-icons'

import { Switch } from "react-router";
import ResetPasswordComponent from './components/auth/resetPassword';
import ForgotPasswordComponent from './components/auth/forgotPassword';
import PrivateRoute from './helpers/components/privateRoute';
import ProfileComponent from './components/profilePage';

import { Toast } from 'react-bootstrap'
import ToastContext from './helpers/contexts/toast/toastContext'

import WithAxios from "./helpers/components/withAxios";
import UserProvider from './helpers/contexts/user/userProvider';

library.add(faSearch, faPlus, faThumbsUp, faThumbsDown, faEye, faPlay, faFilter, faCaretUp, faCaretDown, faEllipsisV,
    faSortDown, faSortUp, faTrashAlt, faTimes, faGlobeEurope, faLock);

const pathName = process.env.REACT_APP_PATH_NAME

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
            <Router>
                <UserProvider>
                    <WithAxios>
                        <Route component={() => <NavbarComponent />} />

                        <PrivateRoute exact path={[`${pathName}settings`, `${pathName}profile/settings`, `${pathName}film/:id/settings`, `${pathName}search/settings`, `${pathName}add/settings`, `${pathName}playlists/settings`]}
                            component={SettingsComponent} />

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
                            `${pathName}film/:id/forgot`, `${pathName}film/:id/settings`]} component={FilmComponent} />

                            <Route exact path={[`${pathName}`, `${pathName}login`, `${pathName}register`, `${pathName}settings`,
                            `${pathName}reset/:token`, `${pathName}forgot`]} component={HomeComponent} />

                            <Route exact path={[`${pathName}search`, `${pathName}search/login`, `${pathName}search/settings`, `${pathName}search/register`, `${pathName}search/reset/:token`, `${pathName}search/forgot`]} component={SearchComponent} />

                            <PrivateRoute exact path={[`${pathName}add`, `${pathName}add/settings`]} component={AddFilmComponent} />

                            <Route exact path={[`${pathName}playlists`, `${pathName}playlists/login`, `${pathName}playlists/settings`, `${pathName}playlists/register`, `${pathName}playlists/reset/:token`,
                            `${pathName}playlists/forgot`]} component={PlaylistsPage} />

                            <PrivateRoute exact path={[`${pathName}profile`, `${pathName}profile/settings`]} component={ProfileComponent} />

                            <Route exact path="*" component={NotFoundComponent} />

                        </Switch>
                    </WithAxios>
                </UserProvider>
            </Router>
            <RemoveModal />
        </div>
    );
}

export default App

