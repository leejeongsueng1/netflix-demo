import {Button, Container, Row} from "react-bootstrap";
import "./NotFoundPage.style.css";
import {Link} from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <Container className="pageContainer">
            <Row className="pageContainerRow">
                <div className="NotFoundText">
                    <h1>페이지를 찾을 수 없습니다.</h1>
                </div>
                <div>
                    <Link to="/" style={{textDecorationLine:"none"}}><Button variant="danger" style={{color:"white", fontWeight:"bolder"}}>홈으로...</Button></Link>
                </div>
            </Row>
        </Container>
    )
}