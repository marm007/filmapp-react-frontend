import React, { useState, useEffect, useCallback, useContext, useReducer, useRef } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@material-ui/core/Avatar';

import { Button, Col, Row, Form, Nav, Navbar, Spinner } from 'react-bootstrap';

import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

import ico from '../../images/ico.png';
import * as filmApi from '../../services/filmService'

import { AsyncTypeahead, Menu as AsyncMenu, MenuItem as AsyncMenuItem } from 'react-bootstrap-typeahead';
import { isMobile } from "react-device-detect";

import UserContext from '../../helpers/user/userContext'

import './navbar.css';
import { initialSearchState, searchReducer } from './reducer';

import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';

function NavbarComponent(props) {

    let history = useHistory();
    let location = useLocation();

    const { user, logout } = useContext(UserContext);

    const [state, dispatch] = useReducer(searchReducer, initialSearchState)

    const [isExpanded, setIsExpanded] = useState(false)

    const { options, title, isLoading, isAllFetched, isSearching } = state

    const handleSearchOnBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && !isSearching) {
            dispatch({
                type: 'load'
            })
        }
    }, [isLoading, isAllFetched, isSearching])

    useBottomScrollListener(handleSearchOnBottom, { id: 'typeahead-navbar' })

    const typeaheadRef = useRef(null)

    const [anchorEl, setAnchorEl] = useState(null)

    const filterBy = () => true;
    //handleSearchSubmit = handleSearchSubmit.bind(this);

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
                        img: `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`
                    }));

                    console.log('data', data)
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
                        img: `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`
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

        if (options.length === 1) {
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
            type: 'field',
            fieldName: 'title',
            payload: ''
        })
    }

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        setAnchorEl(null);
        logout()
    };

    const handleProfileClick = () => {
        setAnchorEl(null);
        history.push(`${process.env.REACT_APP_PATH_NAME}profile`)
    };

    const handleToggle = (expanded) => {
        setIsExpanded(expanded)
    }

    const handleSearch = (query) => {
        dispatch({
            type: 'search',
            payload: query
        })

    }

    const handleLogin = () => {
        let pathname = location.pathname
        if (pathname === '/') pathname = ''
        history.push(`${pathname}/login`);
    }

    return (

        <Navbar
            expanded={isExpanded}
            className="p-2"
            expand="md" bg="light" variant="light"
            onToggle={handleToggle}
            onSelect={e => handleSelect(e)}>

            <Col className="pb-2"
                xs={{ span: 5, order: 'first' }}
                sm={{ span: 2, order: 'first' }}
                md={{ span: 4, order: 'first' }}>
                <Navbar.Brand href={process.env.REACT_APP_PATH_NAME}>
                    <Navbar.Brand>
                        {
                            <img alt=""
                                src={ico} width="30"
                                height="30" />
                        }
                    </Navbar.Brand>
                    {<p className="d-none d-md-inline">FilmApp</p>}
                </Navbar.Brand>
            </Col>

            <Col className="text-right d-md-none m-button-1 pb-2 "
                xs={{ span: 6, order: 2 }}
                sm={{ span: 2, order: 'last' }}>
                <Navbar.Toggle className="m-button" aria-controls="responsive-navbar-nav" />
            </Col>

            <Col xs={{ span: 12, order: 3 }}
                sm={{ span: 8, order: 2 }}
                md={{ span: 5, order: 2 }}>
                <Form id="search-form" inline>
                    <Row className="m-0" style={{ width: 100 + '%' }}>
                        <Col xs={12} sm={10} className="p-0">
                            <AsyncTypeahead
                                ref={typeaheadRef}
                                className="search-bar"
                                useCache={false}
                                filterBy={filterBy}
                                id="typeahead-navbar"
                                isLoading={isLoading}
                                placeholder="Search"
                                labelKey="title"
                                minLength={1}
                                options={options}
                                onSearch={handleSearch}
                                onChange={(selected) => {
                                    const title = selected.length > 0 ? selected[0].title : '';
                                    dispatch({
                                        type: 'field',
                                        fieldName: 'title',
                                        payload: title
                                    })
                                }}
                                renderMenu={(results, menuProps) => (

                                    <AsyncMenu {...menuProps} className="pt-4 pb-4">
                                        {results.map((result, index) => (
                                            <AsyncMenuItem key={result.id} option={result} position={index}>
                                                <Row className="p-0 m-0 entry__inner">
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
                                        {!isLoading && results.length === 0 && <a role="option" className="dropdown-item disabled" href="#">No matches found.</a>}
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
                                <FontAwesomeIcon icon="search" />
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>


            <Col xs={{ span: 12, order: 'last' }}
                sm={{ span: 12, order: 'last' }}
                md={{ span: 3, order: 'last' }}>

                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">

                    <Nav activeKey="">
                        <Nav.Link className="pr-2 pl-2" eventKey="playlists">Playlists</Nav.Link>
                        {user.auth && <Nav.Link className="pr-2 pl-2" eventKey="add_film">Add</Nav.Link>}

                        {
                            user.auth ?
                                (
                                    <Avatar onClick={handleProfileMenuOpen}
                                        className="pr-2 pl-2 custom-avatar m-button">
                                        {user.name.toUpperCase().charAt(0)}
                                    </Avatar>

                                ) :
                                (
                                    <Nav.Link className="pr-2 pl-2" eventKey="login "
                                        onClick={() => handleLogin()}>
                                        Login
                                    </Nav.Link>
                                )
                        }
                    </Nav>

                </Navbar.Collapse>

            </Col>

            <Menu
                id="film-navbar-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}>
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

        </Navbar>
    )
}

export default NavbarComponent