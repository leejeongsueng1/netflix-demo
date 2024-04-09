import {Alert} from "react-bootstrap";
import {MovieSlider} from "../../../../common/MovieSlider/MovieSlider";
import {responsive} from "../../../../constant/reponsive";
import {useUpcomingMoviesQuery} from "../../../../hooks/UpcomingMovie";

export const UpcomingMovieSlide = () => {
    const {data, isLoading, isError, error} = useUpcomingMoviesQuery();

    if (isLoading) {
        return <h1>Loading</h1>
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }


    return (
        <MovieSlider data={data} title={"Upcoming Movies"} responsive={responsive} />
    )
}