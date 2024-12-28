import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/videos')
      .then((response) => {
        setVideos(response.data.videos);
      })
      .catch((error) => {
        console.error("Error fetching videos: ", error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '20px' }}>
      <Container>
        <Row>
          <Col>
            <div className="text-center mb-5">
              <h2 className="fw-bold">Welcome to the Student Dashboard</h2>
              <p className="text-muted">
                Manage your account, view details, and explore resources curated for you.
              </p>
            </div>
          </Col>
        </Row>

        {/* Video Section */}
        <Row className="mb-5">
          <Col>
            <h4 className="fw-bold text-center mb-4">Uploaded Videos</h4>
            {videos.length > 0 ? (
              <Row className="g-4">
                {videos.map((video, index) => (
                  <Col md={4} key={index}>
                    <Card className="shadow-sm border-0 h-100">
                      <Card.Body>
                        <Card.Title className="text-primary">Video {index + 1}</Card.Title>
                        <video width="100%" controls>
                          <source src={`http://localhost:5000/uploads/${video}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="text-center text-muted">No videos uploaded yet.</p>
            )}
          </Col>
        </Row>

        {/* Drives, Events, and Forum Section */}
        <Row className="g-4">
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 h-100">
              <Card.Body>
                <Card.Title className="text-success fw-bold">Drives</Card.Title>
                <Card.Text className="text-muted">
                  Explore and apply for available drives.
                </Card.Text>
                <Link to="/student-drive">
                  <Button variant="outline-success" className="w-100">
                    View Drives
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center shadow-sm border-0 h-100">
              <Card.Body>
                <Card.Title className="text-info fw-bold">Events/Hackathons</Card.Title>
                <Card.Text className="text-muted">
                  Stay updated with upcoming events and hackathons.
                </Card.Text>
                <Link to="/events">
                  <Button variant="outline-info" className="w-100">
                    View Events
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center shadow-sm border-0 h-100">
              <Card.Body>
                <Card.Title className="text-warning fw-bold">Discussion Forum</Card.Title>
                <Card.Text className="text-muted">
                  Engage in discussions and collaborate with peers.
                </Card.Text>
                <Link to="/discussion-forum">
                  <Button variant="outline-warning" className="w-100">
                    Join Forum
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
