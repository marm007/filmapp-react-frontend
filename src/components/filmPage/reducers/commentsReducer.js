import { commentsMaxFetchCount } from "../../../config"

export const commentsInitialState = {
    comments: [],
    commentsLength: 0,
    isLoading: true,
    isAllFetched: false,
    commentsLoaded: false,
    text: '',
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
                comments: action.payload,
                commentsLength: action.payload.length,
                commentsLoaded: true
            }
        }
        case 'load': {
            return {
                ...state,
                isLoading: true,
                isAllFetched: false
            }
        }
        case 'load-success': {
            const newComments = [...state.comments, ...action.payload]
            return {
                ...state,
                comments: newComments,
                commentsLength: newComments.length,
                isLoading: false,
                isAllFetched: action.payload.length < commentsMaxFetchCount
            }
        }
        case 'add': {
            return {
                ...state,
                isAdding: true
            }
        }
        case 'add-success': {
            return {
                ...state,
                text: '',
                comments: [action.payload, ...state.comments],
                isAdding: false
            }
        }
        case 'error': {
            return {
                ...commentsInitialState,
                isLoading: false,
                isAdding: false,
                error: '',
            }
        }
        default: return state
    }
}