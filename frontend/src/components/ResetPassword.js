import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function ResetPassword() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <h3 className="text-center">Reset Password</h3>
          {/* Password reset form can go here */}
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
