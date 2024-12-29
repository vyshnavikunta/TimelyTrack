import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Home.css";

function Home() {
  return (
    <Container fluid className="main-background">
      {/* Welcome Text */}
      <Row className="justify-content-center">
        <Col className="text-center">
          <h1 className="welcome-text">
            Welcome to TimelyTrack: Your Ultimate Platform for Staying Ahead in Placements, Hackathons, and Events
          </h1>
        </Col>
      </Row>

      {/* Cards */}
      <Row className="justify-content-center mt-5">
        {/* Placements Card */}
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
          <Card
            as={Link}
            to="/placements"
            className="shadow-lg animate-hover card-orange"
            style={{ textDecoration: "none" }}
          >
            <Card.Body>
              <h5 className="font-weight-bold">Placements</h5>
              <p>
                Discover the latest placement opportunities tailored for you.
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Hackathons & Events Card */}
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
          <Card
            as={Link}
            to="/hackathons-events"
            className="shadow-lg animate-hover card-blue"
            style={{ textDecoration: "none" }}
          >
            <Card.Body>
              <h5 className="font-weight-bold">Hackathons & Events</h5>
              <p>
                Explore exciting hackathons and upcoming events.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
