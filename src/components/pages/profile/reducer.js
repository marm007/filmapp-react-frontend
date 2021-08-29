import { pageMaxFetchCount } from "../../../config"

export const initialProfileState = {
    data: null,
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
                isAllFetched: action.filmsCount < pageMaxFetchCount && action.playlistsCount < pageMaxFetchCount,
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
                isAllFetched: action.filmsCount < pageMaxFetchCount && action.playlistsCount < pageMaxFetchCount,
                filmsCount: state.filmsCount + action.filmsCount,
                playlistsCount: state.playlistsCount + action.playlistsCount,
                data: [...new Set([...state.data, ...action.data])]
            }
        }
        case 'update-resource': {
            return state.data ? {
                ...state,
                data: state.data.map(record => {
                    if (Boolean(record.isPlaylist) === action.isPlaylist && record.id === action.resource.id) {
                        return { ...record, title: action.resource.title }
                    }

                    return record
                })
            } : state
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