const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Initialize the app and middleware
const app = express();
app.use(express.json());
app.use(cors());

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

// Create the Student Model
const Student = mongoose.model("Student", studentSchema);

// Create the Drive model
const Drive = mongoose.model('Drive', driveSchema);


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


// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});