/*
    TODO:
     1. 배너 만들기 => popular 영화를 들고와서 첫번째 아이템을 보여주자.
     2. popular movie
     3. top rated movie
     4. upcoming movie
*/
import {Banner} from "./components/Banner/Banner";
import {PopularMovieSlide} from "./components/PopularMovieSlide/PopularMovieSlide";

 export const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularMovieSlide></PopularMovieSlide>
        </div>
    )
}