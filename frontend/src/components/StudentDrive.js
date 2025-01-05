import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';

function StudentDrive() {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateRandomGradient = () => {
    const gradients = [
      'linear-gradient(45deg, #ff9a8b, #ff6a88)',
      'linear-gradient(45deg, #8fd3f4, #84fab0)',
      'linear-gradient(45deg, #ffecd2, #fcb69f)',
      'linear-gradient(45deg, #a1c4fd, #c2e9fb)',
      'linear-gradient(45deg, #fbc2eb, #a6c1ee)',
      'linear-gradient(45deg, #d4a5a5, #7f7fd5)',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  // Fetch drives from API on component mount
  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/drives');
        if (!response.ok) {
          throw new Error('Failed to fetch drives');
        }
        const data = await response.json();
        setDrives(data); // Assuming the response is an array of drives
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrives();
  }, []);

  // Handle click to open company URL in new tab
  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <Container className="mt-5">
        <h3 className="text-center mb-4 text-primary">Available Drives</h3>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading available drives...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="text-center">
            <strong>Error: </strong>{error}
          </Alert>
        )}

        {/* Drives List */}
        <Row className="justify-content-center">
          {drives.length > 0 ? (
            drives.map((drive) => (
              <Col key={drive._id} xs={12} md={6} lg={3} className="mb-4 d-flex justify-content-center">
                <Card
                  className="shadow-lg border-0 rounded-5"
                  style={{
                    background: generateRandomGradient(),
                    width: '90%', // Set a smaller width for each card
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect transition
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onClick={() => handleCardClick(drive.companyUrl)} // Open URL on click
                >
                  <Card.Body>
                    <Card.Title
                      className="h4 text-black font-weight-bold text-center mb-3"
                      style={{ marginBottom: '15px' }} // Add some gap below the company name
                    >
                      {drive.companyName}
                    </Card.Title>
                    <Card.Text className="mb-2 text-black">
                      <strong>Drive Date:</strong> {new Date(drive.driveDate).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text className="mb-2 text-black">
                      <strong>Type:</strong> {drive.type}
                    </Card.Text>
                    <Card.Text className="mb-2 text-black">
                      <strong>CTC:</strong> ₹{drive.ctc} LPA
                    </Card.Text>
                    <Card.Text className="mb-2 text-black">
                      <strong>Eligibility:</strong> {drive.eligible}
                    </Card.Text>
                    <Card.Text className="mb-2 text-black">
                      <strong>Applied Count:</strong> {drive.appliedCount}
                    </Card.Text>
                    <Card.Text className="mb-2 text-black">
                      <strong>Hired Count:</strong> {drive.hiredCount}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <div className="text-center">
                <Alert variant="info">No drives available at the moment.</Alert>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default StudentDrive;
