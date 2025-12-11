import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  useEffect(() => {
    const mockLabs = [
      { labName: "Lab 1", details: "Basic details + Assignments + Resources" },
      { labName: "Lab 2", details: "Basic details + Assignments + Resources" }
    ];
    setLabs(mockLabs);
  }, []);

  const goToSettings = () => {
    navigate("/settingst",{state:{name,college,imagePreview}});
  };

  const openCreateLab = () => {
    setShowUpdateLab(false);
    setShowCreateLab(true);
  };

  const openUpdateLab = () => {
    setShowCreateLab(false);
    setShowUpdateLab(true);
  };

  const goToLab = (labName) => {
    navigate("/lab", { state: { labName } });
  };

  const handleCreateLab = () => {
    if (!newLabName.trim()) return alert("Enter Lab Name!");

    const newLab = {
      labName: newLabName,
      details: "Basic details + Assignments + Resources"
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
        <h3 className=" text-[2rem] flex items-center justify-center font-semibold">My Labs</h3>

        <ul className="lab-list">
          {labs.map((lab, i) => (
            <li key={i} className=" hover:text-black bg-gray-700" onClick={() => goToLab(lab.labName)}>
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

        {/* NEW SETTINGS BUTTON */}
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
              <option value="" disabled>Select a Lab</option>
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

        {/* DEFAULT WELCOME SCREEN */}
        {!showCreateLab && !showUpdateLab && (
          <div className="welcome-box">
            <h1>Hello Prof. {name} 👋</h1>
            <h3>{college}</h3>
            <p>Select any lab from the sidebar to continue.</p>
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
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  margin: "10px 0",
  fontSize: "1rem"
};

const primaryBtn = {
  width: "100%",
  padding: "10px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "10px"
};

const secondaryBtn = {
  width: "100%",
  padding: "10px",
  background: "#aaa",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Uploadt;
