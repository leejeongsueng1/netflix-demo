import {Badge} from "react-bootstrap";
import "./MovieCard.style.css"
import {useMovieGenreQuery} from "../../hooks/UseMovieGenre";
import {useNavigate} from "react-router-dom";

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

    const navigator = useNavigate();
    const handleClick = (event,movie) =>{
        event.preventDefault();
        navigator(`/movies/${movie.id}`);
    }

    return (
        <div
            className="movie-card"
            style={{
                backgroundImage: `url("https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}")`
            }}
            onClick={(event)=>handleClick(event,movie)}
        >
            <div className="overlay">
                <h1 className="movie-title">{movie?.title}</h1>
                <div className="movie-info">
                    <div>Score : {Math.round(movie?.vote_average * 100) / 100}</div>
                    <div>Popularity : {Math.round(movie?.popularity)}</div>
                    <div className={movie?.adult ? 'adult' : 'noAdult'}>{movie?.adult ? 'ADULT' : 'ALL'}</div>
                    <div>{showGenre(movie?.genre_ids).map((id) => <Badge bg="danger">{id}</Badge>)}</div>
                </div>
            </div>
        </div>
    )
}