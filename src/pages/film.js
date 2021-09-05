import FilmProvider from '../contexts/film/filmProvider'
import FilmComponent from '../components/film'

export default function Film() {

    return (

        <FilmProvider>
            <FilmComponent />
        </FilmProvider>
    )

}