const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require('multer');
const path = require('path');

// Initialize the app and middleware
const app = express();
app.use(express.json());
app.use(cors());
// Serve static files (videos) from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Route to fetch videos
app.get('/api/videos', (req, res) => {
  const videoDirectory = './uploads';
  fs.readdir(videoDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to fetch videos' });
    }

    // Filter only video files, assuming they're either mp4 or other video extensions
    const videoFiles = files.filter(file => file.endsWith('.mp4') || file.endsWith('.mov'));

    res.status(200).json({ videos: videoFiles });
  });
});


// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save videos in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as filename
  },
});


// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Create a folder for storing the uploaded videos
const fs = require('fs');
const uploadsDir = './uploads';

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Handle the video upload
app.post('/api/upload-video', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  res.json({
    success: true,
    message: 'Video uploaded successfully!',
    file: req.file, // You can send back the file path or URL here
  });
});

// MongoDB connection
// mongoose
//   .connect("mongodb://localhost:27017/phms", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

  mongoose.connect("mongodb://localhost:27017/phms")
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define the Drive schema
const driveSchema = new mongoose.Schema({
  companyName: String,
  driveDate: String,
  type: String,
  ctc: String,
  status: {
    appliedCount: { type: Number, default: 0 },
    hiredCount: { type: Number, default: 0 },
  },
});  

// Define Student Schema
const studentSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

// Define the Message schema
const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create the Student Model
const Student = mongoose.model("Student", studentSchema);

// Create the Drive model
const Drive = mongoose.model('Drive', driveSchema);

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

// Register Route
app.post("/api/register", async (req, res) => {
  const { fullname, usn, password, email, question, answer } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Student.findOne({ $or: [{ usn }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User with this USN or Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const newStudent = new Student({
      fullname,
      usn,
      password: hashedPassword,
      email,
      question,
      answer,
    });
    //console.log(newStudent); 
    // Save the new student to the database
    await newStudent.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error: ", error);
    res.status(500).json({ message: "An error occurred during registration. Please try again." });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // Find the student by USN (username)
    const student = await Student.findOne({ usn: username.toLowerCase() });
    if (!student) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: student._id, usn: student.usn }, "secretKey", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: "An error occurred during login. Please try again." });
  }
});



// Placeholder for placement officer data (this would typically be a database)
const placementOfficers = [
  { email: 'placement@bvrith.edu.in', 
    password: bcrypt.hashSync('placementlogin123', 10) // hashed password
  }
  ];

// Placement login endpoint
app.post('/api/placement-login', async (req, res) => {
  const { email, password } = req.body;

  // Find the placement officer
  const officer = placementOfficers.find((officer) => officer.email === email);
  
  if (!officer) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Verify password
  const match = await bcrypt.compare(password, officer.password);
  
  if (!match) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ email: officer.email }, 'your_jwt_secret', { expiresIn: '1h' });

  // Send token to frontend
  res.json({ token });
});

// Routes
app.post('/api/drives', async (req, res) => {
  try {
    const newDrive = new Drive(req.body);
    await newDrive.save();
    res.status(201).json({ message: 'Drive created successfully', data: newDrive });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create drive', details: err });
  }
});

// Fetch drives
app.get('/api/drives', async (req, res) => {
  try {
    const drives = await Drive.find(); // Fetch all drives from DB
    console.log("Fetched drives:", drives);  // Log the drives fetched
    res.status(200).json(drives);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drives', details: err });
  }
});

// Route to fetch messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }); // Fetch messages in reverse order (most recent first)
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// POST route to send a message
app.post("/api/messages", async (req, res) => {
  const { content, author } = req.body;

  if (!content || !author) {
    return res.status(400).json({ message: "Content and author are required" });
  }

  try {
    const newMessage = new Message({ content, author });
    await newMessage.save();
    res.status(201).json({ message: "Message posted successfully", data: newMessage });
  } catch (error) {
    console.error("Error posting message: from server.js", error);
    res.status(500).json({ message: "Failed to post message from server.js" });
  }
});



// Server Start
const PORT =  5000;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});