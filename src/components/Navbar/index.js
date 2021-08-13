/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback, useContext, useReducer, useRef } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, Col, Row, Form, Nav, Navbar, Spinner } from 'react-bootstrap';

import headerIcon from '../../images/header.png';
import * as filmApi from '../../services/filmService'

import { AsyncTypeahead, Menu as AsyncMenu, MenuItem as AsyncMenuItem } from 'react-bootstrap-typeahead';

import UserContext from '../../helpers/contexts/user/userContext'

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './navbar.css';
import { initialSearchState, searchReducer } from './reducer';

import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';
import useWindowsWidth from '../../helpers/hooks/useWindowsWidth';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import {
    Menu,
    MenuItem,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

function NavbarComponent(props) {

    let history = useHistory();
    let location = useLocation();

    const onSmallScreen = useWindowsWidth();

    const { user, logout } = useContext(UserContext);

    const [state, dispatch] = useReducer(searchReducer, initialSearchState)

    const [isExpanded, setIsExpanded] = useState(false)

    const { options, title, isLoading, isAllFetched, isSearching, isOpen, selected } = state

    const handleSearchOnBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && !isSearching && isOpen) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched, isSearching, isOpen])

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
        setIsExpanded(false)
    }, [location])

    useEffect(() => {
        async function getAllSearchedFilms() {
            await filmApi.search({ search: title, skip: options.length })
                .then(({ data }) => {
                    const options = data.map((film) => ({
                        ...film,
                        img: `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small_webp`
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
            await filmApi.search({ search: title })
                .then(({ data }) => {
                    const options = data.map((film) => ({
                        ...film,
                        img: `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small_webp`
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
            console.log(keyCode)

            switch (keyCode) {
                case 13:
                    handleSearchSubmit(event);
                    break;
                case 9:
                    if (onSmallScreen)
                        handleSearchSubmit(event);
                    break;
                default:
                    break;
            }
        }
    };

    const handleSelect = (eventKey) => {

        switch (eventKey) {
            case 'add_film': {
                history.push(`${process.env.REACT_APP_PATH_NAME}add`);
                break;
            }
            case 'playlists':
                history.push(`${process.env.REACT_APP_PATH_NAME}playlists`)
                break;
            default: break;
        }
    }

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

    const handleToggle = (expanded) => {
        setIsExpanded(expanded)
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

        <Navbar
            expanded={isExpanded}
            className="py-2 px-4"
            expand="md" bg="light" variant="light"
            onToggle={handleToggle}
            onSelect={e => handleSelect(e)}>

            <Col className="pb-2"
                xs={{ span: 5, order: 'first' }}
                sm={{ span: 2, order: 'first' }}
                md={{ span: 4, order: 'first' }}>
                <Navbar.Brand style={{ cursor: 'pointer' }}
                    className="d-flex align-items-center"
                    onClick={() => history.push(process.env.REACT_APP_PATH_NAME)}>
                    <Navbar.Brand>
                        {
                            <img alt=""
                                src={headerIcon} width="30"
                                height="30" />
                        }
                    </Navbar.Brand>
                    {<p className="d-none d-md-inline m-0">FilmApp</p>}
                </Navbar.Brand>
            </Col>

            <Col className="text-right d-md-none m-button pb-2 "
                xs={{ span: 6, order: 2 }}
                sm={{ span: 2, order: 'last' }}>
                <Navbar.Toggle className="m-button" aria-controls="responsive-navbar-nav" />
            </Col>

            <Col xs={{ span: 12, order: 3 }}
                sm={{ span: 8, order: 2 }}
                md={{ span: 5, order: 2 }}>
                <Form id="search-form" inline="true">
                    <Row className="m-0" style={{ width: 100 + '%' }}>
                        <Col xs={12} sm={10} className="p-0">
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
                                                <Row className="p-0 m-0 entry__inner" onClick={(e) => {
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
                                                    <img
                                                        className="p-0"
                                                        alt=""
                                                        src={result.img}
                                                        style={{
                                                            height: '24px',
                                                            marginRight: '10px',
                                                            width: '24px',
                                                        }}
                                                    />
                                                    <span className="entry__text">{result.title}</span>
                                                </Row>
                                            </AsyncMenuItem>
                                        ))}



                                        {!isLoading && !isSearching && results.length === 0 && <a role="option" className="dropdown-item disabled" href="#">No matches found.</a>}
                                        {isSearching && <a role="option" className="dropdown-item disabled" href="#">Searching...</a>}
                                        {
                                            <div style={{ height: 8 + 'px' }} className="d-flex justify-content-center">
                                                {isLoading && !isAllFetched && <Spinner animation="border" />}
                                            </div>
                                        }
                                    </AsyncMenu>
                                )}

                            />
                        </Col>
                        <Col sm={2}>
                            <Button onClick={handleSearchSubmit}
                                className="d-none d-sm-inline"
                                variant="light">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>


            <Col xs={{ span: 12, order: 'last' }}
                sm={{ span: 12, order: 'last' }}
                md={{ span: 3, order: 'last' }}>

                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">

                    <Nav activeKey="" className="d-block d-sm-block d-md-flex  align-items-center">
                        <Nav.Link className="px-2" eventKey="playlists">Playlists</Nav.Link>
                        {user.auth && <Nav.Link className="px-2" eventKey="add_film">Add</Nav.Link>}

                        {
                            user.auth ?
                                (
                                    <Menu
                                        className="avatar-menu-items"
                                        align="end"
                                        viewScroll="close"
                                        offsetY={12}
                                        position="initial"
                                        direction="bottom"
                                        menuButton={
                                            <div
                                                className="pe-2 ps-2 custom-avatar m-button">
                                                {user.name.toUpperCase().charAt(0)}
                                            </div>
                                        }
                                    >
                                        <MenuItem onClick={handleProfileClick} > Profile</MenuItem>
                                        <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
                                        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                                    </Menu>


                                ) :
                                (
                                    <Nav.Link className="pe-2 ps-2" eventKey="login "
                                        onClick={() => handleLogin()}>
                                        Login
                                    </Nav.Link>
                                )
                        }
                    </Nav>

                </Navbar.Collapse>

            </Col>



        </Navbar>
    )
}

export default NavbarComponent