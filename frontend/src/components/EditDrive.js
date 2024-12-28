import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditDrive() {
  const [drive, setDrive] = useState({
    title: '',
    company: '',
    date: '',
    location: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the drive details by ID
    const fetchDrive = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/drives/${id}`);
        setDrive(response.data);
      } catch (error) {
        console.error('Error fetching drive:', error);
      }
    };

    fetchDrive();
  }, [id]);

  const handleChange = (e) => {
    setDrive({
      ...drive,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/drives/${id}`, drive);
      alert('Drive updated successfully!');
      navigate('/placement-dashboard');
    } catch (error) {
      console.error('Error updating drive:', error);
      alert('Error updating drive!');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Drive</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Drive Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={drive.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={drive.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={drive.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={drive.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditDrive;
