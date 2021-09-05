/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback, useContext, useReducer, useRef } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { isMobile } from 'react-device-detect';
import { AsyncTypeahead, Menu as AsyncMenu, MenuItem as AsyncMenuItem } from 'react-bootstrap-typeahead';

import { search } from '../../services/filmService'

import UserContext from '../../contexts/user/userContext'

import { initialSearchState, searchReducer } from './reducer';

import useBottomScrollListener from '../../hooks/use-bottom-scroll-listener';
import useWindowsWidth from '../../hooks/use-window-width';

import {
    Menu,
    MenuItem,
} from '@szhsin/react-menu';

import './style.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import '@szhsin/react-menu/dist/index.css';

import headerIcon from '../../images/header.png';

function NavbarComponent() {

    let history = useHistory();
    let location = useLocation();

    const onMediumScreen = useWindowsWidth(768);

    const { user, logout } = useContext(UserContext);

    const [state, dispatch] = useReducer(searchReducer, initialSearchState)

    const { options, title, isLoading, isAllLoaded, isSearching, isOpen, selected } = state

    const handleSearchOnBottom = useCallback(() => {
        if (!isLoading && !isAllLoaded && !isSearching && isOpen) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllLoaded, isSearching, isOpen])

    useBottomScrollListener(handleSearchOnBottom, { id: 'typeahead-navbar' })

    const typeaheadRef = useRef(null)

    const filterBy = () => true;

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        }
    })

    useEffect(() => {
        window.$('#navbar-collapse-menu').collapse('hide')
    }, [location])

    useEffect(() => {
        async function getAllSearchedFilms() {
            await search({ search: title, skip: options.length, searchPage: true })
                .then(({ data }) => {
                    const options = data.map((film) => ({
                        ...film,
                        imgNormal: `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`,
                        imgWebp: `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small_webp`
                    }));

                    dispatch({
                        type: 'success-load',
                        payload: options
                    })
                })
                .catch(err => {
                    console.error(err)
                })
        }

        if (isLoading) getAllSearchedFilms()
    }, [isLoading, title, options.length])

    useEffect(() => {
        async function getAllSearchedFilms() {
            await search({ search: title, searchPage: true })
                .then(({ data }) => {
                    const options = data.map((film) => ({
                        ...film,
                        imgNormal: `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`,
                        imgWebp: `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small_webp`
                    }));
                    dispatch({
                        type: 'success-search',
                        payload: options
                    })
                })
                .catch(err => {
                    console.error(err)
                })
        }

        if (isSearching) getAllSearchedFilms()
    }, [isSearching, title])

    const handleKeyDown = (event) => {
        if (event && event.target && event.target.className &&
            event.target.className === "rbt-input-main form-control rbt-input  focus") {
            let keyCode = event.keyCode || event.charCode;

            switch (keyCode) {
                case 13:
                    handleSearchSubmit(event);
                    break;
                case 9:
                    if (isMobile)
                        handleSearchSubmit(event);
                    break;
                default:
                    break;
            }
        }
    };

    const handleAddFilm = () => history.push(`${process.env.REACT_APP_PATH_NAME}add`)

    const handleShowPlaylists = () => history.push(`${process.env.REACT_APP_PATH_NAME}playlists`)

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        document.getElementById("search-form").reset();
        if (typeaheadRef) typeaheadRef.current.clear();

        if (selected) {
            history.push({
                pathname: `${process.env.REACT_APP_PATH_NAME}film/${selected.id}`,
                search: '',
                state: {}
            });
        }
        else if (title === '') {
            history.push({
                pathname: `${process.env.REACT_APP_PATH_NAME}search`,
                search: `?title=${title}`,
                state: {}
            });
        }
        else if (options.length === 1) {
            history.push({
                pathname: `${process.env.REACT_APP_PATH_NAME}film/${options[0].id}`,
                search: '',
                state: {}
            });
        } else {
            history.push({
                pathname: `${process.env.REACT_APP_PATH_NAME}search`,
                search: `?title=${title}`,
                state: { films: options }
            });
        }

        dispatch({
            type: 'clear'
        })
    }


    const handleLogoutClick = () => {
        logout()
    };

    const handleProfileClick = () => {
        history.push(`${process.env.REACT_APP_PATH_NAME}profile`)
    };

    const handleSettingsClick = () => {
        let pathname = location.pathname
        if (pathname === process.env.REACT_APP_PATH_NAME) pathname = pathname.slice(0, -1)

        history.push({
            pathname: `${pathname}/settings`,
            search: location.search,
            state: location.state
        });
    }

    const handleSearch = useCallback((query) => {
        dispatch({
            type: 'search',
            payload: query
        })
    }, []);

    const handleLogin = () => {
        let pathname = location.pathname
        if (pathname === process.env.REACT_APP_PATH_NAME) pathname = pathname.slice(0, -1)
        history.push({
            pathname: `${pathname}/login`,
            search: location.search,
            state: location.state
        });
    }

    return (

        <nav
            className="navbar navbar-expand-md navbar-light bg-light py-2 px-3">
            <div className="col-5 col-sm-2 col-md-4 order-first order-sm-first order-md-first pb-2 px-0">
                <div className="navbar-brand d-flex align-items-center"
                    onClick={() => history.push(process.env.REACT_APP_PATH_NAME)}>
                    <img alt=""
                        className="cursor-pointer"
                        src={headerIcon}
                        width="30"
                        height="30" />
                    <span className="navbar-brand d-none d-md-inline m-0 pl-3 cursor-pointer">FilmApp</span>
                </div>
            </div>

            <div className="col-6 order-2 col-sm-2 order-sm-last text-right d-md-none m-button px-0">
                <button type="button" className="navbar-toggler m-button"
                    aria-controls="navbar-collapse-menu" data-toggle="collapse"
                    data-target="#navbar-collapse-menu" aria-expanded="false" aria-label="toggle-navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>

            <div className="col-12 order-3 col-sm-8 order-sm-2 col-md-5 order-md-5" >
                <form id="search-form" className="row row-cols-lg-auto align-items-center">
                    <div className="row m-0 w-100">
                        <div className="col-12 col-sm-10 p-0 mt-2 m-sm-0">
                            <AsyncTypeahead
                                ref={typeaheadRef}
                                className="search-bar"
                                useCache={false}
                                filterBy={filterBy}
                                id="typeahead-navbar"
                                isLoading={true}
                                open={isOpen}
                                placeholder="Search"
                                labelKey="title"
                                minLength={1}
                                options={options}
                                onSearch={handleSearch}
                                onBlur={(event) => dispatch({ type: 'field', fieldName: 'isOpen', payload: false })}
                                onFocus={(event) => {
                                    if (title !== '')
                                        dispatch({ type: 'field', fieldName: 'isOpen', payload: true })
                                }}
                                onKeyDown={(event) => dispatch({ type: 'field', fieldName: 'isOpen', payload: true })}
                                onMenuToggle={(isOpen) => dispatch({ type: 'field', fieldName: 'isOpen', payload: isOpen })}
                                onInputChange={(text, event) => {
                                    dispatch({
                                        type: 'field',
                                        fieldName: 'title',
                                        payload: text
                                    })
                                    if (text === '')
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'options',
                                            payload: []
                                        })
                                }}
                                onChange={(selected) => {
                                    const title = selected.length > 0 ? selected[0].title : '';
                                    dispatch({
                                        type: 'pick-option',
                                        title: title,
                                        selected: selected.length > 0 ? selected[0] : null
                                    })
                                }}
                                renderMenu={(results, menuProps) => (
                                    <AsyncMenu {...menuProps} className="pt-4 pb-4">
                                        {results.map((result, index) => (
                                            <AsyncMenuItem key={result.id} option={result} position={index}>
                                                <div className="row p-0 m-0 entry__inner" onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    dispatch({
                                                        type: 'clear'
                                                    })
                                                    document.getElementById("search-form").reset();
                                                    if (typeaheadRef) typeaheadRef.current.clear();

                                                    history.push({
                                                        pathname: `${process.env.REACT_APP_PATH_NAME}film/${result.id}`,
                                                        search: '',
                                                        state: {}
                                                    });

                                                }}>
                                                    <picture>
                                                        <source type="image/webp" src={result.imgWebp} />
                                                        <source type="image/jpeg" src={result.imgNormal} />
                                                        <img
                                                            className="p-0 search-menu-image"
                                                            alt=""
                                                            src={result.imgNormal}
                                                        />
                                                    </picture>

                                                    <span className="entry__text">{result.title}</span>
                                                </div>
                                            </AsyncMenuItem>
                                        ))}



                                        {!isLoading && !isSearching && results.length === 0 && <a role="option" className="dropdown-item disabled" href="#">No matches found.</a>}
                                        {isSearching && <a role="option" className="dropdown-item disabled" href="#">Searching...</a>}
                                        {
                                            <div className="d-flex justify-content-center search-menu-spinner">
                                                {isLoading && !isAllLoaded && <div className="spinner-border" />}
                                            </div>
                                        }
                                    </AsyncMenu>
                                )}

                            />
                        </div>
                        <div className="col col-sm-2">
                            <button type="button" onClick={handleSearchSubmit}
                                className="btn btn-light d-none d-sm-inline">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>



            <div className="collapse navbar-collapse justify-content-end col-12 order-last col-sm-12 order-sm-last col-md-3 order-md-last p-0"
                id="navbar-collapse-menu">

                <div className="navbar-nav d-block d-sm-block d-md-flex align-items-center">
                    <div className="nav-item px-2 my-2 px-md-1 my-md-0">
                        <span className="d-inline cursor-pointer nav-link p-0" onClick={handleShowPlaylists}>Playlists</span>
                    </div>
                    {user.auth && <div className="nav-item px-2 mb-2 px-md-1 mb-md-0">
                        <span className="d-inline cursor-pointer nav-link p-0" onClick={handleAddFilm}>Add</span>
                    </div>}

                    {
                        user.auth ?
                            (
                                <Menu
                                    className="avatar-menu-items"
                                    align={onMediumScreen ? "start" : "end"}
                                    viewScroll="close"
                                    position="initial"
                                    direction="bottom"
                                    menuButton={
                                        <div
                                            className="my-0 p-md-0 custom-avatar m-button">
                                            {user.name.toUpperCase().charAt(0)}
                                        </div>
                                    }
                                >
                                    <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                                    <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
                                    <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                                </Menu>


                            ) :
                            (
                                <div className="nav-item pr-2 pl-2">
                                    <span className="d-inline cursor-pointer nav-link p-0"
                                        onClick={() => handleLogin()}>Login</span>
                                </div>
                            )
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavbarComponent