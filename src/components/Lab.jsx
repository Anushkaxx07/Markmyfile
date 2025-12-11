import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cart from "./Cart";

const Lab = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { labName, newAssignment } = location.state || {};

  const [assignments, setAssignments] = useState([]);

  // Load mock assignments on first render
  useEffect(() => {
    const mockAssignments = [
      { id: 1, title: "Assignment 1", description: "Basics of Java" },
      { id: 2, title: "Assignment 2", description: "Loops & Arrays" },
    ];
    setAssignments(mockAssignments);
  }, []);

  // Append new assignment passed from CreateAssignment
  useEffect(() => {
    if (newAssignment) {
      setAssignments((prev) => {
        // Generate a new unique ID
        const maxId = prev.length ? Math.max(...prev.map(a => a.id)) : 0;
        return [...prev, { ...newAssignment, id: maxId + 1 }];
      });
    }
  }, [newAssignment]);

  const createAssignment = () => {
    navigate("/create-assignment", { state: { labName } });
  };

  const openAssessment = (assignmentId) => {
    navigate(`/assessment/${assignmentId}`);
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{labName}</h1>

      <button style={styles.createBtn} onClick={createAssignment}>
        + Create Assignment
      </button>

      {/* Assignment Cards */}
      <div style={styles.cardGrid}>
        {assignments.map((a) => (
          <Cart
            key={a.id}
            data={{
              className: a.title,
              teacher: "Assignment",
            }}
            onDelete={() => deleteAssignment(a.id)}
          >
            <p style={{ marginTop: "5px" }}>{a.description}</p>

            <button
              style={styles.assessBtn}
              onClick={() => openAssessment(a.id)}
            >
              Assessment
            </button>
          </Cart>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px" },
  heading: { fontSize: "2rem", marginBottom: "15px" },
  createBtn: {
    background: "#007bff",
    padding: "10px 20px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  assessBtn: {
    marginTop: "10px",
    padding: "8px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
  },
};

export default Lab;
