import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadStudentExperience() {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');  // State to store the video title
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video || !title) {
      setMessage('Please select a video file and provide a title.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);  // Append the title to the form data

    try {
      setUploading(true);
      setMessage('');

      // Send the video and title to the backend
      const response = await axios.post('http://localhost:5000/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setMessage('Video uploaded successfully!');

        // Wait for 3 seconds, then navigate back to the dashboard
        setTimeout(() => {
          navigate('/dashboard'); // Adjust the path if needed
        }, 3000); // 3 seconds delay before navigating
      } else {
        setMessage('Error uploading video.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setMessage('Error uploading video.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Upload Student Experience Video</h2>

      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        {/* Input for video title */}
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={handleTitleChange}
          className="mb-3"
          required
        />

        {/* Input for selecting video file */}
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="mb-3"
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>

      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}

export default UploadStudentExperience;
