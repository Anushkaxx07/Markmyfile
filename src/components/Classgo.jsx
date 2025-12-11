import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Assign from "./Assign";

const Classgo = () => {
  const location = useLocation();
  const { className, teacher } = location.state || {};

  // 👇 Class-wise assignment data
  const [assignments] = useState({
    "Software Engineering": [
      {
        details:
          "Task: Write a program to find if a number is an Armstrong number or not.",
        time: "60", // seconds or minutes (you can adjust)
      },
      {
        details:
          "Task: Write a program to check if a number is Prime or not.",
        time: "40",
      },
    ],
    "Computer Networks": [
      {
        details: "Task: Create a calculator using JavaScript.",
        time: "15",
      },
      {
        details: "Task: Implement bubble sort in C.",
        time: "10",
      },
    ],
    "Discrete Structures": [
      {
        details: "Task: Solve quadratic equations.",
        time: "10",
      },
      {
        details: "Task: Perform integration by parts on given examples.",
        time: "15",
      },
    ],
  });

  // 👇 Fetch only assignments for selected class
  const classAssignments = assignments[className] || [];

  return (
    <div style={{ padding: "2rem" }}>
      {/* Header Section */}
      <div
        style={{
          backgroundColor: "#2b71daff",
          color: "#fff",
          borderRadius: "2rem",
          padding: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{
    backgroundImage: "url('/cl2.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
    padding: "1.5rem",
    minHeight: "120px",
   
    
  }}></div>
        <h1 style={{ fontSize: "2rem", padding: "1rem" }}>{className}</h1>
        <h3 style={{ fontSize: "1rem", padding: "1rem" }}>Teacher: {teacher}</h3>
      </div>

      {/* Render class-wise assignments */}
      {classAssignments.length > 0 ? (
        classAssignments.map((info, index) => (
          <Assign
            key={index}
            info={info}
            className={className}
            teacher={teacher}
          />
        ))
      ) : (
        <p>No assignments found for this class.</p>
      )}
    </div>
  );
};

export default Classgo;
