import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Updatelab = () => {
  const navigate = useNavigate();

  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState("");
  const [newName, setNewName] = useState("");

  // 🔵 TEMPORARY: Mock fetch (same as Uploadt)
  useEffect(() => {
    const mockLabs = [
      { labName: "Lab 1", details: "Basic details + Assignments + Resources" },
      { labName: "Lab 2", details: "Basic details + Assignments + Resources" }
    ];
    setLabs(mockLabs);
  }, []);

  /* 
  // 🔵 REAL BACKEND CALL — use when backend is ready
  useEffect(() => {
    fetch("http://localhost:5000/api/labs")
      .then(res => res.json())
      .then(data => setLabs(data))
      .catch(err => console.error("Error loading labs:", err));
  }, []);
  */

  const handleUpdate = async () => {
    if (!selectedLab) return alert("Please select a lab to update.");
    if (!newName.trim()) return alert("Please enter a new lab name.");

    // TEMPORARY frontend update
    const updated = labs.map((lab) =>
      lab.labName === selectedLab ? { ...lab, labName: newName } : lab
    );

    console.log("Updated lab (will be sent to backend):", updated);

    /*
    // REAL API REQUEST (enable later)
    await fetch(`http://localhost:5000/api/labs/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldName: selectedLab,
        newName: newName
      })
    });
    */

    navigate("/uploadt");
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Update Lab Name</h2>

        {/* Select Lab */}
        <select
          style={styles.input}
          value={selectedLab}
          onChange={(e) => setSelectedLab(e.target.value)}
        >
          <option value="">Select Lab</option>
          {labs.map((lab, i) => (
            <option key={i} value={lab.labName}>
              {lab.labName}
            </option>
          ))}
        </select>

        {/* New Name */}
        <input
          type="text"
          placeholder="Enter corrected lab name"
          style={styles.input}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <button style={styles.button} onClick={handleUpdate}>
          Update Name
        </button>
        <button style={styles.cancel} onClick={() => navigate("/uploadt")}>
          Cancel
        </button>
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
    background: "#28a745",
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

export default Updatelab;
