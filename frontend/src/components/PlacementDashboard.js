import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PlacementDashboard() {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === 'drives') {
      navigate('/admin-drives');
    } else if (option === 'videos') {
      navigate('/admin-videos'); // Navigate to video upload page
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Placement Dashboard</h2>

      {/* Dashboard Options */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-primary mx-2 ${selectedOption === 'drives' ? 'active' : ''}`}
          onClick={() => handleOptionClick('drives')}
        >
          Drives
        </button>
        <button
          className={`btn btn-secondary mx-2 ${selectedOption === 'hackathons' ? 'active' : ''}`}
          onClick={() => handleOptionClick('hackathons')}
        >
          Hackathons/Events
        </button>
        <button
          className={`btn btn-success mx-2 ${selectedOption === 'videos' ? 'active' : ''}`}
          onClick={() => handleOptionClick('videos')}
        >
          Videos
        </button>
      </div>
    </div>
  );
}

export default PlacementDashboard;
