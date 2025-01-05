const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Video = require('./models/videoModel'); // Import the Video model

require('dotenv').config();  // Load .env variables

// Initialize the app and middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connect to MongoDB
require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const driveRoutes = require('./routes/driveRoutes');
const postRoutes = require('./routes/postRoutes');

// Use routes
app.use('/api', authRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api', postRoutes);

// Serve static files (videos) from 'uploads' directory
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route to fetch videos from database
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch video metadata from MongoDB
    res.status(200).json({ videos });
  } catch (err) {
    res.status(500).json({ message: 'Unable to fetch videos', error: err });
  }
});

// Route to update video title
app.put('/api/videos/:filename', async (req, res) => {
  const { filename } = req.params;
  const { title } = req.body;
  
  try {
    // Find the video by filename and update its title
    const video = await Video.findOneAndUpdate(
      { filename: filename },
      { title: title },
      { new: true } // Return the updated video document
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Video title updated successfully',
      video: video
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating video title', error: err });
  }
});

// Route to delete video from both server and database
app.delete('/api/videos/:filename', async (req, res) => {
  const { filename } = req.params;
  const videoPath = path.join(__dirname, 'uploads', filename);

  try {
    // Remove video metadata from MongoDB
    await Video.findOneAndDelete({ filename });

    // Delete the video file from the server
    fs.unlink(videoPath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting video file.' });
      }
      res.status(200).json({ message: 'Video deleted successfully.' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting video from database', error: err });
  }
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
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Handle the video upload
app.post('/api/upload-video', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  const { title } = req.body; // Get title from the request body
  const filename = req.file.filename; // Get the filename from the uploaded file

  try {
    // Save the video metadata (title and filename) to the database
    const newVideo = new Video({
      title,
      filename
    });

    await newVideo.save(); // Save the new video document

    res.json({
      success: true,
      message: 'Video uploaded successfully!',
      video: newVideo // Return the video metadata
    });
  } catch (err) {
    console.error('Error uploading video:', err);
    res.status(500).json({ success: false, message: 'Error uploading video.' });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

































// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const multer = require('multer');
// const path = require('path');
// const cookieParser = require("cookie-parser");
// require('dotenv').config();  // Load .env variables

// // Initialize the app and middleware
// const app = express();
// app.use(express.json());
// app.use(cors());
// // Serve static files (videos) from 'uploads' directory
// app.use('/uploads', express.static('uploads'));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Route to fetch videos
// app.get('/api/videos', (req, res) => {
//   const videoDirectory = './uploads';
//   fs.readdir(videoDirectory, (err, files) => {
//     if (err) {
//       return res.status(500).json({ message: 'Unable to fetch videos' });
//     }

//     // Filter only video files, assuming they're either mp4 or other video extensions
//     const videoFiles = files.filter(file => file.endsWith('.mp4') || file.endsWith('.mov'));

//     res.status(200).json({ videos: videoFiles });
//   });
// });


// // Set up storage engine for Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Save videos in the 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as filename
//   },
// });


// // Initialize multer with the storage configuration
// const upload = multer({ storage: storage });

// // Create a folder for storing the uploaded videos
// const fs = require('fs');
// const uploadsDir = './uploads';

// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Handle the video upload
// app.post('/api/upload-video', upload.single('video'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ success: false, message: 'No file uploaded.' });
//   }

//   res.json({
//     success: true,
//     message: 'Video uploaded successfully!',
//     file: req.file, // You can send back the file path or URL here
//   });
// });

// // MongoDB connection
// // mongoose
// //   .connect("mongodb://localhost:27017/phms", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => console.log("MongoDB Connected"))
// //   .catch((err) => console.log(err));

//   // mongoose.connect("mongodb://localhost:27017/phms")
//   // .then(() => {
//   //   console.log('MongoDB Connected');
//   // })
//   // .catch((err) => {
//   //   console.error('MongoDB connection error:', err);
//   // });

// // Define the Drive schema
// // const driveSchema = new mongoose.Schema({
// //   companyName: String,
// //   driveDate: String,
// //   type: String,
// //   ctc: String,
// //   status: {
// //     appliedCount: { type: Number, default: 0 },
// //     hiredCount: { type: Number, default: 0 },
// //   },
// // });  

// // Define Student Schema
// //const studentSchema = new mongoose.Schema({
// //   fullname: { type: String, required: true },
// //   usn: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   question: { type: String, required: true },
// //   answer: { type: String, required: true },
// // });

// // Define the Message schema
// // const messageSchema = new mongoose.Schema({
// //   content: { type: String, required: true },
// //   author: { type: String, required: true },
// //   timestamp: { type: Date, default: Date.now },
// // });

// // Define the Post schema
// const postSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   author: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
//   tags: [String],
// });
// // Create the Post model
// const Post = mongoose.model('Post', postSchema);

// // Define the Tag schema
// const tagSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
// });
// // Create the Tag model
// const Tag = mongoose.model('Tag', tagSchema);

// // Define the Reply schema
// const replySchema = new mongoose.Schema({
//   content: { type: String, required: true },
//   post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
//   author: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
// });
// // Create the Reply model
// const Reply = mongoose.model('Reply', replySchema);


// // Create the Student Model
// const Student = mongoose.model("Student", studentSchema);

// // Create the Drive model
// const Drive = mongoose.model('Drive', driveSchema);

// // Create the Message model
// const Message = mongoose.model('Message', messageSchema);

// // Register Route
// app.post("/api/register", async (req, res) => {
//   const { fullname, usn, password, email, question, answer } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await Student.findOne({ $or: [{ usn }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ message: "User with this USN or Email already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new student
//     const newStudent = new Student({
//       fullname,
//       usn,
//       password: hashedPassword,
//       email,
//       question,
//       answer,
//     });
//     //console.log(newStudent); 
//     // Save the new student to the database
//     await newStudent.save();

//     res.status(201).json({ message: "Registration successful" });
//   } catch (error) {
//     console.error("Registration error: ", error);
//     res.status(500).json({ message: "An error occurred during registration. Please try again." });
//   }
// });

// // Login Route
// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required" });
//   }

//   try {
//     // Find the student by USN (username)
//     const student = await Student.findOne({ usn: username.toLowerCase() });
//     if (!student) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare the password with the hashed password stored in the database
//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Create a JWT token
//     const token = jwt.sign({ id: student._id, usn: student.usn }, "secretKey", {
//       expiresIn: "1h",
//     });

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Login error: ", error);
//     res.status(500).json({ message: "An error occurred during login. Please try again." });
//   }
// });



// // Placeholder for placement officer data (this would typically be a database)
// const placementOfficers = [
//   { email: 'placement@bvrith.edu.in', 
//     password: bcrypt.hashSync('placementlogin123', 10) // hashed password
//   }
//   ];

// // Placement login endpoint
// app.post('/api/placement-login', async (req, res) => {
//   const { email, password } = req.body;

//   // Find the placement officer
//   const officer = placementOfficers.find((officer) => officer.email === email);
  
//   if (!officer) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   // Verify password
//   const match = await bcrypt.compare(password, officer.password);
  
//   if (!match) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   // Generate JWT token
//   const token = jwt.sign({ email: officer.email }, 'your_jwt_secret', { expiresIn: '1h' });

//   // Send token to frontend
//   res.json({ token });
// });

// // Routes
// app.post('/api/drives', async (req, res) => {
//   try {
//     const newDrive = new Drive(req.body);
//     await newDrive.save();
//     res.status(201).json({ message: 'Drive created successfully', data: newDrive });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create drive', details: err });
//   }
// });

// // Fetch drives
// app.get('/api/drives', async (req, res) => {
//   try {
//     const drives = await Drive.find(); // Fetch all drives from DB
//     console.log("Fetched drives:", drives);  // Log the drives fetched
//     res.status(200).json(drives);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch drives', details: err });
//   }
// });



// const postController = {
//   createPost: async (req, res) => {
//     try {
//       const { title, content, tags } = req.body;
//       const post = new Post({ title, content, author: req.userId, tags });
//       await post.save();
//       res.status(201).send("Post created successfully");
//     } catch (err) {
//       res.status(400).send(err.message);
//     }
//   },
//   getPosts: async (req, res) => {
//     try {
//       const posts = await Post.find().populate("author", "username").exec();
//       res.status(200).json(posts);
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   },
// };

// const tagController = {
//   createTag: async (req, res) => {
//     try {
//       const { name } = req.body;
//       const tag = new Tag({ name });
//       await tag.save();
//       res.status(201).send("Tag created successfully");
//     } catch (err) {
//       res.status(400).send(err.message);
//     }
//   },
// };

// const replyController = {
//   addReply: async (req, res) => {
//     try {
//       const { content, postId } = req.body;
//       const reply = new Reply({ content, post: postId, author: req.userId });
//       await reply.save();
//       res.status(201).send("Reply added successfully");
//     } catch (err) {
//       res.status(400).send(err.message);
//     }
//   },
// };

// // Middleware for authentication
// const authenticate = (req, res, next) => {

//   console.log("Received request for authentication");
//   const token = req.cookies.token;
//   if (!token) return res.status(401).send("Access denied. No token provided.");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid token.");
//   }
// };

// app.post("/posts", authenticate, postController.createPost);
// app.get("/posts", postController.getPosts);
// app.post("/tags", authenticate, tagController.createTag);
// app.post("/replies", authenticate, replyController.addReply);


// // Server Start
// const PORT =  5000;
// app.listen(PORT, () => {
//   console.log('Server is running on port ${PORT}');
// });
