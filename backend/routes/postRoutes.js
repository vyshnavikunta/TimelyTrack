const express = require('express');
const Post = require('../models/postModel');
const Tag = require('../models/tagModel');
const Reply = require('../models/replyModel');

const router = express.Router();

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

router.post("/posts", authenticate, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = new Post({ title, content, author: req.userId, tags });
    await post.save();
    res.status(201).send("Post created successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "fullname").exec();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/tags", authenticate, async (req, res) => {
  try {
    const { name } = req.body;
    const tag = new Tag({ name });
    await tag.save();
    res.status(201).send("Tag created successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/replies", authenticate, async (req, res) => {
  try {
    const { content, postId } = req.body;
    const reply = new Reply({ content, post: postId, author: req.userId });
    await reply.save();
    res.status(201).send("Reply added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
