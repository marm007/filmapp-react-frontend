import { commentsMaxFetchCount } from "../../../config"

export const commentsInitialState = {
    comments: null,
    commentsCount: null,
    currentSort: null,

    isLoading: false,
    isAllLoaded: false,
    isInitialLoaded: false,

    isAdding: false,
    isSorting: false,
    isRemoving: false,

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
                ...commentsInitialState
            }
        }
        case 'initial-success': {
            return {
                ...state,
                comments: action.payload.comments,
                commentsCount: action.payload.comments_count,
                isAllLoaded: action.payload.comments.length < commentsMaxFetchCount,
                isInitialLoaded: true,
                error: null,
            }
        }
        case 'load': {
            return state.isInitialLoaded && !state.isLoading && !state.isAllLoaded &&
                !state.isAdding && !state.isSorting && !state.isRemoving && !state.error ?
                {
                    ...state,
                    isLoading: true
                } : state
        }
        case 'load-success': {
            return {
                ...state,
                isLoading: false,
                comments: [...state.comments, ...action.payload],
                isAllLoaded: action.payload.length < commentsMaxFetchCount
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
                isAdding: false,
                comments: [action.payload, ...state.comments],
                commentsCount: state.commentsCount + 1,
            }
        }
        case 'remove': {
            return {
                ...state,
                isRemoving: true
            }
        }
        case 'remove-success': {
            return {
                ...state,
                isRemoving: false,
                commentsCount: state.commentsCount - 1,
                comments: state.comments.filter(comment => comment.id !== action.payload)
            }
        }
        case 'sort': {
            return {
                ...state,
                comments: null,
                isSorting: true,
            }
        }
        case 'sort-success': {
            return {
                ...state,
                isSorting: false,
                currentSort: action.payload.currentSort,
                comments: action.payload.comments,
            }
        }
        case 'error': {
            return {
                ...state,
                isLoading: false,
                isAdding: false,
                isSorting: false,
                error: action.payload,
            }
        }
        default: return state
    }
}