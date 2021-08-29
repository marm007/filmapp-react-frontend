import { searchPageMaxFetchCount } from "../../../config"

export const searchInitialState = {
    films: null,
    isLoading: false,
    isAllFetched: false,
    isInitialLoaded: false,
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

export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'initial-success': {
            return {
                ...state,
                isLoading: false,
                isInitialLoaded: true,
                error: null,
                isAllFetched: action.payload.films.length < searchPageMaxFetchCount,
                films: action.payload.films,
                search: action.payload.params.search,
                sort: action.payload.params.sort,
                filter: action.payload.params.filter,
                dir: action.payload.params.dir,

            }
        }
        case 'load': {
            return !state.isLoading && !state.isAllFetched && state.isInitialLoaded && !state.error ? {
                ...state,
                isLoading: true,
            } : state
        }
        case 'load-success': {
            return {
                ...state,
                isLoading: false,
                error: null,
                isAllFetched: action.payload.length < searchPageMaxFetchCount,
                films: [...state.films, ...action.payload],
            }
        }
        case 'sorts-change': {
            return {
                ...state,
                sort: action.resetSort ? '' : state.sort,
                sorts: state.sorts.map(sort => {
                    if (sort.id === action.payload.id) return action.payload
                    else return sort
                })
            }
        }
        case 'error': {
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        }
        default: return state
    }
}
