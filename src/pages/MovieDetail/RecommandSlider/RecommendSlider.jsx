import {MovieSlider} from "../../../common/MovieSlider/MovieSlider";
import {responsive} from "../../../constant/reponsive";

export const RecommendSlider = ({data}) => {
    responsive.desktop.items = 4;
    responsive.desktop.slidesToSlide = 4;
    if(!data){
        return <div>No Recommendation</div>
    }
    return (
        <MovieSlider data={data} title={"If You Like This Movie"} responsive={responsive}  />
    )
}