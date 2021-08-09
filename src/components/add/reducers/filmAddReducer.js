const setFileInitialState = (isFilm) => {
    return {
        file: null,
        name: isFilm ? CHOOSE_FILM : CHOOSE_THUMBNAIL,
        preview: null
    }
}

const alertInitialState = {
    type: '',
    message: ''
}

export const CHOOSE_FILM = `Choose a film `;
export const CHOOSE_THUMBNAIL = `Choose a thumbnail `;

export const filmAddInitialState = {
    title: '',
    description: '',
    film: setFileInitialState(true),
    thumbnail: setFileInitialState(false),
    isSubmitted: false,
    isSending: false,
    isSuccess: false,
    isError: false,
    error: null
}

export const filmAddReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                isError: false,
                error: null,
                [action.fieldName]: action.payload
            }
        }
        case 'file-add': {
            return action.isFilm === true ?
                {
                    ...state,
                    isError: false,
                    error: null,
                    alert: alertInitialState,
                    film: { file: action.file, name: action.fileName, preview: action.preview }
                } : {
                    ...state,
                    isError: false,
                    error: null,
                    alert: alertInitialState,
                    thumbnail: { file: action.file, name: action.fileName, preview: action.preview }
                }
        }
        case 'file-clear': {
            return action.isFilm === true ?
                {
                    ...state,
                    isError: false,
                    error: null,
                    film: setFileInitialState(true)
                } :
                {
                    ...state,
                    isError: false,
                    error: null,
                    thumbnail: setFileInitialState(false)
                }
        }
        case 'submit': {
            return {
                ...state,
                isError: false,
                error: null,
                alert: alertInitialState,
                isSubmitted: true
            }
        }
        case 'send': {
            return {
                ...state,
                isSending: true
            }
        }
        case 'success': {
            return {
                ...state,
                isSending: false,
                isSuccess: true
            }
        }
        case 'error': {
            return {
                ...state,
                isSending: false,
                isSuccess: false,
                isError: true,
                error: action.payload
            }
        }
        case 'error-422': {
            return {
                ...state,
                isError: true,
                error: action.payload,
                film: setFileInitialState(true),
                thumbnail: setFileInitialState(false)
            }
        }
        default: return state
    }
}