import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "../Contact.css"; // Importing custom CSS for styles

function Contact() {
  return (
    <div className="contact-background">
      <Container className="contact-container mt-5">
        <Row>
          <Col className="text-center">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle mt-4">
              Have any questions or need assistance? We're here to help! Feel free to reach out to us using the form below.
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={{ span: 8, offset: 2 }} className="form-column">
            <Form className="contact-form">
              <Form.Group className="mb-3" controlId="contactName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" className="form-input" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactEmail">
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" className="form-input" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactMessage">
                <Form.Label>Your Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Enter your message" className="form-input" />
              </Form.Group>
              <Button variant="primary" type="submit" className="submit-btn">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
