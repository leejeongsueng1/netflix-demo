import {useMovieDetailQuery} from "../../hooks/UseMovieDetail";
import {useParams} from "react-router-dom";
import {Badge, ButtonGroup, Col, Container, Row, ToggleButton} from "react-bootstrap";
import {useState} from "react";
import {useMovieRecommendQuery} from "../../hooks/UseRecommendation";
import {useMovieReviewQuery} from "../../hooks/UseMovieReviews";
import {RecommendSlider} from "./RecommandSlider/RecommendSlider";
import {Review} from "./Reivews/Review";
import {MoviePreview} from "./Preview/MoviePreview";
import './MovieDetail.style.css'
import popularity from "./imgs/popularity.png";
import rating from "./imgs/rating.png";


export const MovieDetail = () => {
    const [modalShow, setModalShow] = useState(false);
    const onClickPreiview = () => {
        setModalShow(true);
    };
    const [radioValue, setRadioValue] = useState('1');
    const radios = [{name: 'Review', value: '1'}, {name: 'Recommend', value: '2'}, {
        name: "Preview", value: '3'
    }];

    const {id} = useParams();
    const movieId = id;
    const {data, isLoading, isError, error} = useMovieDetailQuery(movieId);
    const {data: review_data} = useMovieReviewQuery(movieId);
    const {data: recommend_data} = useMovieRecommendQuery(movieId);

    return (
        <>
            <MoviePreview show={modalShow} onHide={() => setModalShow(false)} movieId={movieId}/>
            <Container>

                <Row className="mt-5">
                    <Col lg={5} style={{alignItems: "center", justifyContent: 'center'}}>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <div className={"poster"}>
                                <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}`}
                                     alt={""}/>
                            </div>
                        </div>
                    </Col>
                    <Col lg={7}>
                        <h1>{data?.title}</h1>
                        <div>{data?.genres.map(({name}) => <Badge className="m-lg-1"
                                                                  bg="danger"> {name}  </Badge>)}</div>
                        <div className={"popularity-info"}><img style={{
                            height: "30px",
                            color: "whitesmoke",
                            filter: "invert(100%) sepia(0%) saturate(7500%) hue-rotate(83deg) brightness(99%) contrast(103%)"
                        }} src={popularity}/>{data?.vote_count} &nbsp;&nbsp; <img
                            style={{height: "30px", color: "whitesmoke"}}
                            src={rating}/>{data?.popularity} &nbsp; {data?.adult ?
                            <fragment style={{color: "red", fontWeight: "bold"}}>ADULT</fragment> :
                            <fragment style={{color: "green", fontWeight: "bold"}}>ALL</fragment>}</div>
                        <hr style={{border: "0", height: "3px", background: "white"}}/>
                        <p>{data?.overview}</p>
                        <hr style={{border: "0", height: "3px", background: "white"}}/>
                        <div><Badge className="m-lg-1"
                                    bg="danger">Budget</Badge>&nbsp;${Number(data?.budget).toLocaleString('en-US')}
                        </div>
                        <div><Badge className="m-lg-1"
                                    bg="danger">Revenue</Badge>&nbsp;${Number(data?.revenue).toLocaleString('en-US')}
                        </div>
                        <div><Badge className="m-lg-1" bg="danger">Release Date</Badge>&nbsp;{data?.release_date}</div>
                        <div><Badge className="m-lg-1" bg="danger">Run Time</Badge>&nbsp;{data?.runtime} min</div>
                    </Col>
                </Row>
                <Row>
                    <Container>
                        <Row>
                            <ButtonGroup style={{margin: "10px 10px"}}>
                                {radios.map((radio, idx) => (<ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={'outline-danger'}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                    onClick={(radio?.value == 3) ? onClickPreiview : null}
                                >
                                    {radio.name}
                                </ToggleButton>))}
                            </ButtonGroup>
                        </Row>
                    </Container>
                </Row>
                {(radioValue == 1) ? <Col>
                    {review_data?.results.map((review, idx) => <Review review={review}/>)}
                </Col> : <></>}
            </Container>
            {(radioValue == 1) ? <></> : <Container><div><RecommendSlider className="recommendation" data={recommend_data}/></div></Container>}


        </>)
}