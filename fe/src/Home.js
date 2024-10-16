import React from 'react';
import { Container, Navbar, Nav, Button, Image, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg'; // Assuming your logo image is stored in the same directory as your component file
import "./css/Home.css";
import "./css/Products.css";
import Navigation from './Navigation';
import "./css/Main.css";

function Home() {
    return (
        <div>
            <Navigation />
            
            <Container>
                <Row>
                    {/* Left column, split into two rows */}
                    <Col xs={12} lg={6}>
                        {/* First row in left column */}
                        <Row>
                            <Col>
                                {/* Content for the first row */}
                                <Container>
                                    <Row className="mt-5">
                                        <Col>
                                            <h1 className="text-start mb-4">Digital Invoicing</h1>
                                            <p className="text-start mt-4">
                                                Experience the ease and efficiency of modern business management with digital invoicing. Say goodbye to paper clutter and lengthy processing times as you effortlessly generate, send, and track invoices online.
                                            </p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        {/* Add space between the first and second rows */}
                        <div className="mt-4"></div>
                        {/* Second row in left column */}
                        <Row>
                            <Col>
                                {/* Content for the second row */}
                                <div className="d-flex">
                                    <Button variant="dark" className="mx-2 regularGreenBtn" href="/generate">Generate Invoice</Button>
                                    <Button variant="dark" className="mx-2 regularGreenBtn" href="/invoices">Mail Invoice</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    {/* Right column, visible only on desktop screens */}
                    <Col lg={6}>
                        {/* Content for the right column */}
                        {/* Example: */}
                        <div className="mt-4" style={{ padding: '20px', textAlign: 'center' }}>
                            <Image src="img/invoice_img.jpg" style={{ width: '60%', height: 'auto', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
