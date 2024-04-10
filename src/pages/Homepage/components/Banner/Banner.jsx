import {usePopularMoviesQuery} from "../../../../hooks/UsePopularMovies";
import {Alert, Button, Spinner} from "react-bootstrap";
import './Banner.style.css'

export const Banner = () => {

    const {data, isLoading, isError, error} = usePopularMoviesQuery();
    console.log('ddd', data);
    if (isLoading) {
        return (
            <div>
                <Spinner animation="border" variant="danger"
                         style={{
                             width: "5rem",
                             height: "5rem"
                         }}
                />
            </div>
        )
    }
    if (isError) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <p>{error}</p>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Button variant="outline-success">
                        메인 페이지로
                    </Button>
                </div>
            </Alert>
        )
    }

    return (
        <div style={{
            backgroundImage: `url("https://media.themoviedb.org/t/p/original${data?.results[0].poster_path}")`
        }}
             className="Banner"
        >
            <div className="text-white banner-text-area">
                <h1>{data?.results[0].title}</h1>
                <p>{data?.results[0].overview}</p>
            </div>
        </div>
    )
}