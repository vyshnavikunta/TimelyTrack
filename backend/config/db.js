const mongoose = require("mongoose");

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
