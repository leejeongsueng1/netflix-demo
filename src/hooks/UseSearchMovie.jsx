import {useQuery} from "@tanstack/react-query";
import {api} from "../utils/api";
const fetchSearchMovies =({keyword}) => {
    console.log("fetch",keyword);
    return keyword
        ? api.get(`search/movie?query=${keyword}`)
        : api.get('movie/popular');

}

export const UseSearchMovie = ({keyword}) => {
    console.log("useQuery",keyword);
    return useQuery({
        queryKey: ['movie-search', keyword],
        queryFn: fetchSearchMovies({keyword}),

    });
}