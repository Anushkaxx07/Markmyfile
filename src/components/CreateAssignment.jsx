import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateAssignment() {
  const navigate = useNavigate();
  const location = useLocation();

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

    navigate("/lab", {
      state: {
        labName,
        newAssignment,
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "3rem auto",
        padding: "30px",
        background: "#0f172a",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          fontSize: "2.2rem",
          fontWeight: "600",
          textAlign: "center",
          letterSpacing: "1px",
          color: "#60a5fa",
        }}
      >
        Create New Assignment
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Assignment Name */}
        <label style={{ fontWeight: 500 }}>Assignment Name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #334155",
            marginBottom: "15px",
            background: "#1e293b",
            color: "white",
            outline: "none",
          }}
        />

        {/* Details */}
        <label style={{ fontWeight: 500 }}>Assignment Details</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #334155",
            marginBottom: "15px",
            background: "#1e293b",
            color: "white",
            outline: "none",
          }}
        />

        {/* Start Time */}
        <label style={{ fontWeight: 500 }}>Start Date & Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #334155",
            marginBottom: "15px",
            background: "#1e293b",
            color: "white",
            outline: "none",
          }}
        />

        {/* End Time */}
        <label style={{ fontWeight: 500 }}>End Date & Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #334155",
            marginBottom: "20px",
            background: "#1e293b",
            color: "white",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            fontSize: "1.1rem",
            marginTop: "10px",
            transition: "0.3s",
          }}
        >
          Create Assignment
        </button>
      </form>
    </div>
  );
}
