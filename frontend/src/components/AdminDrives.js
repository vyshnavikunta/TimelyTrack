import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DrivesPage() {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false); // State to toggle the form
  const [formData, setFormData] = useState({
    companyName: '',
    driveDate: '',
    type: '',
    ctc: '',
    status: {
      appliedCount: 0, // Initialized to 0
      hiredCount: 0, // Initialized to 0
    },
  });
  const [editDriveId, setEditDriveId] = useState(null); // State to track the drive being edited

  // Fetch drives from the API
  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/drives');
      setDrives(response.data); // Assuming the API returns an array of drives
    } catch (err) {
      setError(err.message || 'Failed to fetch drives');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestMethod = editDriveId ? 'put' : 'post'; // Determine if we're creating or updating a drive
    const url = editDriveId 
      ? `http://localhost:5000/api/drives/${editDriveId}` // For updating
      : 'http://localhost:5000/api/drives'; // For creating

    try {
      const response = await axios[requestMethod](url, formData);
      console.log(`${editDriveId ? 'Updated' : 'Created'} drive successfully:`, response.data);

      fetchDrives(); // Refresh the list of drives
      setShowUploadForm(false); // Hide the form after submission
      setEditDriveId(null); // Reset the edit drive state
      setFormData({ // Clear form data
        companyName: '',
        driveDate: '',
        type: '',
        ctc: '',
        status: {
          appliedCount: 0,
          hiredCount: 0,
        },
      });
    } catch (error) {
      console.error(`Error ${editDriveId ? 'updating' : 'uploading'} drive:`, error);
    }
  };

  const handleToggleForm = () => {
    setShowUploadForm(!showUploadForm); // Toggle form visibility
  };

  const handleEdit = (drive) => {
    setFormData({
      companyName: drive.companyName,
      driveDate: drive.driveDate,
      type: drive.type,
      ctc: drive.ctc,
      status: drive.status,
    });
    setEditDriveId(drive._id); // Set the drive to be edited
    setShowUploadForm(true); // Show the form in edit mode
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/drives/${id}`);
      console.log('Drive deleted successfully');
      fetchDrives(); // Re-fetch the drives list after deletion
    } catch (error) {
      console.error('Error deleting drive:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center text-primary mb-4">Drives</h3>

      {/* Upload New Drive Button */}
      <button
        onClick={handleToggleForm}
        className="btn btn-primary mb-4"
      >
        {showUploadForm ? 'Cancel Upload' : 'Upload New Drive'}
      </button>

      {/* Upload New Drive Form */}
      {showUploadForm && (
        <form onSubmit={handleSubmit} className="mb-5 card shadow-lg p-4 border-0 rounded-3">
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

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow">
            {editDriveId ? 'Update Drive' : 'Submit'}
          </button>
        </form>
      )}

      {/* Drives List */}
      {loading ? (
        <div className="text-center">Loading drives...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="row">
          {drives.map((drive) => (
            <div key={drive._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{drive.companyName}</h5>
                  <p><strong>Date:</strong> {new Date(drive.driveDate).toLocaleDateString()}</p>
                  <p><strong>Type:</strong> {drive.type}</p>
                  <p><strong>CTC:</strong> ₹{drive.ctc} LPA</p>
                  <button
                    onClick={() => handleEdit(drive)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(drive._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DrivesPage;
