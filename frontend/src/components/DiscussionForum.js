import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

function DiscussionForum() {
  const [messages, setMessages] = useState([]); // Store messages
  const [newMessage, setNewMessage] = useState(''); // Store new message input

  // Fetch messages on load
  useEffect(() => {
    fetch('/api/messages') // Fetch from backend
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Error fetching messages:', err));
  }, []);

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Send the new message to the backend
    fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newMessage, author: "Your Name" }), // You can use the logged-in user's name here
    })
      .then((res) => res.json())
      .then((message) => {
        setMessages([...messages, message]); // Update messages with the new message
        setNewMessage(''); // Clear the input field
      })
      .catch((err) => console.error('Error posting message:', err));
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Discussion Forum</h2>
      <Row>
        <Col md={8} className="mx-auto">
          {/* List of Messages */}
          <ListGroup className="mb-4">
            {messages.map((msg) => (
              <ListGroup.Item key={msg._id}>
                <strong>{msg.author}</strong> <small>({new Date(msg.timestamp).toLocaleString()})</small>
                <p>{msg.content}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Input Form */}
          <Form onSubmit={handleSendMessage}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">Send</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default DiscussionForum;