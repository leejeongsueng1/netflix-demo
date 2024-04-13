import {UseSearchMovie} from "../../hooks/UseSearchMovie";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Alert, Badge, Button, Col, Container, Dropdown, Row, Spinner} from "react-bootstrap";
import {MovieCard} from "../../common/MovieCard/MovieCard";
import ReactPaginate from 'react-paginate';
import {useEffect, useState} from "react";
import {useMovieGenreQuery} from "../../hooks/UseMovieGenre";
import './MoviePage.style.css'

/*
    TODO:
        경로 2가지
        1. nav바를 클릭해서 온 경우 => Popular Movie 보여주기
        2. keyword를 검색해서 온 경우 => keyword와 관련된 영화들을 보여줌
 */

export const MoviePage = () => {

    const [query, setQuery] = useSearchParams();
    const keyword = query.get("q");
    const [page, setPage] = useState(1);
    const [genreFilter, setGenreFilter] = useState([]);
    const [sortOpt, setSortOpt] = useState("");
    const [movieData, setMovieData] = useState(null);

    const sortOptList = [
        'Ascending', 'Descending'
    ];

    const navigator = useNavigate();
    const handleClick = (event, movie) => {
        event.preventDefault();
        navigator(`/movies/${movie.id}`);
    };
    const {data: genreData} = useMovieGenreQuery();

    const {data, isLoading, isError, error} = UseSearchMovie({keyword, page});

    const setSortedData = (opt) => {
        setSortOpt(opt);
        if (opt == "Ascending") {
            console.log(data);
            let tmp = data?.results.sort((a, b) => b.popularity - a.popularity);
            data.results = tmp;
            setMovieData(data);
        }
        if (opt == "Descending") {
            console.log(data);
            let tmp = data?.results.sort((a, b) => a.popularity - b.popularity);
            data.results = tmp;
            setMovieData(data);
        }
    }

    useEffect(() => {
        setMovieData(data);
    }, [data]);

    const addGenreFilter = (genreId) => {
        setGenreFilter(Array.from(new Set([...genreFilter, genreId])));
    };
    const dropGenreFilter = (genreId) => {
        const index = genreFilter.indexOf(genreId);
        genreFilter.splice(index, 1);
        setGenreFilter([...genreFilter]);
    };

    const handlePageClick = ({selected}) => {
        setPage(selected + 1);
    };

    const checkGenreInFilter = (genreFilter, genreList) => {
        let rtn = true;
        let rtns = [];
        for (const genre of genreFilter) {
            rtns.push(genreList.includes(genre));
        }
        for (const tmp of rtns) {
            rtn = rtn && tmp;
        }
        return rtn;
    };


    if (isLoading) {
        return (<div>
            <Spinner animation="border" variant="danger"
                     style={{
                         width: "5rem", height: "5rem"
                     }}
            />
        </div>)
    }
    if (isError) {
        return (<Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>{error}</p>
            <hr/>
            <div className="d-flex justify-content-end">
                <Button variant="outline-success">
                    메인 페이지로
                </Button>
            </div>
        </Alert>)
    }
    return (<Container style={{marginTop: "50px"}}>
        <Row>
            <Col lg={4} xs={12} className="genre-badge-ground">
                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
                            setFilter
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {genreData?.map((genre, idx) => <Dropdown.Item key={idx} itemID={genre?.name}
                                                                           className="genre-item"
                                                                           onClick={() => addGenreFilter(genre?.id)}>{genre?.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className={"badge_pool"}>
                    <div><h5>Genre Filters</h5></div>
                    {genreFilter?.map((selectedGenre, idx) => genreData.filter(key => key.id == selectedGenre).map((item, idx) =>
                        <Badge key={idx} bg="danger"
                               className={"genre_badge"}
                               onClick={() => {
                                   dropGenreFilter(selectedGenre)
                               }}
                        >{item?.name}
                        </Badge>))}
                </div>
                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
                            sortOption
                        </Dropdown.Toggle>

                        <Dropdown.Menu onClick={(event) => {
                            console.log(event.target.text);
                            setSortedData(event.target.text);
                        }}>
                            {sortOptList?.map((opt) => <Dropdown.Item className="genre-item"
                                                                      value={opt}>{opt}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className={"badge_pool"}>
                    <div><h5>Sorting {sortOpt}</h5></div>
                </div>
            </Col>
            <Col lg={8} xs={12}>
                <Row>
                    {movieData?.results.map((movie, idx) => (checkGenreInFilter(genreFilter, movie.genre_ids) ? <Col
                        key={idx} lg={4} xs={12} onClick={(event) => handleClick(event, movie)}>
                        <MovieCard key={idx} movie={movie}/>
                    </Col> : <></>))}
                </Row>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={movieData?.total_pages}    //total pages
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={page - 1}
                />
            </Col>
        </Row>
    </Container>)


}