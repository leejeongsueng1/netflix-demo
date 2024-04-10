import {Badge} from "react-bootstrap";
import "./MovieCard.style.css"
import {useMovieGenreQuery} from "../../hooks/UseMovieGenre";

export const MovieCard = ({movie}) => {
    const {data: genreData} = useMovieGenreQuery();
    const showGenre = (genreIdList) => {
        if (!genreData) return [];
        const genreNameList = genreIdList.map((id) => {
            const genreObejct = genreData.find((genre) => genre.id === id)
            return genreObejct.name;
        });

        return genreNameList;
    }
    if (!movie.genre_ids) {
        return (
            <div style={{
                backgroundColor: "black"
            }}
                 className="movie-card"
            >
                <div className="overlay">
                    <h1 className="movie-title">{movie?.title}</h1>
                    <div className="movie-info">
                        <div>Score : {Math.round(movie?.vote_average * 100) / 100}</div>
                        <div>Popularity : {Math.round(movie?.popularity)}</div>
                        <div className={movie?.adult ? 'adult' : 'noAdult'}>{movie.adult ? 'ADULT' : 'ALL'}</div>
                        {/*<div>{showGenre(movie?.genre_ids).map((id) => <Badge bg="danger">{id}</Badge>)}</div>*/}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div style={{
            backgroundImage: `url("https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}")`
        }}
             className="movie-card"
        >
            <div className="overlay">
                <h1 className="movie-title">{movie?.title}</h1>
                <div className="movie-info">
                    <div>Score : {Math.round(movie?.vote_average * 100) / 100}</div>
                    <div>Popularity : {Math.round(movie?.popularity)}</div>
                    <div className={movie?.adult ? 'adult' : 'noAdult'}>{movie.adult ? 'ADULT' : 'ALL'}</div>
                    <div>{showGenre(movie?.genre_ids).map((id) => <Badge bg="danger">{id}</Badge>)}</div>
                </div>
            </div>
        </div>
    )
}