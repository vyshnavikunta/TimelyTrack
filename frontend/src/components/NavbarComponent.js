import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavbarComponent({ loggedIn, userType, onLogout }) {
  const navigate = useNavigate();

  
  const handleLogout = () => {
    // Clear user details from local storage
    localStorage.removeItem('loggedInUser');
    // Call the onLogout function
    onLogout();

    // Redirect to the homepage
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">TimelyTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {!loggedIn ? (
              <>
                <Nav.Item>
                  <Link to="/about" className="nav-link text-white">About</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/contact" className="nav-link text-white">Contact</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/student-login" className="nav-link text-white">Student Login</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/placement-login" className="nav-link text-white">Admin Login</Link>
                </Nav.Item>
              </>
            ) : (
              <>
                {userType === 'student' && (
                  <>
                    <Nav.Item>
                      <Link 
                        to={`/student-profile`} 
                        className="nav-link text-white"
                      >
                        Profile
                      </Link>
                    </Nav.Item>
                  </>
                )}
                {userType === 'placement' && (
                  <>
                    {/* Add admin-specific links here */}
                  </>
                )}
                <Nav.Item>
                  <Button variant="outline-light" onClick={handleLogout}>
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
