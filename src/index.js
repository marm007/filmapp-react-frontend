import "es6-promise";
import "isomorphic-fetch";

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import UserProvider from './helpers/user/userProvider';
import ToastProvider from "./helpers/toast/toastProvider";
import NavbarProvider from "./helpers/navbar/navbarProvider";
import WithAxios from "./helpers/components/withAxios";

ReactDOM.render(
    <UserProvider>
        <ToastProvider>
            <NavbarProvider>
                <WithAxios>
                    <App />
                </WithAxios>
            </NavbarProvider>
        </ToastProvider>
    </UserProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
