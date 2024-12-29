import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Post Component
const Post = ({ post, onReplyClick }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <p className="text-muted">By: {post.author.fullname}</p>
        <button className="btn btn-primary" onClick={() => onReplyClick(post._id)}>
          Reply
        </button>
        {post.replies && post.replies.length > 0 && (
          <div className="mt-3">
            <h6>Replies:</h6>
            {post.replies.map(reply => (
              <div key={reply._id} className="border p-2 mb-2">
                <p>{reply.content}</p>
                <p className="text-muted">By: {reply.author.fullname}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Reply Form Component
const ReplyForm = ({ postId, onReplySubmit, onCancel }) => {
  const [content, setContent] = useState('');

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!content) return;
    try {
      await axios.post('/api/replies', { content, postId });
      onReplySubmit();
      setContent('');
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Write a Reply</h5>
        <textarea
          className="form-control mb-3"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your reply here..."
        ></textarea>
        <button className="btn btn-success" onClick={handleReplySubmit}>Submit</button>
        <button className="btn btn-secondary ms-2" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

// Post Creation Form Component
const PostForm = ({ onPostSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const handlePostSubmit = async (e) => {
    console.log("handle submit post is called");
    e.preventDefault();  // Prevent page reload on submit
    console.log("Form Submitted");  // Debugging statement to see if the function is triggered

    // Check if title and content are filled out
    if (!title || !content) {
      setError("Title and content are required.");
      console.log("Validation Error: Title and content are required."); // Debugging validation
      return;
    }

    try {
      const newPost = {
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim())
      };
      console.log("New Post Data: ", newPost);  // Debugging statement to check the newPost object

      await axios.post('/api/posts', newPost);

      onPostSubmit();

      setTitle('');
      setContent('');
      setTags('');
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post.");
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <h5 className="card-title">Create a New Post</h5>
        <input
          type="text"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
        />
        <textarea
          className="form-control mb-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
          rows="4"
        ></textarea>
        <input
          type="text"
          className="form-control mb-3"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />
        <button className="btn btn-primary" type="submit" onClick={handlePostSubmit}>Submit Post</button>
      </div>
    </div>
  );
};

// Main DiscussionForum Component
const DiscussionForum = () => {
  const [posts, setPosts] = useState([]);
  const [isReplying, setIsReplying] = useState(false);
  const [replyPostId, setReplyPostId] = useState(null);

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = () => {
    // Re-fetch posts after a new post is submitted
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  };

  const handleReplyClick = (postId) => {
    setIsReplying(true);
    setReplyPostId(postId);
  };

  const handleReplySubmit = () => {
    // Re-fetch posts after a new reply is added
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
    setIsReplying(false);
    setReplyPostId(null);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyPostId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Discussion Forum</h2>
      
      <PostForm onPostSubmit={handlePostSubmit} />
      
      <div className="posts-list mt-4">
        {posts.map(post => (
          <Post key={post._id} post={post} onReplyClick={handleReplyClick} />
        ))}
      </div>

      {isReplying && replyPostId && (
        <ReplyForm
          postId={replyPostId}
          onReplySubmit={handleReplySubmit}
          onCancel={handleCancelReply}
        />
      )}
    </div>
  );
};

export default DiscussionForum;
