import React, { useEffect, useReducer, useState, useCallback } from 'react';
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
import useBottomScrollListener from '../../helpers/hooks/useBottomScrollListener';

import BlurredImageComponent from '../blurredImage'

import { searchReducer, searchInitialState } from './reducer'
import { pageMaxFetchCount } from '../../config';
import { faFilter } from '@fortawesome/free-solid-svg-icons'

let filters = [
    { id: 'last_hour', title: 'Last hour' },
    { id: 'today', title: 'Today' },
    { id: 'this_week', title: 'This week' },
    { id: 'this_month', title: 'This month' },
    { id: 'this_year', title: 'This year' },
];

const Search = (props) => {

    const history = useHistory();
    const location = useLocation();

    const [state, dispatch] = useReducer(searchReducer, searchInitialState)

    const { films, isLoading, isAllFetched, search, sort, filter, dir, sorts, error, isInitialLoaded } = state

    const [isOpen, setIsOpen] = useState(false)

    const handleSearchOnBottom = useCallback(() => {
        if (!isLoading && !isAllFetched && !error && isInitialLoaded) {
            dispatch({
                type: 'load'
            })
        }
    }, [error, isAllFetched, isInitialLoaded, isLoading])

    useBottomScrollListener(handleSearchOnBottom)

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
                type: 'initial-success',
                payload: { films: location.state.films, params: params }
            })
        }

        async function getFilms() {
            await filmApi.search({ ...params, limit: pageMaxFetchCount })
                .then(res => {
                    dispatch({
                        type: 'initial-success',
                        payload: { films: res.data, params: params }
                    })
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                    console.error(err)
                })
        }

        if (location.state && location.state.films) getSearchedFilms()
        else getFilms()

    }, [location])

    useEffect(() => {
        async function getFilms() {
            await filmApi.search({
                search: search,
                sort: sort,
                filter: filter,
                dir: dir,
                skip: films.length,
                limit: pageMaxFetchCount
            })
                .then(res => {
                    dispatch({
                        type: 'load-success',
                        payload: res.data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: 'error'
                    })
                    console.error(err)
                })
        }

        if (isLoading) getFilms()

    }, [dir, films.length, filter, isLoading, search, sort])

    const setRedirect = (e, filmID) => {
        history.push(`${process.env.REACT_APP_PATH_NAME}film/` + filmID);
    };


    const handleOnclick = (state, type) => {

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
            let tmpType = type;

            if (sortClick === type.id) {
                sortClick = type.id;


                if (tmpType.dir === 1) {
                    tmpType.dir = -1;
                    dirClick = type.dir;
                } else if (tmpType.dir === -1) {
                    tmpType.dir = 1;
                    sortClick = '';
                }

                dispatch({
                    type: 'sorts-change',
                    payload: tmpType,
                    resetSort: sortClick === ''
                })

                dirClick = type.dir

            } else {
                sortClick = type.id;
                dirClick = type.dir;
            }

        }


        if (sortClick !== '' && filterClick !== '') {
            history.push({
                search: `?title=${search}&sort=${sortClick}&dir=${dirClick}&filter=${filterClick}`,
            });

        } else if (sortClick === '' && filterClick !== '') {
            history.push({
                search: `?title=${search}&filter=${filterClick}`,
            });
        } else if (sortClick !== '' && filterClick === '') {
            history.push({
                search: `?title=${search}&sort=${sortClick}&dir=${dirClick}`,
            });
        } else if (sortClick === '' && filterClick === '') {
            history.push({
                search: `?title=${search}`,
            });
        }

    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                aria-controls="filter-collapse"
                aria-expanded={isOpen}
                className="mt-3 mx-3 p-2 m-button">
                <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faFilter} />
            </Button>

            <Collapse in={isOpen}>
                <Row id="filter-collapse" className="mx-2">
                    <Col className="mt-4" sm={4}>
                        <p style={{ 'fontWeight': 500 }}>UPLOAD DATE</p>

                        <Col sm={8} className="mt-3 mb-3 divider" />


                        {
                            filters.map((filterTmp) => {
                                return (<p key={filterTmp.id} style={filter === filterTmp.id ?
                                    { fontWeight: 700, fontSize: 80 + '%' } :
                                    { fontWeight: 400, fontSize: 80 + '%' }}
                                    onClick={() => handleOnclick('filter', filterTmp)}
                                    className="search-filter">{filterTmp.title}</p>)
                            })
                        }

                    </Col>

                    <Col className="mt-4" sm={4}>
                        <p style={{ 'fontWeight': 500 }}>SORT BY</p>

                        <Col sm={8} className="mt-3 mb-3 divider" />

                        {
                            sorts.map((sortTmp) => {
                                return (<Col key={sortTmp.id} className="d-flex">
                                    <p style={sort === sortTmp.id ?
                                        { fontWeight: 700, fontSize: 80 + '%' } :
                                        { fontWeight: 400, fontSize: 80 + '%' }}
                                        onClick={() => handleOnclick('sort', sortTmp)}
                                        className="search-filter">{sortTmp.title}
                                    </p>
                                    {sort === sortTmp.id && sortTmp.dir === 1 ?
                                        <FontAwesomeIcon className="ms-2" icon="sort-up" /> :
                                        sort === sortTmp.id && sortTmp.dir === -1 ?
                                            <FontAwesomeIcon className="ms-2" icon="sort-down" /> : ""}
                                </Col>)
                            })
                        }

                    </Col>

                </Row>
            </Collapse>

            <Col sm={12} className="mt-2 mb-3 divider" />

            <Row className="mx-2 mt-4">
                {
                    films.map((film, index) => {
                        const time = parseSearchDate(film);

                        return <Col xs={12} sm={12} lg={8}
                            key={film.id}>
                            <Col className="play-outer-container m-0 mb-1"
                                onClick={(e) => {
                                    const isPlaylistButton = checkIfPlaylistButtonClick(e.target)
                                    if (!isPlaylistButton) setRedirect(e, film.id)


                                }} >
                                <Row className="search-style mb-4 m-0">
                                    <Col xs={8} sm={4} className="p-0">
                                        <div className="embed-responsive embed-responsive-16by9 z-depth-1-half play-container">
                                            <BlurredImageComponent
                                                image={`${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail?width=small_webp`} />
                                            <FontAwesomeIcon className="play-middle" icon="play" />
                                        </div>
                                    </Col>
                                    <Col xs={4} sm={8}>
                                        <Row className="m-0">
                                            <Col className="p-0 mb-1"
                                                style={{
                                                    flex: '0 0 auto !important',
                                                    width: 'calc(83.33333333% - 24px) !important'
                                                }}>
                                                <Truncate lines={1}
                                                    className="mb-0 search-title fw-bold">
                                                    {film.title}
                                                </Truncate>
                                            </Col>
                                            <Col className="d-flex justify-content-end">
                                                <PlaylistAddButtonComponent
                                                    index={index}
                                                    filmID={film.id} />
                                            </Col>
                                        </Row>
                                        <p className="d-none d-sm-inline mb-1 author-nick-search">
                                            <small>{film.author_name} &#183; {film.views} views &#183; {time}</small>
                                        </p>

                                        <p className="d-inline d-sm-none mb-0 author-nick-color">
                                            <small>{film.author_name} &#183; {film.views} views</small>
                                        </p>

                                        <small className="d-none d-sm-inline">
                                            <TextTruncate className="mb-0 author-nick-search"
                                                line={2} text={film.description} />
                                        </small>

                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    })
                }

            </Row>

            {
                !isAllFetched && <div style={{ height: 32 + 'px', width: '100%' }} className="d-flex justify-content-center">
                    {(isLoading || !isInitialLoaded) && <Spinner animation="border" />}
                </div>
            }
        </>

    )
}

export default Search
