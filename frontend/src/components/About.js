import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../About.css";

function About() {
  return (
    <div className="main-background">
      <Container className="about-container mt-5">
        <Row>
          <Col className="text-center">
            <h1 className="about-title">About Us</h1>
            <p className="about-subtitle">Your Gateway to Success!</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6} className="text-center">
            <img
              src="bvrit.jpg"
              alt="About Us Illustration"
              className="about-image bounce-in"
            />
          </Col>
          <Col md={6}>
            <p className="about-text fade-in">
              Welcome to <span className="highlight">BVRITH's Placements and Hackathons System</span>! 
              Our platform connects students to placement opportunities and fosters participation in 
              dynamic hackathons and events.
            </p>
            <p className="about-text fade-in delay-1">
              We bridge the gap between academia and industry, providing resources, mentorship, 
              and a launchpad for career growth. 
            </p>
            <p className="about-text fade-in delay-2">
              Join us and unlock your potential through innovative programs, cutting-edge 
              opportunities, and strong community connections.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
