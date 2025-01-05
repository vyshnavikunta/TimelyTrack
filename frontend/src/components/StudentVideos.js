import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../StudentVideos.css'; // Import the updated CSS

function StudentVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/videos')
      .then((response) => {
        setVideos(response.data.videos); // Assuming response contains 'videos' with title and filename
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
              <h2 className="fw-bold">Student Videos</h2>
              <p className="text-muted">
                View videos uploaded by your fellow students.
              </p>
            </div>
          </Col>
        </Row>

        {/* Video Section */}
        <Row className="mb-5">
          <Col>
            {videos.length > 0 ? (
              <Row className="g-4">
                {videos.map((video, index) => (
                  <Col md={4} key={video._id}>
                    <Card className="shadow-sm border-0 h-100">
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-primary">{video.title}</Card.Title>
                        <div className="video-container">
                          <video controls>
                            <source src={`http://localhost:5000/uploads/${video.filename}`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
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
      </Container>
    </div>
  );
}

export default StudentVideos;
