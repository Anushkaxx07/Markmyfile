import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cart from "./Cart";
import "./Uploadt.css";

const Uploadt = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { name, college, imagePreview } = location.state || {};

  const [profileImage] = useState(imagePreview || "./teacher.jpg");

  const [labs, setLabs] = useState([]);
  const [newLabName, setNewLabName] = useState("");
  const [selectedLabIndex, setSelectedLabIndex] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const [showCreateLab, setShowCreateLab] = useState(false);
  const [showUpdateLab, setShowUpdateLab] = useState(false);

  // NEW: Selected lab for showing content
  const [selectedLab, setSelectedLab] = useState(null);

  useEffect(() => {
    const mockLabs = [
      {
        labName: "Lab 1",
        details: "Basic details + Assignments + Resources",
        assignments: [
          { id: 1, title: "Assignment 1", description: "Basics of Java" },
          { id: 2, title: "Assignment 2", description: "Loops & Arrays" },
        ],
      },
      {
        labName: "Lab 2",
        details: "Basic details + Assignments + Resources",
        assignments: [],
      },
    ];
    setLabs(mockLabs);
  }, []);

  const goToSettings = () => {
    navigate("/settingst", { state: { name, college, imagePreview } });
  };

  const openCreateLab = () => {
    setShowUpdateLab(false);
    setShowCreateLab(true);
    setSelectedLab(null);
  };

  const openUpdateLab = () => {
    setShowCreateLab(false);
    setShowUpdateLab(true);
    setSelectedLab(null);
  };

  const goToLab = (lab) => {
    setSelectedLab(lab);
    setShowCreateLab(false);
    setShowUpdateLab(false);
  };

  const handleCreateLab = () => {
    if (!newLabName.trim()) return alert("Enter Lab Name!");

    const newLab = {
      labName: newLabName,
      details: "Basic details + Assignments + Resources",
      assignments: [],
    };

    setLabs([...labs, newLab]);
    setNewLabName("");
    setShowCreateLab(false);
  };

  const handleUpdateLab = () => {
    if (selectedLabIndex === null) return alert("Select a Lab!");
    if (!updatedName.trim()) return alert("Enter new lab name!");

    let updatedLabs = [...labs];
    updatedLabs[selectedLabIndex].labName = updatedName;

    setLabs(updatedLabs);
    setUpdatedName("");
    setSelectedLabIndex(null);
    setShowUpdateLab(false);
  };

  // =====================
  // Assignment Handlers
  // =====================

  const createAssignment = () => {
    if (!selectedLab) return;
    navigate("/create-assignment", { state: { labName: selectedLab.labName } });
  };

  const deleteAssignment = (id) => {
    if (!selectedLab) return;
    const updatedLab = { ...selectedLab };
    updatedLab.assignments = updatedLab.assignments.filter((a) => a.id !== id);

    // Update labs array
    const updatedLabs = labs.map((lab) =>
      lab.labName === updatedLab.labName ? updatedLab : lab
    );
    setLabs(updatedLabs);
    setSelectedLab(updatedLab);
  };

  const openAssessment = (assignmentId) => {
    navigate(`/assessment/${assignmentId}`);
  };

  // =====================
  // JSX
  // =====================

  return (
    <div className="upload-container">

      {/* HEADER */}
      <div className="header">
        <div className="header-left">
          <img src="/logo.png" className="logo" alt="Logo" />
          <h1 className="title">MarkMyFile - Teacher</h1>
        </div>

        <div className="profile-container">
          <img src={profileImage} className="profile-img" alt="profile" />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="sidebar open bg-gray-100 flex flex-col justify-center">
        <h3 className=" text-[2rem] flex items-center justify-center font-semibold">
          My Labs
        </h3>

        <ul className="lab-list">
          {labs.map((lab, i) => (
            <li
              key={i}
              className="hover:text-black bg-gray-700"
              onClick={() => goToLab(lab)}
            >
              <i className="fa fa-flask"></i> {lab.labName}
            </li>
          ))}
        </ul>

        <button className="sidebar-btn create" onClick={openCreateLab}>
          <i className="fa fa-plus"></i> Create Lab
        </button>

        <button className="sidebar-btn update" onClick={openUpdateLab}>
          <i className="fa fa-pencil"></i> Update Lab
        </button>

        <button className="sidebar-btn settings" onClick={goToSettings}>
          <i className="fa fa-cog"></i> Settings
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content shift">

        {/* CREATE LAB FORM */}
        {showCreateLab && (
          <div style={formBox}>
            <h2>Create New Lab</h2>
            <input
              type="text"
              placeholder="Enter Lab Name"
              value={newLabName}
              onChange={(e) => setNewLabName(e.target.value)}
              style={inputStyle}
            />
            <button onClick={handleCreateLab} style={primaryBtn}>
              Create Lab
            </button>
            <button onClick={() => setShowCreateLab(false)} style={secondaryBtn}>
              Cancel
            </button>
          </div>
        )}

        {/* UPDATE LAB FORM */}
        {showUpdateLab && (
          <div style={formBox}>
            <h2>Update Lab</h2>

            <select
              style={inputStyle}
              onChange={(e) => {
                setSelectedLabIndex(e.target.value);
                setUpdatedName("");
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Select a Lab
              </option>
              {labs.map((lab, i) => (
                <option key={i} value={i}>
                  {lab.labName}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Enter New Lab Name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              style={inputStyle}
            />

            <button onClick={handleUpdateLab} style={primaryBtn}>
              Update
            </button>
            <button onClick={() => setShowUpdateLab(false)} style={secondaryBtn}>
              Cancel
            </button>
          </div>
        )}

        {/* DEFAULT HELLO SCREEN */}
        {!showCreateLab && !showUpdateLab && !selectedLab && (
          <div className="welcome-box">
            <h1>Hello Prof. {name} 👋</h1>
            <h3>{college}</h3>
            <p>Select any lab from the sidebar to continue.</p>
          </div>
        )}

        {/* LAB CONTENT SCREEN */}
        {selectedLab && !showCreateLab && !showUpdateLab && (
          <div style={styles.container}>
            <h1 style={styles.heading}>{selectedLab.labName}</h1>

            <button style={styles.createBtn} onClick={createAssignment}>
              + Create Assignment
            </button>

            <div style={styles.cardGrid}>
              {selectedLab.assignments.length > 0 ? (
                selectedLab.assignments.map((a) => (
                  <Cart
                    key={a.id}
                    data={{ className: a.title, teacher: "Assignment" }}
                    onDelete={() => deleteAssignment(a.id)}
                    rectangle
                  >
                    <p style={{ marginTop: "5px", color: "#334155" }}>
                      {a.description}
                    </p>
                    <button
                      style={styles.assessBtn}
                      onClick={() => openAssessment(a.id)}
                    >
                      Assessment
                    </button>
                  </Cart>
                ))
              ) : (
                <p>No assignments added yet.</p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// Form styles
const formBox = {
  background: "white",
  padding: "30px",
  width: "350px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  margin: "10px 0",
  fontSize: "1rem",
};

const primaryBtn = {
  width: "100%",
  padding: "10px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "10px",
};

const secondaryBtn = {
  width: "100%",
  padding: "10px",
  background: "#aaa",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

// =====================
//     ASSIGNMENT UI CSS
// =====================
const styles = {
  container: {
    padding: "25px",
    fontFamily: "Poppins, sans-serif",
    background: "#f1f5f9",
    minHeight: "100vh",
  },

  heading: {
    fontSize: "2.4rem",
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: "20px",
    letterSpacing: "1px",
    textTransform: "capitalize",
  },

  createBtn: {
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    padding: "12px 25px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    marginBottom: "25px",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
    transition: "0.3s",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },

  assessBtn: {
    marginTop: "12px",
    padding: "10px",
    background: "#1e40af",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "500",
    transition: "0.3s",
  },
};

export default Uploadt;
