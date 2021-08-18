import { useEffect, useReducer, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import queryString from 'query-string';
import TextTruncate from "react-text-truncate";
import Truncate from "react-truncate";

import { searchReducer, searchInitialState } from './reducer'

import BlurredImageComponent from '../../blurredImage'
import PlaylistAddButtonComponent from '../../add/playlistAddButton';

import * as filmApi from '../../../services/filmService'

import { pageMaxFetchCount } from '../../../config';

import { parseSearchDate, checkIfPlaylistButtonClick, jsxLoop } from '../../../helpers'
import useBottomScrollListener from '../../../helpers/hooks/useBottomScrollListener';
import RippleButton from '../../../helpers/components/rippleButton';

import "./search.css";
import SearchSkeleton from './skeleton';

let filters = [
    { id: 'last_hour', title: 'Last hour' },
    { id: 'today', title: 'Today' },
    { id: 'this_week', title: 'This week' },
    { id: 'this_month', title: 'This month' },
    { id: 'this_year', title: 'This year' },
];

const Search = () => {

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

    }, [dir, films, filter, isLoading, search, sort])

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
            <RippleButton className="mt-3 mx-4 search-button p-0"
                onClick={() => setIsOpen(!isOpen)}>
                <div
                    aria-controls="filter-collapse"
                    aria-expanded={isOpen}
                    data-bs-toggle="collapse" 
                    data-bs-target="#searchCollapse"
                    className="px-4 py-2">
                    <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faFilter} />
                </div>
            </RippleButton>
            <div className="collapse" id="searchCollapse">
                <div id="filter-collapse" className="row mx-2">
                    <div className="col col-sm-4 mt-4">
                        <p style={{ 'fontWeight': 500 }}>UPLOAD DATE</p>

                        <div className="col col-sm-8 mt-3 mb-3 divider" />

                        {
                            filters.map((filterTmp) => {
                                return (<p key={filterTmp.id} style={filter === filterTmp.id ?
                                    { fontWeight: 700, fontSize: 80 + '%' } :
                                    { fontWeight: 400, fontSize: 80 + '%' }}
                                    onClick={() => handleOnclick('filter', filterTmp)}
                                    className="search-filter">{filterTmp.title}</p>)
                            })
                        }

                    </div>

                    <div className="col col-sm-4 mt-4">
                        <p style={{ 'fontWeight': 500 }}>SORT BY</p>

                        <div className="col col-sm-8 mt-3 mb-3 divider" />

                        {
                            sorts.map((sortTmp) => {
                                return (<div key={sortTmp.id} className="col d-flex">
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
                                </div>)
                            })
                        }

                    </div>

                </div>
            </div>

            <div className="col col-sm-12 mt-2 mb-3 divider" />

            <div className="row mx-2 mt-4">
                {
                    films ? films.map((film, index) => {
                        const time = parseSearchDate(film);

                        return <div className="col-12 col-sm-12 col-lg-8"
                            key={film.id}>
                            <div className="col play-outer-container m-0 mb-1"
                                onClick={(e) => {
                                    const isPlaylistButton = checkIfPlaylistButtonClick(e.target)
                                    if (!isPlaylistButton) setRedirect(e, film.id)
                                }} >
                                <div className="row search-style mb-4 m-0">
                                    <div className="col-8 col-sm-4 p-0">
                                        <div className="embed-responsive embed-responsive-16by9 z-depth-1-half play-container">
                                            <BlurredImageComponent
                                                image={`${process.env.REACT_APP_API_URL}films/${film.id}/thumbnail`} />
                                            <FontAwesomeIcon className="play-middle" icon="play" />
                                        </div>
                                    </div>
                                    <div className="col-4 col-sm-8">
                                        <div className="row m-0">
                                            <div className="col p-0 mb-1"
                                                style={{
                                                    flex: '0 0 auto !important',
                                                    width: 'calc(83.33333333% - 24px) !important'
                                                }}>
                                                <Truncate lines={1}
                                                    className="mb-0 search-title fw-bold">
                                                    {film.title}
                                                </Truncate>
                                            </div>
                                            <div className="col d-flex justify-content-end">
                                                <PlaylistAddButtonComponent
                                                    index={index}
                                                    filmID={film.id} />
                                            </div>
                                        </div>
                                        <p className="d-none d-sm-inline mb-1 author-nick-search">
                                            <span>{film.author_name} &#183; {film.views} views &#183; {time}</span>
                                        </p>

                                        <p className="d-inline d-sm-none mb-0 author-nick">
                                            <span>{film.author_name} &#183; {film.views} views</span>
                                        </p>

                                        <span className="d-none d-sm-inline  author-nick-search">
                                            <TextTruncate className="mb-0"
                                                line={2} text={film.description} />
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    }) : [...jsxLoop(20, i =>
                        <SearchSkeleton key={i} />
                    )]
                }

            </div>

            {
                !isAllFetched && <div className="fetch-loader d-flex justify-content-center">
                    {
                        (isLoading) &&
                        <div className="spinner-border" />
                    }
                </div>
            }
        </>

    )
}

export default Search
