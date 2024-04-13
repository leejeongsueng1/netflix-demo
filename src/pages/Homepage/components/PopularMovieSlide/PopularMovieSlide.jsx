import {usePopularMoviesQuery} from "../../../../hooks/UsePopularMovies";
import {Alert} from "react-bootstrap";
import {MovieSlider} from "../../../../common/MovieSlider/MovieSlider";
import {responsive} from "../../../../constant/reponsive";

export const PopularMovieSlide = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery();

    if (isLoading) {
        return <h1>Loading</h1>
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }
    return (
        <MovieSlider data={data} title={"Top Popular Movies"} responsive={responsive} />
    )
}