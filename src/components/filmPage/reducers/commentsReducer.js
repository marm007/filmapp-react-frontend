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
            return {
                ...state,
                isLoading: true
            }
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
        case 'error': {
            return {
                ...state,
                isAdding: false,
                isLoading: false,
                error: action.payload,
            }
        }
        default: return state
    }
}