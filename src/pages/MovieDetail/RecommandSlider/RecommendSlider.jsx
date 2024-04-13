import {MovieSlider} from "../../../common/MovieSlider/MovieSlider";
import {responsive} from "../../../constant/reponsive";

export const RecommendSlider = ({data}) => {
    responsive.desktop.items = 5;
    responsive.desktop.slidesToSlide = 3;
    console.log(data);
    if(!data){
        return <div>No Recommendation</div>
    }
    return (
        <MovieSlider data={data} title={"If You Like This Movie"} responsive={responsive}  />
    )
}