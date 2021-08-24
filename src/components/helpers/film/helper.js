const recommendationsNormal = [
    'col-12 mb-4 container-px',
    'row p-0 m-0 play-outer-container remove-container p-0',
    'col-6 m-0 p-0',
    'col-6 col-sm-6',
    'row mx-0 mb-0',
    'mb-1 title'
]

const recommendationsSmall = [
    'col-12 col-md-3 col-lg-2 mb-4 container-px',
    'col play-outer-container remove-container p-0',
    'col-12 col-sm-12 p-0',
    'col-12 col-sm-12 p-0',
    'row mx-0 mb-0 mt-1',
    'mb-1 mt-1 title'
]

const searchNormal = [
    'col-12 col-lg-8 mx-0 mb-4 container-px',
    'row p-0 m-0 play-outer-container remove-container p-0',
    'col-6 col-sm-4 p-0',
    'col-6 col-sm-8',
    'row mx-0 mb-0',
    'mb-1 title'
]

const searchSmall = [
    'col-12 col-sm-12 col-md-3 col-lg-2 mb-4 container-px',
    'col play-outer-container remove-container p-0',
    'col-12 col-sm-12 p-0',
    'col-12 col-sm-12 p-0',
    'row mx-0 mb-0 mt-1',
    'mb-1 mt-1 title'
]

const all = [
    'col-12 col-sm-6 col-md-3 col-lg-2 mb-4 container-px',
    'col play-outer-container remove-container p-0',
    'col-12 col-sm-12 p-0',
    'col-12 col-sm-12 p-0',
    'row mx-0 mb-0 mt-1',
    'mb-1 mt-1 title'
]

const getFilmClass = (isRecommendations, isSearch, isSmallScreen) => {
    if (isRecommendations) {
        return isSmallScreen ?
            recommendationsSmall :
            recommendationsNormal
    } else if (isSearch) {
        return isSmallScreen ?
            searchSmall :
            searchNormal
    } else {
        return all
    }
}

export default getFilmClass