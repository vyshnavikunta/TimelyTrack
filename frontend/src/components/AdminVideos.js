import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/videos')
      .then((response) => {
        setVideos(response.data.videos);
      })
      .catch((error) => {
        console.error("Error fetching videos: ", error);
      });
  }, []);

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
    formData.append('video', video); // Appending the video file
    formData.append('title', title); // Appending the title

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

  const handleDelete = (filename) => {
    console.log("Video to be deleted: ", filename); // Log the video filename
    axios
      .delete(`http://localhost:5000/api/videos/${filename}`)
      .then(() => {
        // Update the video list after successful deletion
        setVideos((prevVideos) => prevVideos.filter((v) => v.filename !== filename));
      })
      .catch((error) => {
        console.error("Error deleting video: ", error);
      });
  };

  // Handle title edit
  const [editing, setEditing] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleEdit = (video) => {
    setEditing(video.filename); // Set the video being edited
    setNewTitle(video.title); // Pre-fill the current title
  };

  const handleTitleSave = async (filename) => {
    if (!newTitle) {
      setMessage('Please provide a new title.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/videos/${filename}`, {
        title: newTitle, // Send the new title
      });

      if (response.data.success) {
        setVideos((prevVideos) =>
          prevVideos.map((v) =>
            v.filename === filename ? { ...v, title: newTitle } : v
          )
        );
        setEditing(null); // Close the edit form
        setMessage('Title updated successfully!');
        // Reset the message after 3 seconds
        setTimeout(() => {
          setMessage('');
        }, 3000);
      } else {
        setMessage('Error updating title.');
      }
    } catch (error) {
      console.error('Error updating title:', error);
      setMessage('Error updating title.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '20px' }}>
      <Container>
        <Row>
          <Col>
            <div className="text-center mb-5">
              <h2 className="fw-bold">Admin Videos</h2>
              <p className="text-muted">
                Manage videos uploaded by students.
              </p>
            </div>
          </Col>
        </Row>

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

        {/* Video Section */}
        <Row className="mb-5">
          <Col>
            {videos.length > 0 ? (
              <Row className="g-4">
                {videos.map((video) => (
                  <Col md={4} key={video.filename}> {/* Use filename as key */}
                    <Card className="shadow-sm border-0 h-100">
                      <Card.Body>
                        <Card.Title className="text-primary">{video.title}</Card.Title> {/* Display the title */}
                        <div className="video-container">
                          <video controls>
                            <source src={`http://localhost:5000/uploads/${video.filename}`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        {/* Edit Button */}
                        {editing !== video.filename ? (
                          <Button
                            variant="warning"
                            className="mt-3 w-100"
                            onClick={() => handleEdit(video)} // Edit based on filename
                          >
                            Edit Title
                          </Button>
                        ) : (
                          <div>
                            <Form.Group className="mt-3">
                              <Form.Control
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="Enter new title"
                              />
                            </Form.Group>
                            <Button
                              variant="success"
                              className="mt-3 w-100"
                              onClick={() => handleTitleSave(video.filename)} // Save changes
                            >
                              Save Title
                            </Button>
                            <Button
                              variant="secondary"
                              className="mt-3 w-100"
                              onClick={() => setEditing(null)} // Cancel editing
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                        {/* Delete Button */}
                        <Button
                          variant="danger"
                          className="mt-3 w-100"
                          onClick={() => handleDelete(video.filename)} // Deleting based on filename
                        >
                          Delete Video
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="text-center text-muted">No videos uploaded yet.</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminVideos;
