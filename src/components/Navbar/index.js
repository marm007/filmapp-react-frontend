import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@material-ui/core/Avatar';

import { Button, Col, Row, Form, Nav, Navbar } from 'react-bootstrap';

import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

import ico from '../../images/ico.png';
import * as filmApi from '../../services/filmService'

import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { isMobile } from "react-device-detect";

import UserContext from '../../helpers/userContext'

import './navbar.css';

function NavbarComponent(props) {

    const { user, logout } = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();

    const typeaheadRef = useRef(null)

    const [title, setTitle] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([]);

    const filterBy = () => true;
    //handleSearchSubmit = handleSearchSubmit.bind(this);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        }
    })

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
            case 'login':
                if (props.loggedIn) {
                    // props.dispatch(userActions.logout());
                }
                break;
            case 'add_film':
                history.push(`${process.env.REACT_APP_PATH_NAME}add`);
                break;
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

        setTitle('')
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

    const handleToggle = () => {

    }

    const handleSearch = (query) => {
        setIsLoading(true)
        console.log(query)
        filmApi.search({ search: query }).then(({ data }) => {
            const options = data.map((film) => ({
                ...film,
                img: `${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`
            }));

            setOptions(options);
            setIsLoading(false);
        })

    }

    const handleLogin = () => {
        let pathname = location.pathname
        if (pathname === '/') pathname = ''
        history.push(`${pathname}/login`);
    }

    return (

        <Navbar
            className="p-2"
            expand="md" bg="light" variant="light"
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
                <Navbar.Toggle className="m-button" aria-controls="responsive-navbar-nav" onToggle={handleToggle} />
            </Col>

            <Col xs={{ span: 12, order: 3 }}
                sm={{ span: 8, order: 2 }}
                md={{ span: 5, order: 2 }}>
                <Form id="search-form" inline>
                    <Row className="m-0" style={{width: 100 + '%'}}>
                        <Col xs={12} sm={10} className="p-0">
                            <AsyncTypeahead
                                className="search-bar"
                                useCache={false}
                                filterBy={filterBy}
                                id="typeahead-navbar"
                                ref={typeaheadRef}
                                isLoading={isLoading}
                                placeholder="Search"
                                labelKey="title"
                                minLength={1}
                                options={options}
                                onSearch={handleSearch}
                                onChange={(selected) => {
                                    const title = selected.length > 0 ? selected[0].title : '';
                                    setTitle(title);
                                }}
                                renderMenuItemChildren={(option, props) => (
                                    <Row className="p-0 m-0 entry__inner">
                                        <img
                                            className="p-0"
                                            alt=""
                                            src={option.img}
                                            style={{
                                                height: '24px',
                                                marginRight: '10px',
                                                width: '24px',
                                            }}
                                        />
                                        <span className="entry__text">{option.title}</span>
                                    </Row>
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
                        <Nav.Link className="pr-2 pl-2" eventKey="add_film">Add</Nav.Link>

                        {console.log(user.name)}

                        {
                            user.auth ?
                                (

                                    <Avatar onClick={handleProfileMenuOpen}
                                        className="pr-2 pl-2 custom-avatar m-button">{user.name.toUpperCase().charAt(1)}</Avatar>

                                ) :
                                (<Nav.Link className="pr-2 pl-2" eventKey="login "
                                    onClick={() => handleLogin()}>Login</Nav.Link>)
                        }
                    </Nav>

                </Navbar.Collapse>

            </Col>

            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}>
                <MenuItem key="placeholder" style={{ display: "none" }} />
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

        </Navbar>
    )
}

export default NavbarComponent