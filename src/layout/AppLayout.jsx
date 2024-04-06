import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Outlet} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import LOGO from "./Netflix-Op-Logo.png"

export const AppLayout = () => {
    return (
        <div>
            <Navbar bg="myColor" data-bs-theme="dark" sticky="top" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#" ><img src={LOGO} height={45} alt="..." /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/movies">Movie</Nav.Link>

                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-danger">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </div>

    )
}