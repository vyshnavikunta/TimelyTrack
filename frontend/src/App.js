import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import NavbarComponent from './components/NavbarComponent';
import Footer from './components/Footer';
import Home from './components/Home';
import StudentLogin from './components/StudentLogin';
import PlacementLogin from './components/PlacementLogin';
import AdminLogin from './components/AdminLogin';
import Placements from './components/Placements';
import HackathonsEvents from './components/HackathonsEvents';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import StudentDashboard from './components/StudentDashboard';
import PlacementDashboard from './components/PlacementDashboard';
import UploadDrive from './components/UploadDrive';
import StudentDrive from './components/StudentDrive';
import DiscussionForum from './components/DiscussionForum';
import StudentExperience from './components/StudentExperience';
import UploadSE from './components/UploadSE';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // Store user type: 'student' or 'placement'
 // const [username, setUsername] = useState(null); // Store username

  // Check login status when the app first loads
  useEffect(() => {
    // Check if the token and user type exist in localStorage
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('userType');  // student or placement
   // const storedUsername = localStorage.getItem('username'); // Retrieve the username
   
    if (token && type) {
      setLoggedIn(true);
      setUserType(type);
     // setUsername(storedUsername); // Set username from localStorage
    }
  }, []);

  // Handle login (e.g., set token, user type, and username in localStorage and update loggedIn state)
  const handleLogin = (type, userName) => {
    localStorage.setItem('token', 'your-token'); // Set the token (you may want to set an actual token)
    localStorage.setItem('userType', type); // Set user type (student or placement)
    localStorage.setItem('username', userName); // Set username in localStorage
    setLoggedIn(true);
    setUserType(type);
    //setUsername(userName); // Update the username state
  };

   // Handle logout (remove token, user type, and username, update loggedIn state)
   const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('username'); // Remove username from localStorage
    setLoggedIn(false);
    setUserType(null);
    //setUsername(null); // Clear username state
  };

 



  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavbarComponent loggedIn={loggedIn} userType={userType} onLogout={handleLogout} />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student-login" element={<StudentLogin onLogin={() => handleLogin('student')} />} />
            <Route path="/placement-login" element={<PlacementLogin onLogin={() => handleLogin('placement')} />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/hackathons-events" element={<HackathonsEvents />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={userType === 'student' ? <StudentDashboard /> : <PlacementDashboard />} />
            <Route path="/upload-drive" element={userType === 'placement' ? <UploadDrive /> : <div className="text-center mt-5">Unauthorized Access</div>} />
            <Route path="/student-drive" element={userType === 'student' ? <StudentDrive /> : <div className="text-center mt-5">Unauthorized Access</div>} />
            <Route path="/discussion-forum" element={<DiscussionForum />} />
            <Route path="/student-experience" element={userType === 'placement' ? <StudentExperience /> : <div className="text-center mt-5">Unauthorized Access</div>} />
            <Route path="/upload-student-experience" element={<UploadSE /> } />
            
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
