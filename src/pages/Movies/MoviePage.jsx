import {UseSearchMovie} from "../../hooks/UseSearchMovie";
import {useParams, useSearchParams} from "react-router-dom";

/*
    TODO:
        경로 2가지
        1. nav바를 클릭해서 온 경우 => Popular Movie 보여주기
        2. keyword를 검색해서 온 경우 => keyword와 관련된 영화들을 보여줌
 */

export const MoviePage = () => {
    const [query,setQuery] = useSearchParams();
    const keyword = query.get("q");
    const {data,isLoading, isError,error} = UseSearchMovie({keyword});

    console.log(data);

    return (
        <>MoviePage</>
    )
}