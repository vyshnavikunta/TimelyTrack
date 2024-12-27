import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function HackathonsEvents() {
  const events = [
    { title: "Hackathon 1", description: "Description of Hackathon 1" },
    { title: "Hackathon 2", description: "Description of Hackathon 2" },
    { title: "Hackathon 3", description: "Description of Hackathon 3" },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <h2>Hackathons and Events</h2>
          <Row>
            {events.map((event, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Button variant="primary">Register</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HackathonsEvents;
