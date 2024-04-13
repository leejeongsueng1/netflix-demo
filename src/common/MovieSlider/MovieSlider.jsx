import Carousel from "react-multi-carousel";
import {MovieCard} from "../MovieCard/MovieCard";
import './MovieSlider.style.css'
import 'react-multi-carousel/lib/styles.css';
import {useNavigate} from "react-router-dom";

export const MovieSlider = ({title, data, responsive}) => {



    return (
        <div>
            <h3>{title}</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass="movie-slider p-1"
                containerClass="carousel-container"
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={10000}
            >
                {data.results.map((movie,idx)=><MovieCard  movie={movie} key={idx}/>)}
            </Carousel>
        </div>
    )
}