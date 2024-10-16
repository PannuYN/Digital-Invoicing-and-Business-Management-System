import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CustomStyles.css';

const MyLayout = () => {
  return (
    <Container className="myContainer">
      <Row className="myRow">
        <Col xs={12} md={6} className="myCol">Column 1</Col>
        <Col xs={12} md={6} className="myCol">Column 2</Col>
      </Row>
    </Container>
  );
};

export default MyLayout;
