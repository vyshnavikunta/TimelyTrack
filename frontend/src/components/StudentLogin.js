import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Eye icon for password
import '../StudentLogin.css'; // Add custom CSS for animations

function StudentLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem('token', result.token);
        onLogin('student');
        navigate("/dashboard");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <Container fluid className="login-background">
      <Row className="justify-content-center align-items-center full-height">
        {/* Left side image with floating effect */}
        <Col md={6} className="d-none d-md-block home-page-image">
          <img
            src="image2.jpg" // Use the same image as in the homepage
            alt="Attractive Graphic"
            className="img-fluid login-image floating-image"
          />
        </Col>

        {/* Right side form for Student Login with arched corners */}
        <Col xs={12} md={6} className="text-center p-4">
          <div className="login-form-container shadow-lg p-4 rounded-3">
            <h3 className="mb-4">Student Login</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername" className="mb-3">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label className="form-label">Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Remember Me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="remember-checkbox"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 submit-button">
                Login
              </Button>
            </Form>

            <div className="mt-3">
              <p className="text-link-container">
                Not a registered user? <Link to="/signup" className="text-decoration-none text-hover">Sign up now</Link>
              </p>
              <p>
                <Link to="/reset-password" className="text-decoration-none text-hover">Can't access account? Reset password</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentLogin;
