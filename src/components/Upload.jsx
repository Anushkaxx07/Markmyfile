import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import Sidebar from "./Sidebar";

const Upload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

 

  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem("joinedClasses");
    return saved ? JSON.parse(saved) : [];
  });

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "./student.jpg"
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("joinedClasses", JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    const handleStorageChange = () => {
      const newImage = localStorage.getItem("profileImage");
      if (newImage) setProfileImage(newImage);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const joinClass = () => {
    const classCode = prompt("Enter Class Code:");
    if (!classCode) return;

    const exists = [...info, ...classes].find((cls) => cls.code === classCode);
    if (exists) {
      alert("You have already joined this class!");
      return;
    }

    const newClass = {
      className: `New Class (${classCode})`,
      teacher: "To Be Assigned",
      code: classCode,
    };

    setClasses([...classes, newClass]);
  };

  const removeClass = (index, type) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this class?");
    if (!confirmDelete) return;

    if (type === "info") {
      const updatedInfo = info.filter((_, i) => i !== index);
      setInfo(updatedInfo);
    } else if (type === "classes") {
      const classIndex = index - info.length;
      const updatedClasses = classes.filter((_, i) => i !== classIndex);
      setClasses(updatedClasses);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const togglePopup = () => setPopupOpen(!popupOpen);

 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-container")) setPopupOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/settings");
    setPopupOpen(false);
  };

  const allClasses = [
    ...info.map((cls) => ({ ...cls, source: "info" })),
    ...classes.map((cls) => ({ ...cls, source: "classes" })),
  ];

  return (
    <div className="upload-container">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="title">MarkMyFile</h1>
        </div>

        <div className="header-right">
          <div onClick={toggleSidebar} className="hamburger">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>

          <div className="join-btn" onClick={joinClass}>
            <i className="fa fa-plus" aria-hidden="true"></i> Join Class
          </div>

          {/* Profile image with popup */}
          <div className="profile-container">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-img"
              onClick={(e) => {
                e.stopPropagation();
                togglePopup();
              }}
            />
            {popupOpen && (
              <div className="profile-popup">
                <div className="popup-info">
                  <img src={profileImage} alt="Profile" className="popup-img" />
                  <p className="popup-name">{formData.name || "Student User"}</p>
                  <p className="popup-email">{formData.email || "student@college.edu"}</p>
                </div>
                <hr />
                <button onClick={goToSettings} className="popup-btn">
                  <i className="fa fa-cog"></i> Settings
                </button>
                <button onClick={handleLogout} className="popup-btn logout">
                  <i className="fa fa-sign-out"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        enrolledClasses={allClasses}
        profileImage={profileImage}
        className={sidebarOpen ? "sidebar open" : "sidebar"}
      />
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Main content */}
      <div className={`main-content ${sidebarOpen ? "shift" : ""}`}>
        <div className="card-grid">
          {allClasses.map((item, index) => (
            <Card
              key={index}
              data={item}
              onRemove={() => removeClass(index, item.source)}
            />
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Upload;
