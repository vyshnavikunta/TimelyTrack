import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { id } = useParams();  // Extract the student ID from the URL

  // Log the id to see if it's being passed correctly
  useEffect(() => {
    console.log("Student ID from URL:", id); // Check if ID is correctly extracted
  }, [id]);

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`/api/student/${id}`);  // Assuming the API is set up to handle this route
        if (!response.ok) {
          throw new Error('Student not found');
        }
        const data = await response.json();
        setStudent(data);  // If student is found, set it in the state
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);  // Set loading to false once the data is fetched or if an error occurs
      }
    };

    if (id) {  // Only fetch data if id is available
      fetchStudentData();
    } else {
      console.error('No student ID provided');
    }
  }, [id]);  // Re-run the effect if the ID changes

  if (loading) {
    return <div>Loading...</div>;  // Display loading while fetching data
  }

  if (!student) {
    return <div>Student not found</div>;  // Display message if no student data is returned
  }

  return (
    <div>
      <h2>Student Profile</h2>
      <h1>{student.fullname}</h1>
      <p>USN: {student.usn}</p>
      <p>Email: {student.email}</p>
      {/* Add more student details as needed */}
    </div>
  );
};

export default StudentProfile;
