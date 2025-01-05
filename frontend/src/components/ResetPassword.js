import React, { useState } from "react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    question: "What is your nickname?",
    answer: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          question: formData.question,
          answer: formData.answer,
          newPassword: formData.newPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Password reset successful!");
        setFormData({
          email: "",
          question: "What is your nickname?",
          answer: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="border rounded p-4 bg-light">
            <h2 className="text-center mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="question" className="form-label">
                  Security Question
                </label>
                <select
                  className="form-select"
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                >
                  <option value="What is your nickname?">
                    What is your nickname?
                  </option>
                  <option value="What is your fav spot?">
                    What is your fav spot?
                  </option>
                  <option value="What is your fav dish?">
                    What is your fav dish?
                  </option>
                  <option value="What is your dream land address?">
                    What is your dream land address?
                  </option>
                  <option value="What is your first mobile number?">
                    What is your first mobile number?
                  </option>
                  <option value="What is your one truth which others do not know?">
                    What is your one truth which others do not know?
                  </option>
                  <option value="What is your detained years in life?">
                    What is your detained years in life?
                  </option>
                  <option value="What is your enemy name?">
                    What is your enemy name?
                  </option>
                  <option value="What is your pet name?">
                    What is your pet name?
                  </option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="answer" className="form-label">
                  Answer
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Reset Password
              </button>
            </form>
            <p className="mt-3 text-center">
              Remembered your password?{" "}
              <a href="/student-login" className="text-primary">
                Sign in here!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
