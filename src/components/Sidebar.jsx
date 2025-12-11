import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ enrolledClasses, profileImage, className }) => {
  const navigate = useNavigate();

  // Navigate to Settings and pass profileImage via location.state
  const handleSettingsClick = () => {
    navigate("/settings", { state: { profileImage } });
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        
      }}
    >
      {/* Classes List */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <h2
          style={{
            padding: "1rem",
            borderBottom: "1px solid #ccc",
          }}
        >
          Enrolled Classes
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {enrolledClasses.map((cls, index) => (
            <li
              key={index}
              style={{
                padding: "0.8rem 1rem",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
              }}
            >
              {cls.className} - {cls.teacher}
            </li>
          ))}
        </ul>
      </div>

      {/* Settings at Bottom */}
      <div
        style={{
          padding: "1rem",
          borderTop: "1px solid #ccc",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: 500,
          color: "#04264aff",
        }}
        onClick={handleSettingsClick}
      >
        <i className="fa fa-cog"></i>
        Settings
      </div>
    </div>
  );
};

export default Sidebar;
