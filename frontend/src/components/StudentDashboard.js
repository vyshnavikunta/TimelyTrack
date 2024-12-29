// src/components/StudentDashboard.js

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../StudentDashboard.css'; // Import custom CSS for animations

function StudentDashboard() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '20px' }}>
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <Row className="w-100">
          <Col className="text-center mb-5">
            <h2 className="fw-bold">Welcome to the Student Dashboard</h2>
            <p className="text-muted">
              Manage your account, view details, and explore resources curated for you.
            </p>
          </Col>
        </Row>

        {/* Drives, Events, Forum, and Student Experiences Section */}
        <Row className="g-4 d-flex justify-content-center align-items-center">
          <Col md={3}>
            <Card className="text-center shadow-sm border-0 h-100 animated-card">
              <Card.Body>
                <Card.Title className="text-success fw-bold">Drives</Card.Title>
                <Card.Text className="text-muted">
                Explore for available drives and recruitment opportunities tailored for you. 
                Stay updated on the latest drives, including internships, placements, and skill-based programs.
                 Additionally, view past drives to get insights into previous opportunities and improve your application strategy.
                 </Card.Text>
                <Link to="/student-drive">
                  <Button variant="outline-success" className="w-100">
                    View Drives
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center shadow-sm border-0 h-100 animated-card">
              <Card.Body>
                <Card.Title className="text-info fw-bold">Events/Hackathons</Card.Title>
                <Card.Text className="text-muted">
                Stay updated with upcoming events, hackathons, and competitions that will help you showcase your skills and connect with industry experts.
                 Participate in a variety of challenges and projects that can boost your career prospects. 
                 Do not miss out on the chance to learn, collaborate, and win exciting prizes.
                 </Card.Text>
                <Link to="/events">
                  <Button variant="outline-info" className="w-100">
                    View Events
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center shadow-sm border-0 h-100 animated-card">
              <Card.Body>
                <Card.Title className="text-warning fw-bold">Discussion Forum</Card.Title>
                <Card.Text className="text-muted">
                Engage in insightful discussions and collaborate with peers on various topics, from technology to career development. 
                Share ideas, ask questions, and gain valuable knowledge from fellow students.
                Join the community and enhance your learning experience through active participation.  </Card.Text>
                <Link to="/discussion-forum">
                  <Button variant="outline-warning" className="w-100">
                    Join Forum
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* New Card for Student Experiences */}
          <Col md={3}>
            <Card className="text-center shadow-sm border-0 h-100 animated-card">
              <Card.Body>
                <Card.Title className="text-primary fw-bold">Student Experiences</Card.Title>
                <Card.Text className="text-muted">
                Watch inspiring experiences shared by fellow students, showcasing their journeys through internships, projects, and personal growth.
                 Gain valuable insights into how your peers have navigated their academic and professional paths.
                  Get motivated and learn from their success stories and challenges. </Card.Text>
                <Link to="/student-videos">
                  <Button variant="outline-primary" className="w-100">
                    View Experiences
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StudentDashboard;
