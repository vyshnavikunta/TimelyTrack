import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlacementDashboard() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  // Use effect hook to fetch drives if needed (for now, we're not using it in this view)
  useEffect(() => {
    // Fetch drives only if needed, otherwise this can be removed for now
  }, []);

  const handleUploadDrives = () => {
    setSelectedOption('uploadDrives');
    navigate('/upload-drive');
  };

  const handleStudentExperience = () => {
    setSelectedOption('studentExperience');
    navigate('/upload-student-experience');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Placement Dashboard</h1>

      {/* Buttons to toggle between upload drives and student experience */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-primary mx-2 ${selectedOption === 'uploadDrives' ? 'active' : ''}`}
          onClick={handleUploadDrives}
        >
          Upload Drives
        </button>
        <button
          className={`btn btn-secondary mx-2 ${selectedOption === 'studentExperience' ? 'active' : ''}`}
          onClick={handleStudentExperience}
        >
          Students Experiences
        </button>
      </div>

      
    </div>
  );
}

export default PlacementDashboard;
