import Carousel from "react-multi-carousel";
import {MovieCard} from "../MovieCard/MovieCard";
import './MovieSlider.style.css'
import 'react-multi-carousel/lib/styles.css';
import {useNavigate} from "react-router-dom";

export const MovieSlider = ({title, data, responsive}) => {

    const navigator = useNavigate();
    const handleClick = (event,movie) =>{
        event.preventDefault();
        navigator(`/movies/${movie.id}`);
    }

    return (
        <div>
            <h3>{title}</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass="movie-slider p-1"
                containerClass="carousel-container"
                responsive={responsive}
            >
                {data.results.map((movie,idx)=><div onClick={(event)=>handleClick(event,movie)}><MovieCard  movie={movie} key={idx}  /></div>)}
            </Carousel>
        </div>
    )
}