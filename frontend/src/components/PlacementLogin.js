import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function PlacementLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/placement-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        alert("Login successful!");

        // Store the JWT token in localStorage
        localStorage.setItem('placementToken', result.token);

        // Call the onLogin function passed from App.js to update loggedIn state
        onLogin('placement');

        // Redirect to Placement Dashboard
        navigate("/dashboard"); // Change to your actual dashboard route
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <div className="border p-4 rounded">
            <h3 className="text-center mb-4">Placement Login</h3>
            <Form onSubmit={handleSubmit}>
              {/* Email */}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              {/* Password */}
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {/* Remember Me Checkbox */}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Remember Me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <p>
                <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PlacementLogin;
