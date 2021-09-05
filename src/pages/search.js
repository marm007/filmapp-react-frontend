import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import SearchComponent from "../components/search";

export default function Search() {
    let location = useLocation()

    useEffect(() => {
        const searchParams = queryString.parse(location.search);
        document.title = searchParams.title ? `${searchParams.title} - FilmApp` : 'FilmApp'
    }, [location])

    return <SearchComponent />
}