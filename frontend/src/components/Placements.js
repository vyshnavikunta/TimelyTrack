import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Placements() {
  const companies = [
    { name: "Company 1", description: "Description of Company 1" },
    { name: "Company 2", description: "Description of Company 2" },
    { name: "Company 3", description: "Description of Company 3" },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <h2>Placements</h2>
          <Row>
            {companies.map((company, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{company.name}</Card.Title>
                    <Card.Text>{company.description}</Card.Text>
                    <Button variant="primary">Apply Now</Button>
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

export default Placements;
