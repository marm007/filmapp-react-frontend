import { filmsMaxFetchCount, playlistsMaxFetchCount } from "../../config"

export const initialProfileState = {
    data: [],
    isLoading: false,
    isAllFetched: false,
    isRemoving: false,
    toRemove: null,
    error: null,
    filmsCount: 0,
    playlistsCount: 0,
}

export function profileReducer(state, action) {
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
                isAllFetched: action.filmsCount < filmsMaxFetchCount && action.playlistsCount < playlistsMaxFetchCount,
                filmsCount: state.filmsCount + action.filmsCount,
                playlistsCount: state.playlistsCount + action.playlistsCount,
                data: [...new Set(action.data)]
            }
        }
        case 'load': {
            return !state.isLoading && !state.isAllFetched && state.isInitialLoaded && !state.error ?
                { ...state, isLoading: true, isAllFetched: false } :
                state
        }
        case 'success': {
            return {
                ...state,
                isLoading: false,
                isAllFetched: action.filmsCount < filmsMaxFetchCount && action.playlistsCount < playlistsMaxFetchCount,
                filmsCount: state.filmsCount + action.filmsCount,
                playlistsCount: state.playlistsCount + action.playlistsCount,
                data: [...new Set([...state.data, ...action.data])]
            }
        }
        case 'remove': {
            return {
                ...state,
                toRemove: action.payload,
                isRemoving: true
            }
        }
        case 'remove-success': {
            return {
                ...state,
                isRemoving: false,
                toRemove: null,
                data: state.toRemove ? state.data.filter(resource => resource.id !== state.toRemove.id) : state.data
            }
        }
        case 'change-playlist-privacy-success': {
            return {
                ...state,
                data: state.data.map(data => {
                    if (data.isPlaylist && data.id === action.payload.id) return { ...data, is_public: action.payload.is_public }
                    return data
                })
            }
        }
        case 'clear': {
            return initialProfileState
        }
        default: return state
    }
}