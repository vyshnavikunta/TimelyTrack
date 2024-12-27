import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <h2>Welcome to the Placements and Hackathons System</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6} className="text-center">
          <Button variant="primary" size="lg" as={Link} to="/placements">
            Placements
          </Button>
        </Col>
        <Col md={6} className="text-center">
          <Button variant="success" size="lg" as={Link} to="/hackathons-events">
            Hackathons / Events
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
