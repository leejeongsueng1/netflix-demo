import './Review.style.css'
import {useState} from "react";
import {Button} from "react-bootstrap";

export const Review = ({review}) => {
    const [readMore, setReadMore] = useState(false);

    const onClickReadMore = (event) => {
        event.preventDefault();
        setReadMore(!readMore);
    }

    return (
        <div className={!readMore ? "movieReview" : "movieReviewMore"}>
            <div><h1 className="nickName">{review?.author}</h1></div>
            <div>{review?.created_at}</div>
            <p className={!readMore ? "reviewDetail" : "reviewDetailMore"}>{review?.content}</p>
            <hr/>
            <div className={"button-div"}><Button variant={!readMore ?'danger':'outline-danger'} className="readMoreButton" onClick={onClickReadMore}>{!readMore ? "readMore" : "fold"}</Button></div>

        </div>
    )
}