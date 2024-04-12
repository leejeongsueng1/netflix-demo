import {UseSearchMovie} from "../../hooks/UseSearchMovie";
import {useSearchParams} from "react-router-dom";
import {Alert, Badge, Button, Col, Container, Row, Spinner} from "react-bootstrap";
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
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState('');

    const keyword = query.get("q");
    const {data: genreData} = useMovieGenreQuery();
    const {data, isLoading, isError, error} = UseSearchMovie({keyword, page});

    const handlePageClick = ({selected}) => {
        setPage(selected + 1);
    };

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

    if (!genre) {
        return (
            <Container style={{marginTop: "50px"}}>
                <Row>
                    <Col lg={4} xs={12} className="genre-badge-ground">
                        {genreData.map((genre) => <div itemID={genre.name} className="genre-item"
                                                       onClick={() => setGenre(genre.id)}>{genre.name}</div>)}
                    </Col>
                    <Col lg={8} xs={12}>
                        <Row className={"movie-page-list"}>
                            {data?.results.map((movie, idx) =><div> <Col key={idx} lg={4} xs={12}>
                                <MovieCard movie={movie}/>
                            </Col></div>)}
                        </Row>
                        <ReactPaginate
                            previousLabel="이전"
                            nextLabel="다음"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={4}
                            marginPagesDisplayed={null}
                            pageCount={data?.total_pages}    //total pages
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
            </Container>
        )
    } else {
        return (
            <Container style={{marginTop: "50px"}}>
                <Row>
                    <Col lg={4} xs={12} className="genre-badge-ground">
                        {genreData.map((item) => <div itemID={item.name} className={genre === item.id ? "genre-item-selected":"genre-item"}
                                                       onClick={() => setGenre(item.id)}>{item.name}</div>)}
                    </Col>
                    <Col lg={8} xs={12}>
                        <Row>
                            {data?.results.filter((movie)=> movie.genre_ids.includes(genre)).map((movie, idx) => <Col key={idx} lg={4} xs={12}>
                                <MovieCard movie={movie}/>
                            </Col>)}
                        </Row>
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={data?.total_pages}    //total pages
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
            </Container>
        )
    }


}