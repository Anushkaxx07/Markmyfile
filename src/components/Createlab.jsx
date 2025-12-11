import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Createlab = () => {
  const navigate = useNavigate();
  const [labName, setLabName] = useState("");

  const handleCreate = async () => {
    if (!labName.trim()) {
      alert("Please enter a lab name.");
      return;
    }

    const newLab = {
      labName,
      details: "Basic details + Assignments + Resources"
    };

    // 🔥 TEMPORARY (for now)
    console.log("Lab created (will be sent to backend later):", newLab);

    /*  
    // 🔥 REAL BACKEND CALL (you'll use this later)
    await fetch("http://localhost:5000/api/labs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLab)
    });
    */

    navigate("/uploadt");
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Create New Lab</h2>

        <input
          type="text"
          placeholder="Enter Lab Name"
          value={labName}
          onChange={(e) => setLabName(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleCreate} style={styles.button}>Create Lab</button>
        <button onClick={() => navigate("/uploadt")} style={styles.cancel}>Cancel</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4"
  },
  box: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  title: {
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    fontSize: "1rem"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px"
  },
  cancel: {
    width: "100%",
    padding: "10px",
    background: "#aaa",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Createlab;
