import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlacementDashboard() {
  const [drives, setDrives] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the drives when the component mounts
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/drives');
      console.log("Fetched Drives:", response.data); // Log the response to verify the data
      if (response.data.drives) {
        setDrives(response.data.drives);
      } else {
        console.log("No drives found in the response.");
      }
    } catch (error) {
      console.error("Error fetching drives:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/drives/${id}`);
      setDrives(drives.filter((drive) => drive._id !== id));
    } catch (error) {
      console.error("Error deleting drive:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-drive/${id}`);
  };

  const handleUploadDrives = () => {
    navigate('/upload-drive');
  };

  const handleMockInterviews = () => {
    setSelectedOption('mockInterviews');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Placement Dashboard</h1>

      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-primary mx-2 ${selectedOption === 'uploadDrives' ? 'active' : ''}`}
          onClick={handleUploadDrives}
        >
          Upload Drives
        </button>
        <button
          className={`btn btn-secondary mx-2 ${selectedOption === 'mockInterviews' ? 'active' : ''}`}
          onClick={handleMockInterviews}
        >
          Mock Interviews
        </button>
      </div>

      {selectedOption === 'uploadDrives' && (
        <div className="card shadow p-4 mb-4">
          <h2 className="text-center mb-4">Upload Drive Details</h2>
          {/* Form for uploading drive details should be here */}
        </div>
      )}

      {selectedOption === 'mockInterviews' && (
        <div className="card shadow p-4 mb-4">
          <h2 className="text-center">Mock Interviews</h2>
          <p className="text-center">Mock interview scheduling and resources coming soon.</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-center">Current Drives</h2>
        <div className="row">
          {drives.length > 0 ? (
            drives.map((drive) => (
              <div className="col-md-4" key={drive._id}>
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{drive.title}</h5>
                    <p className="card-text">
                      <strong>Company:</strong> {drive.company} <br />
                      <strong>Date:</strong> {drive.date} <br />
                      <strong>Location:</strong> {drive.location} <br />
                    </p>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(drive._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(drive._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No drives available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlacementDashboard;
