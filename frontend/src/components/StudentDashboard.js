import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // for navigation

function StudentDashboard() {
  return (
    <div>
      {/* Dashboard Content */}
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Row>
          <Col xs={12} md={6} className="mx-auto">
            <div className="border p-4 rounded">
              <h3 className="text-center mb-4">Welcome to the Student Dashboard</h3>
              <p className="text-center">This is your dashboard where you can view your details and manage your account.</p>
              
              {/* Cards for Drives and Events */}
              <Row className="mt-4">
                <Col md={6}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>Drives</Card.Title>
                      <Card.Text>
                        View all available drives and apply for them.
                      </Card.Text>
                      <Link to="/student-drive">
                        <Button variant="primary">View Drives</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>Events/Hackathons</Card.Title>
                      <Card.Text>
                        Stay updated with upcoming events and hackathons.
                      </Card.Text>
                      <Link to="/events">
                        <Button variant="secondary">View Events</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StudentDashboard;