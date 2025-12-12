import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Uploadt.css";

const Uploadt = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { name, college, imagePreview } = location.state || {};
  const [profileImage] = useState(imagePreview || "./teacher.jpg");

  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);

  // Create / Update Lab
  const [showCreateLab, setShowCreateLab] = useState(false);
  const [showUpdateLab, setShowUpdateLab] = useState(false);
  const [newLabName, setNewLabName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [selectedLabIndex, setSelectedLabIndex] = useState(null);

  // Assignment create
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState("");
  const [newAssignmentDesc, setNewAssignmentDesc] = useState("");
  const [newAssignmentStart, setNewAssignmentStart] = useState("");
  const [newAssignmentEnd, setNewAssignmentEnd] = useState("");
  const [newAssignmentResource, setNewAssignmentResource] = useState(null);

  useEffect(() => {
    const mockLabs = [
      {
        labName: "Lab 1",
        details: "Basic details + Assignments + Resources",
        assignments: [
          {
            id: 1,
            title: "Assignment 1",
            description: "Basics of Java",
            start: "09:00",
            end: "11:00",
            resource: null,
          },
          {
            id: 2,
            title: "Assignment 2",
            description: "Loops & Arrays",
            start: "12:00",
            end: "14:00",
            resource: null,
          },
        ],
      },
      { labName: "Lab 2", details: "Basic details", assignments: [] },
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
    if (selectedLabIndex === null) return alert("Select a lab!");
    if (!updatedName.trim()) return alert("Enter new lab name!");

    let updatedLabs = [...labs];
    updatedLabs[selectedLabIndex].labName = updatedName;
    setLabs(updatedLabs);

    setUpdatedName("");
    setSelectedLabIndex(null);
    setShowUpdateLab(false);
  };

  const createAssignment = () => {
    setShowCreateAssignment(true);
    setNewAssignmentTitle("");
    setNewAssignmentDesc("");
    setNewAssignmentStart("");
    setNewAssignmentEnd("");
    setNewAssignmentResource(null);
  };

  const handleAddAssignment = () => {
    if (!newAssignmentTitle.trim()) return alert("Enter title");
    if (!newAssignmentDesc.trim()) return alert("Enter description");

    const newId = selectedLab.assignments.length
      ? Math.max(...selectedLab.assignments.map((a) => a.id)) + 1
      : 1;

    const newAssign = {
      id: newId,
      title: newAssignmentTitle,
      description: newAssignmentDesc,
      start: newAssignmentStart,
      end: newAssignmentEnd,
      resource: newAssignmentResource
        ? {
            name: newAssignmentResource.name,
            url: URL.createObjectURL(newAssignmentResource),
          }
        : null,
    };

    const updatedLab = {
      ...selectedLab,
      assignments: [...selectedLab.assignments, newAssign],
    };

    const updatedLabs = labs.map((lab) =>
      lab.labName === updatedLab.labName ? updatedLab : lab
    );

    setLabs(updatedLabs);
    setSelectedLab(updatedLab);
    setShowCreateAssignment(false);
  };

  const deleteAssignment = (id) => {
    const updatedLab = {
      ...selectedLab,
      assignments: selectedLab.assignments.filter((a) => a.id !== id),
    };

    const updatedLabs = labs.map((lab) =>
      lab.labName === updatedLab.labName ? updatedLab : lab
    );

    setLabs(updatedLabs);
    setSelectedLab(updatedLab);
  };

  const openAssessment = (id) => {
    navigate(`/assessment/${id}`);
  };

  return (
    <div className="theme-root">

      {/* TOPBAR */}
      <div className="topbar">
        <div className="brand">
          <img src="/logo.png" className="brand-logo" alt="logo" />
          <div className="brand-title">MarkMyFile - Teacher</div>
        </div>

        <div className="top-right">
          <div className="profile-area">
            <img src={profileImage} className="profile-img" alt="profile" />
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="slide-sidebar">
        <div className="slide-title">My Labs</div>

        {labs.map((lab, index) => (
          <div
            key={index}
            className="slide-item"
            onClick={() => goToLab(lab)}
          >
            {lab.labName}
          </div>
        ))}

        <button className="slide-item" onClick={openCreateLab}>
          + Create Lab
        </button>

        <button className="slide-item" onClick={openUpdateLab}>
          ✏ Update Lab
        </button>

        <button className="slide-item" onClick={goToSettings}>
          ⚙ Settings
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-panel">
        <div className="container">

          {/* WELCOME SCREEN */}
          {!selectedLab && !showCreateLab && !showUpdateLab && (
            <div>
              <h1 className="title blue-heading">Hello, Prof. {name} 👋</h1>
              <p>{college}</p>
              <p>Select a lab from sidebar to continue.</p>
            </div>
          )}

          {/* CREATE LAB */}
          {showCreateLab && (
            <div className="form-box">
              <h2>Create Lab</h2>
              <input
                className="input"
                placeholder="Enter Lab Name"
                value={newLabName}
                onChange={(e) => setNewLabName(e.target.value)}
              />
              <button className="btn primary" onClick={handleCreateLab}>
                Create
              </button>
              <button className="btn ghost" onClick={() => setShowCreateLab(false)}>
                Cancel
              </button>
            </div>
          )}

          {/* UPDATE LAB */}
          {showUpdateLab && (
            <div className="form-box">
              <h2>Update Lab</h2>
              <select
                className="input"
                onChange={(e) => setSelectedLabIndex(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Select Lab</option>
                {labs.map((lab, i) => (
                  <option value={i} key={i}>{lab.labName}</option>
                ))}
              </select>

              <input
                className="input"
                placeholder="New Lab Name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />

              <button className="btn primary" onClick={handleUpdateLab}>Update</button>
              <button className="btn ghost" onClick={() => setShowUpdateLab(false)}>Cancel</button>
            </div>
          )}

          {/* LAB & ASSIGNMENTS */}
          {selectedLab && (
            <div>
              <h1 className="title blue-heading">{selectedLab.labName}</h1>

              <button className="btn primary" onClick={createAssignment}>
                + Create Assignment
              </button>

              {showCreateAssignment && (
                <div className="form-box">
                  <input
                    className="input"
                    placeholder="Assignment Title"
                    value={newAssignmentTitle}
                    onChange={(e) => setNewAssignmentTitle(e.target.value)}
                  />

                  <input
                    className="input"
                    placeholder="Description"
                    value={newAssignmentDesc}
                    onChange={(e) => setNewAssignmentDesc(e.target.value)}
                  />

                  <input
                    className="input"
                    type="time"
                    value={newAssignmentStart}
                    onChange={(e) => setNewAssignmentStart(e.target.value)}
                  />

                  <input
                    className="input"
                    type="time"
                    value={newAssignmentEnd}
                    onChange={(e) => setNewAssignmentEnd(e.target.value)}
                  />

                  <input
                    className="input"
                    type="file"
                    onChange={(e) => setNewAssignmentResource(e.target.files[0])}
                  />

                  <button className="btn primary" onClick={handleAddAssignment}>
                    Add
                  </button>

                  <button className="btn ghost" onClick={() => setShowCreateAssignment(false)}>
                    Cancel
                  </button>
                </div>
              )}

              <div className="assignments-grid">
                {selectedLab.assignments.length > 0 ? (
                  selectedLab.assignments.map((a) => (
                    <div className="assignment-card" key={a.id}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3>{a.title}</h3>

                        {/* Delete Button */}
                        <div className="dropdown-item" onClick={() => deleteAssignment(a.id)}>
                          DELETE
                        </div>
                      </div>

                      <p>{a.description}</p>
                      <p>
                        <strong>Start:</strong> {a.start} &nbsp; | &nbsp;
                        <strong>End:</strong> {a.end}
                      </p>

                      {a.resource && (
                        <p>
                          <strong>Resource:</strong>{" "}
                          <a href={a.resource.url} target="_blank">
                            {a.resource.name}
                          </a>
                        </p>
                      )}

                      {/* Status Button */}
                      <button className="status-btn missed">Assignment Missed</button>

                      <button className="btnp" onClick={() => openAssessment(a.id)}>
                        Assessment
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No assignments created yet.</p>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Uploadt;
