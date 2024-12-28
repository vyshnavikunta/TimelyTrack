import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function StudentDrive() {
  const [drives, setDrives] = useState([]);

  // Fetch drives from API on component mount
  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/drives');
        const data = await response.json();
        console.log(data);
        setDrives(data); // Assuming the response is an array of drives
      } catch (error) {
        console.error('Error fetching drives:', error);
      }
    };

    fetchDrives();
  }, []);

  return (
    <div>
      {/* Drives Content */}
      <Container className="mt-5">
        <h3 className="text-center mb-4">Available Drives</h3>
        <Row>
          {drives.length > 0 ? (
            drives.map((drive) => (
              <Col key={drive._id} xs={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{drive.companyName}</Card.Title>
                    <Card.Text>
                      <strong>Drive Date:</strong> {new Date(drive.driveDate).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>Type:</strong> {drive.type}
                    </Card.Text>
                    <Card.Text>
                      <strong>CTC:</strong> ₹{drive.ctc} LPA
                    </Card.Text>
                    <Link to={`/drive-details/${drive._id}`}>
                      <Button variant="primary">View Details</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <div className="text-center">No drives available at the moment.</div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default StudentDrive;
