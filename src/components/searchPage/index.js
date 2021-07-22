import React, { useEffect, useReducer, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import { Col, Collapse, Row, Spinner } from 'react-bootstrap';

import "./search.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

import queryString from 'query-string';

import TextTruncate from "react-text-truncate";
import Truncate from "react-truncate";

import PlaylistAddButtonComponent from '../add/playlistAddButton';


import { parseSearchDate, checkIfPlaylistButtonClick } from '../../helpers'
import * as filmApi from '../../services/filmService'

const pathName = process.env.REACT_APP_PATH_NAME;

let filters = [
    { id: 'last_hour', title: 'Last hour' },
    { id: 'today', title: 'Today' },
    { id: 'this_week', title: 'This week' },
    { id: 'this_month', title: 'This month' },
    { id: 'this_year', title: 'This year' },
];

const searchInitialState = {
    films: [],
    isLoading: true,
    isAllFetched: false,
    error: null,
    search: '',
    filter: '',
    sort: '',
    dir: 1,
    sorts: [
        { id: 'upload_date', title: 'Upload date', dir: 1 },
        { id: 'view_count', title: 'View count', dir: 1 },
        { id: 'rating', title: 'Rating', dir: 1 },
    ]

}

const searchReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'success': {
            return {
                ...state,
                isLoading: false,
                films: action.payload.films,
                search: action.payload.params.search,
                sort: action.payload.params.sort,
                filter: action.payload.params.filter,
                dir: action.payload.params.dir,

            }
        }
        case 'error': {
            return {
                ...state,
                isLoading: false,
            }
        }
        default: return state
    }
}

const Search = (props) => {

    const history = useHistory();
    const location = useLocation();

    const [state, dispatch] = useReducer(searchReducer, searchInitialState)

    const { films, isLoading, isAllFetched, search, sort, filter, dir, sorts } = state

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {

        let searchParams = queryString.parse(location.search);

        const params = {
            search: searchParams.title,
            sort: searchParams.sort ?? '',
            filter: searchParams.filter ?? '',
            dir: searchParams.dir ?? 1
        }

        function getSearchedFilms() {
            dispatch({
                type: 'success',
                payload: { films: location.state.films, params: params }
            })
        }

        async function getFilms() {
            await filmApi.search(params)
                .then(res => {
                    console.log('params', params)
                    dispatch({
                        type: 'success',
                        payload: { films: res.data, params: params }
                    })
                    console.log(res)
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                    console.error(err)
                })
        }

        if (location.state) getSearchedFilms()
        else getFilms()

    }, [location])


    const setRedirect = (e, filmID) => {
        history.push(`${pathName}film/` + filmID);
    };


    const handleOnclick = (state, type) => {

        console.log('searc', search)

        let filterClick = filter;
        let sortClick = sort;
        let dirClick = dir;

        if (state === 'filter') {
            if (filterClick === type.id) {
                filterClick = '';
            } else {
                filterClick = type.id;
            }
        } else {
            if (sortClick === type.id) {
                sortClick = type.id;


                if (type.dir === 1) {
                    type.dir = -1;
                    dirClick = type.dir;
                } else if (type.dir === -1) {
                    type.dir = 1;
                    sortClick = '';
                }

                dirClick = type.dir

            } else {
                sortClick = type.id;
                dirClick = type.dir;
            }

        }


        if (sortClick !== '' && filterClick !== '') {
            props.history.push({
                search: `?title=${search}&sort=${sortClick}&dir=${dirClick}&filter=${filterClick}`,
            });

        } else if (sortClick === '' && filterClick !== '') {
            props.history.push({
                search: `?title=${search}&filter=${filterClick}`,
            });
        } else if (sortClick !== '' && filterClick === '') {
            props.history.push({
                search: `?title=${search}&sort=${sortClick}&dir=${dirClick}`,
            });
        } else if (sortClick === '' && filterClick === '') {
            props.history.push({
                search: `?title=${search}`,
            });
        }

    };

    return (
        <Col>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                aria-controls="filter-collapse"
                aria-expanded={isOpen}
                className="mt-3 p-2 m-button">
                <FontAwesomeIcon style={{ cursor: "pointer" }} icon="filter" />
            </Button>

            <Collapse in={isOpen}>
                <Row id="filter-collapse">
                    <Col className="mt-4" sm={4}>
                        <p style={{ 'fontWeight': 500 }}>UPLOAD DATE</p>

                        <Col sm={8} className="mt-3 mb-3 divider" />


                        {
                            filters.map((filterTmp) => {
                                return (<p key={filterTmp.id} style={filter === filterTmp.id ?
                                    { fontWeight: 700, fontSize: 80 + '%' } :
                                    { fontWeight: 400, fontSize: 80 + '%' }}
                                    onClick={() => handleOnclick('filter', filterTmp)}
                                    className="filter-search">{filterTmp.title}</p>)
                            })
                        }

                    </Col>

                    <Col className="mt-4" sm={4}>
                        <p style={{ 'fontWeight': 500 }}>SORT BY</p>

                        <Col sm={8} className="mt-3 mb-3 divider" />

                        {
                            sorts.map((sortTmp) => {
                                return (<Row key={sortTmp.id} className="ml-0">
                                    <p style={sort === sortTmp.id ?
                                        { fontWeight: 700, fontSize: 80 + '%' } :
                                        { fontWeight: 400, fontSize: 80 + '%' }}
                                        onClick={() => handleOnclick('sort', sortTmp)}
                                        className="filter-search">{sortTmp.title}
                                    </p>
                                    {sort === sortTmp.id && sortTmp.dir === 1 ?
                                        <FontAwesomeIcon className="ml-2" icon="sort-up" /> :
                                        sort === sortTmp.id && sortTmp.dir === -1 ?
                                            <FontAwesomeIcon className="ml-2" icon="sort-down" /> : ""}
                                </Row>)
                            })
                        }

                    </Col>

                </Row>
            </Collapse>

            <Col sm={12} className="mt-2 mb-3 divider" />

            <Row>

                <Col className="mt-4">
                    {
                        films.map((film, index) => {
                            const time = parseSearchDate(film);

                            return <Col xs={12} sm={12} lg={8}
                                className="film-play-outer-container m-0 mb-1 container"
                                onClick={(e) => {
                                    const isPlaylistButton = checkIfPlaylistButtonClick(e.target)
                                    if (!isPlaylistButton) setRedirect(e, film.id)
                                    

                                }} key={film.id}>

                                <Row className="style-search mb-4">
                                    <Col xs={8} sm={4}>
                                        <div className="embed-responsive embed-responsive-16by9 z-depth-1-half film-play-container">
                                            <img alt="" className="film-play-image embed-responsive-item"
                                                src={`${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small`} />
                                            <FontAwesomeIcon className="film-play-middle" icon="play" />
                                        </div>
                                    </Col>
                                    <Col xs={4} sm={8} className="p-0 ">
                                        <Row className="m-0">
                                            <Col xs={10} sm={10} className="p-0 mb-1">
                                                <Truncate lines={1} id="s-c-2"
                                                    className="mb-0 title-search font-weight-bold">
                                                    {film.title}
                                                </Truncate>
                                            </Col>

                                            <PlaylistAddButtonComponent
                                                index={index}
                                                filmID={film.id} />
                                        </Row>
                                        <p className="d-none d-sm-inline mb-1 author-nick-search">
                                            <small>{film.author_name} &#183; {film.views} views &#183; {time}</small>
                                        </p>

                                        <p className="d-inline d-sm-none mb-0 author-nick">
                                            <small>{film.author_name} &#183; {film.views} views</small>
                                        </p>

                                        <small className="d-none d-sm-inline">
                                            <TextTruncate id="s-c-4" className="mb-0 author-nick-search"
                                                line={1} text={film.description} />
                                        </small>

                                    </Col>
                                </Row>
                            </Col>
                        })
                    }

                </Col>
            </Row>
        </Col>

    )
}

export default Search
