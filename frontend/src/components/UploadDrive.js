import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadDrive() {
  const [formData, setFormData] = useState({
    companyName: '',
    driveDate: '',
    type: '',
    ctc: '',
    status: {
      appliedCount: 0,  // Initialized to 0
      hiredCount: 0,    // Initialized to 0
    },
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/drives', formData);
      console.log('Drive uploaded successfully:', response.data);
      navigate('/dashboard'); // Navigate back to the dashboard or a confirmation page
    } catch (error) {
      console.error('Error uploading drive:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Upload Drive Details</h1>
      <form onSubmit={handleSubmit} className="card shadow p-4">
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="driveDate" className="form-label">
            Drive Date
          </label>
          <input
            type="date"
            id="driveDate"
            name="driveDate"
            value={formData.driveDate}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Drive Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select</option>
            <option value="Full Time">Full Time</option>
            <option value="Internship">Internship</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="ctc" className="form-label">
            CTC
          </label>
          <input
            type="text"
            id="ctc"
            name="ctc"
            value={formData.ctc}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UploadDrive;
