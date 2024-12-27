import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavbarComponent({ loggedIn, userType, onLogout }) {
  const navigate = useNavigate();  // Hook to get navigate function

  const handleLogout = () => {
    // Call the onLogout function to clear the token (if passed from App.js)
    onLogout();

    // Redirect to the homepage
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">BVRITH</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto"> {/* Updated class to ms-auto */}
            {!loggedIn ? (  // When not logged in
              <>
                <Nav.Item>
                  <Link to="/student-login" className="nav-link text-white">Student Login</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/placement-login" className="nav-link text-white">Placement Login</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/admin-login" className="nav-link text-white">Admin Login</Link>
                </Nav.Item>
              </>
            ) : (  // When logged in
              <>
                {userType === 'student' && (
                  <>
          
                    <Nav.Item>
                      <Link to="/profile" className="nav-link text-white">Profile</Link>
                    </Nav.Item>
                  </>
                )}
                {userType === 'placement' && (
                  <>
                    
                    <Nav.Item>
                      <Link to="/profile" className="nav-link text-white">Profile</Link>
                    </Nav.Item>
                  </>
                )}
                <Nav.Item>
                  <Button 
                    variant="outline-light" 
                    onClick={handleLogout} // Use handleLogout to perform logout and redirect
                  >
                    Logout
                  </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
