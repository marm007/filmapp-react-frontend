import useWindowsWidth from "../hooks/use-window-width";
import FilmRow from './film-row'
import FilmColumn from './film-column'

const FilmFluid = (props) => {
    const isSmallScreen = useWindowsWidth(props.isRecommendations ? 768 : 576)

    return isSmallScreen ? <FilmRow {...props} /> : <FilmColumn {...props} />
}

export default FilmFluid