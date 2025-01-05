const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { findUserByEmail, updatePassword } = require("../services/userService");

// Password Reset Route
router.post("/reset-password", async (req, res) => {
  const { email, question, answer, newPassword } = req.body;

  try {
    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate security question answer
    if (user.question !== question || user.answer !== answer) {
      return res.status(400).json({ message: "Invalid security question or answer" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await updatePassword(email, hashedPassword);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

module.exports = { resetPassword: router };
