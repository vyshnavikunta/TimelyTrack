import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StudentDashboard;
