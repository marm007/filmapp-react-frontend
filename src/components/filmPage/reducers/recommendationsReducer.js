import { recommendationsMaxFetchCount } from "../../../config"

export const recommendationsInitialState = {
    films: [],
    isLoading: true,
    isAllFetched: false,
    error: null,
}

export function recommendationsReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'clear': {
            return {
                ...recommendationsInitialState,
                id: action.payload
            }
        }
        case 'load': {

            return {
                ...state,
                isLoading: true,
                isAllFetched: false
            }
        }
        case 'success': {
            return {
                ...state,
                films: [...state.films, ...action.payload],
                isLoading: false,
                isAllFetched: action.payload.length < recommendationsMaxFetchCount
            }
        }
        case 'error': {
            return {
                ...recommendationsInitialState,
                isLoading: false,
                error: action.payload
            }
        }
        default: return state
    }
}
