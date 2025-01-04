import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function AdminVideos() {
  const [videos, setVideos] = useState([
    { id: 1, title: 'Student Experience 1', url: 'video1.mp4' },
    { id: 2, title: 'Student Experience 2', url: 'video2.mp4' },
    { id: 3, title: 'Student Experience 3', url: 'video3.mp4' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Video upload form states
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Toggle visibility of upload form
  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  // Handle video change
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle video upload submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video || !title) {
      setMessage('Please select a video file and provide a title.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);

    try {
      setUploading(true);
      setMessage('');

      const response = await axios.post('http://localhost:5000/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setMessage('Video uploaded successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
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

  // Simulate video deletion (replace with actual backend logic)
  const handleDeleteVideo = (videoId) => {
    setIsLoading(true);
    setTimeout(() => {
      setVideos(videos.filter((video) => video.id !== videoId));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center text-primary mb-4">Admin Videos</h3>

      {/* Upload Video Option */}
      <button className="btn btn-primary mb-4" onClick={toggleUploadForm}>
        {showUploadForm ? 'Cancel Upload' : 'Upload Video'}
      </button>

      {/* Upload Form */}
      {showUploadForm && (
        <form onSubmit={handleSubmit} className="card shadow-lg p-4 mb-5 border-0 rounded-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">Video Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter video title"
              value={title}
              onChange={handleTitleChange}
              className="form-control shadow-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="video" className="form-label fw-semibold">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="form-control shadow-sm"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 shadow" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      )}

      {/* Display Message */}
      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* Display Available Student Videos */}
      {isLoading ? (
        <div className="text-center">Deleting video...</div>
      ) : (
        <div className="row">
          {videos.length === 0 ? (
            <div className="text-center">No videos available.</div>
          ) : (
            videos.map((video) => (
              <div key={video.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{video.title}</h5>
                    <div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AdminVideos;
