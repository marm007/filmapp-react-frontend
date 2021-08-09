import { commentsMaxFetchCount } from "../../../config"

export const commentsInitialState = {
    comments: null,
    commentsCount: null,
    text: '',
    id: null,
    isLoading: false,
    isAllFetched: false,
    isInitialLoaded: false,
    isAdding: false,
    isRemoving: false,
    toRemove: null,
    isSorting: false,
    sort: null,
    sorts: [
        { id: 'created_at', title: 'By date', dir: 1 },
        { id: 'author_name', title: 'By author name', dir: 1 }
    ],
    error: null
}

export function commentsReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'clear': {
            return {
                ...commentsInitialState,
                id: action.id
            }
        }
        case 'load': {
            return !state.isLoading && !state.isAllFetched && state.isInitialLoaded && !state.isAdding &&
                !state.error && state.id && !state.isSorting ?
                {
                    ...state,
                    isLoading: true
                } : state
        }
        case 'initial-success': {
            return {
                ...state,
                comments: action.comments,
                commentsCount: action.commentsCount,
                isAllFetched: action.comments.length < commentsMaxFetchCount,
                isInitialLoaded: true,
                error: null,
            }
        }
        case 'load-success': {
            return {
                ...state,
                comments: [...state.comments, ...action.payload],
                isLoading: false,
                isAllFetched: action.payload.length < commentsMaxFetchCount
            }
        }
        case 'add': {
            return {
                ...state,
                isAdding: true,
                error: null
            }
        }
        case 'add-success': {
            return {
                ...state,
                text: '',
                commentsCount: state.commentsCount + 1,
                comments: [action.payload, ...state.comments],
                isAdding: false
            }
        }
        case 'remove': {
            return {
                ...state,
                isRemoving: true,
                toRemove: action.payload
            }
        }
        case 'remove-success': {
            return {
                ...state,
                isRemoving: false,
                toRemove: null,
                commentsCount: state.commentsCount - 1,
                comments: state.toRemove ? state.comments.filter(comment => comment.id !== state.toRemove.id) : state.data
            }
        }
        case 'sort': {
            return {
                ...state,
                comments: null,
                isAllFetched: false,
                sorts: state.sorts.map(sort => {
                    if (sort.id === action.sortToChange.id) return action.sortToChange
                    else return sort
                }),
                sort: action.sort,
                isSorting: true,
            }
        }
        case 'sort-success': {
            return {
                ...state,
                isSorting: false,
                comments: action.payload,
            }
        }
        case 'error': {
            return {
                ...state,
                isAdding: false,
                isLoading: false,
                isSorting: false,
                error: action.payload,
            }
        }
        default: return state
    }
}