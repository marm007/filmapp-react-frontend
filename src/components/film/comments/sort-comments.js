/* eslint-disable jsx-a11y/anchor-is-valid */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { commentsMaxFetchCount } from "../../../config";
import { sort } from '../../../services/commentService'

export default function SortComments({ filmId, dispatch }) {

    const [isSorting, setIsSorting] = useState(false)
    const [currentSort, setCurrentSort] = useState(null)
    const [sorts, setSorts] = useState([
        { id: 'created_at', title: 'By date', dir: 1 },
        { id: 'author_name', title: 'By author name', dir: 1 }
    ])


    const handleSortComments = (event, id) => {
        event.preventDefault()
        const sortToChange = id === 'created_at' ? sorts[0] : id === 'author_name' ? sorts[1] : null
        if (!sortToChange) return

        setIsSorting(true)

        if (currentSort && currentSort.id === sortToChange.id) {
            sortToChange.dir *= -1
            if (sortToChange.dir === 1) { setCurrentSort(null) }
            else { setCurrentSort(sortToChange) }
        } else {
            setCurrentSort(sortToChange)
        }

        setSorts(sorts.map(sort => sort.id === sortToChange.id ? sortToChange : sort))
        dispatch({ type: 'sort' })

        let params = { limit: commentsMaxFetchCount }
        params = sortToChange ? { ...params, [sortToChange.id]: sortToChange.dir } : params

        return sort(filmId, params)
            .then(res => {
                setIsSorting(false)
                dispatch({ type: 'sort-success', payload: { comments: res.data, currentSort } })
            })
            .catch(err => {
                setIsSorting(false)
                dispatch({ type: 'error', payload: 'Sort error.' })
                console.error(err)
            })
    };

    return (
        <>
            <div className="dropdown col-2 col-sm-2">
                <button className="btn btn-secondary dropdown-toggle" id="sortDropDown"
                    data-toggle="dropdown" aria-expanded="false">
                    Sort
                </button>
                <ul className="dropdown-menu" aria-labelledby="#sortDropDown">
                    {
                        sorts.map(_sort => {
                            return (
                                <li key={_sort.id} onClick={(event) => handleSortComments(event, _sort.id)}>
                                    <a className={`dropdown-item${(currentSort && _sort.id === currentSort.id) ? ' active' : ''}`}
                                        href="#" role="button">
                                        {_sort.title}
                                        {
                                            !currentSort ? '' :
                                                currentSort.id === _sort.id && _sort.dir === 1 ?
                                                    <FontAwesomeIcon className="ml-2" icon="sort-up" /> :
                                                    currentSort.id === _sort.id && _sort.dir === -1 ?
                                                        <FontAwesomeIcon className="ml-2" icon="sort-down" /> :
                                                        ''
                                        }
                                    </a>
                                </li>);
                        })
                    }

                </ul>
            </div>
            {
                isSorting && <div style={{ height: 32 + 'px' }} className="d-flex justify-content-center">
                    <div className="spinner-border" />
                </div>
            }
        </>
    )
}