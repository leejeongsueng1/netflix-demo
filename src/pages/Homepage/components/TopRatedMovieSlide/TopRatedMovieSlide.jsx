import {Alert} from "react-bootstrap";
import {MovieSlider} from "../../../../common/MovieSlider/MovieSlider";
import {responsive} from "../../../../constant/reponsive";
import {useTopRatedMoviesQuery} from "../../../../hooks/TopRateMovie";

export const TopRatedMovieSlide = () => {
    const {data, isLoading, isError, error} = useTopRatedMoviesQuery();

    if (isLoading) {
        return <h1>Loading</h1>
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }


    return (
        <MovieSlider data={data} title={"Top Rated Movies"} responsive={responsive} />
    )
}