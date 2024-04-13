import {useMovieDetailQuery} from "../../hooks/UseMovieDetail";
import {useParams} from "react-router-dom";
import {Badge, ButtonGroup, Col, Container, Row, ToggleButton} from "react-bootstrap";
import {useState} from "react";
import {useMovieRecommendQuery} from "../../hooks/UseRecommendation";
import {useMovieReviewQuery} from "../../hooks/UseMovieReviews";
import {RecommendSlider} from "./RecommandSlider/RecommendSlider";
import {Review} from "./Reivews/Review";
import {MoviePreview} from "./Preview/MoviePreview";

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


    console.log(data);
    console.log(review_data);
    console.log(recommend_data);


    return (<Container>
        <MoviePreview show={modalShow} onHide={() => setModalShow(false)} movieId={movieId}/>
        <Row className="mt-5">
            <Col lg={5} style={{alignItems: "center", justifyContent: 'center'}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div className={"poster"}>
                        <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}`} alt={""}/>
                    </div>
                </div>
            </Col>
            <Col lg={7}>
                <h1>{data?.title}</h1>
                <div>{data?.genres.map(({name}) => <Badge className="m-lg-1" bg="danger"> {name}  </Badge>)}</div>
                <div>{data?.vote_count} {data?.popularity} {data?.adult ?
                    <fragment style={{color: "red", fontWeight: "bold"}}>ADULT</fragment> :
                    <fragment style={{color: "green", fontWeight: "bold"}}>ALL</fragment>}</div>
                <hr style={{border: "0", height: "3px", background: "white"}}/>
                <p>{data?.overview}</p>
                <hr style={{border: "0", height: "3px", background: "white"}}/>
                <div><Badge className="m-lg-1"
                            bg="danger">Budget</Badge>&nbsp;${Number(data?.budget).toLocaleString('en-US')}</div>
                <div><Badge className="m-lg-1"
                            bg="danger">Revenue</Badge>&nbsp;${Number(data?.revenue).toLocaleString('en-US')}</div>
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
                                onClick={ (radio?.value==3) ? onClickPreiview:null}
                            >
                                {radio.name}
                            </ToggleButton>))}
                    </ButtonGroup>
                </Row>
                <Row className="button ">
                    {(radioValue == 1) ? <Col>
                        {review_data?.results.map((review, idx) => <Review review={review}/>)}
                    </Col> : <Col className="recommendation"><RecommendSlider data={recommend_data}/></Col>}
                </Row>
            </Container>
        </Row>
    </Container>)
}