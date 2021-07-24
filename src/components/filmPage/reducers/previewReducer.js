const initialFilm = {
    img: '',
    video: '',
    film: '',
    title: '',
    views: '',
    likes: '',
    dislikes: '',
    description: `\r\n\n\n`,
}

export const initialPreviewState = {
    film: initialFilm,
    isLiked: false,
    isDisliked: false,
    isLikeButtonClicked: false,
    likeAction: null,
    isDescExpanded: false
}

export function previewReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'like': {
            return {
                ...state,
                isLikeButtonClicked: true,
                likeAction: action.payload
            }
        }
        case 'success': {
            return {
                ...state,
                film: action.film,
                isLiked: action.isLiked,
                isDisliked: action.isDisliked,
                isLikeButtonClicked: false,
                likeAction: null,
                isDescExpanded: false
            }
        }
        case 'error': {
            return {
                ...state,
                isLikeButtonClicked: false,
                likeAction: null
            }
        }
        default: return state
    }
}