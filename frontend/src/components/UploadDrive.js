import React, {  useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadDrive({ formData, setFormData, fetchDrives, editDriveId }) {
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
    const data = new FormData();
    data.append('companyName', formData.companyName);
    data.append('driveDate', formData.driveDate);
    data.append('type', formData.type);
    data.append('ctc', formData.ctc);
    data.append('eligibleCount', formData.eligibleCount);
    data.append('appliedCount', formData.appliedCount);
    data.append('hiredCount', formData.hiredCount);
    data.append('companyLink', formData.companyLink);

    try {
      // If we're editing an existing drive, make a PUT request.
      if (editDriveId) {
        const response = await axios.put(`http://localhost:5000/api/drives/${editDriveId}`, data);
        console.log('Drive updated successfully:', response.data);
      } else {
        // If it's a new drive, make a POST request.
        const response = await axios.post('http://localhost:5000/api/drives', data);
        console.log('Drive uploaded successfully:', response.data);
      }

      fetchDrives(); // Re-fetch the drives list
      navigate('/dashboard'); // Navigate to the dashboard or confirmation page
    } catch (error) {
      console.error('Error uploading or updating drive:', error);
    }
  };

  useEffect(() => {
    if (editDriveId) {
      // If we are in edit mode, fetch the drive details and set the form data
      axios.get(`http://localhost:5000/api/drives/${editDriveId}`)
        .then((response) => {
          setFormData(response.data); // Set the form data with the existing drive details
        })
        .catch((error) => {
          console.error('Error fetching drive data for edit:', error);
        });
    }
  }, [editDriveId, setFormData]);

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <form onSubmit={handleSubmit} className="card shadow-lg p-4 border-0 rounded-3">
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label fw-semibold">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="form-control shadow-sm"
            placeholder="Enter company name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="driveDate" className="form-label fw-semibold">
            Drive Date
          </label>
          <input
            type="date"
            id="driveDate"
            name="driveDate"
            value={formData.driveDate}
            onChange={handleInputChange}
            className="form-control shadow-sm"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label fw-semibold">
            Drive Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="form-select shadow-sm"
            required
          >
            <option value="">Select</option>
            <option value="Full Time">Full Time</option>
            <option value="Internship">Internship</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="ctc" className="form-label fw-semibold">
            CTC (Cost to Company)
          </label>
          <input
            type="text"
            id="ctc"
            name="ctc"
            value={formData.ctc}
            onChange={handleInputChange}
            className="form-control shadow-sm"
            placeholder="Enter CTC amount"
            required
          />
        </div>

        {/* New fields for eligible count, applied count, hired count, and company URL */}
        <div className="mb-3">
          <label htmlFor="eligibleCount" className="form-label fw-semibold">
            Eligible Count
          </label>
          <input
            type="number"
            id="eligibleCount"
            name="eligibleCount"
            value={formData.eligibleCount}
            onChange={handleInputChange}
            className="form-control shadow-sm"
            placeholder="Enter eligible count"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="appliedCount" className="form-label fw-semibold">
            Applied Count
          </label>
          <input
            type="number"
            id="appliedCount"
            name="appliedCount"
            value={formData.appliedCount}
            onChange={handleInputChange}
            className="form-control shadow-sm"
            placeholder="Enter applied count"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="hiredCount" className="form-label fw-semibold">
            Hired Count
          </label>
          <input
            type="number"
            id="hiredCount"
            name="hiredCount"
            value={formData.hiredCount}
            onChange={handleInputChange}
            className="form-control shadow-sm"
            placeholder="Enter hired count"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="companyLink" className="form-label fw-semibold">
            Company Link
          </label>
          <input
            type="url"
            id="companyLink"
            name="companyLink"
            value={formData.companyLink}
            onChange={handleInputChange}
            className="form-control shadow-sm"
            placeholder="Enter company link"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UploadDrive;
