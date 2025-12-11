import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateAssignment() {
  const navigate = useNavigate();
  const location = useLocation();

  // labName received from Lab.jsx
  const { labName } = location.state || {};

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAssignment = {
      id: Date.now(),
      title,
      description,
      startTime,
      endTime,
    };

    // Redirect to Lab page with new assignment
    navigate("/lab", {
      state: {
        labName,
        newAssignment,
      },
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>New Assignment</h2>

      <form onSubmit={handleSubmit}>
        {/* Assignment Name */}
        <label>Assignment Name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        {/* Details */}
        <label>Assignment Details</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: "100%",
            height: "80px",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        {/* Start Time */}
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        {/* End Time */}
        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: "15px",
            padding: "8px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Create Assignment
        </button>
      </form>
    </div>
  );
}
