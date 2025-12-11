import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Settingst = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Destructure data from location.state
  const { name, college, imagePreview } = location.state || {
    name: "Professor",
    college: "Your College",
    imagePreview: null
  };

  // Initialize profile image with priority: imagePreview > localStorage > default
  const [profileImage, setProfileImage] = useState(
    imagePreview || localStorage.getItem("profileImage") || "./teacher.jpg"
  );

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") === "true"
  );

  // Keep localStorage updated if imagePreview changes
  useEffect(() => {
    if (imagePreview) {
      setProfileImage(imagePreview);
      localStorage.setItem("profileImage", imagePreview);
    }
  }, [imagePreview]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setProfileImage(base64Image);
      localStorage.setItem("profileImage", base64Image);
      window.dispatchEvent(new Event("storage"));
    };
    reader.readAsDataURL(file);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.style.backgroundColor =
      newTheme === "dark" ? "#111827" : "white";
    document.body.style.color = newTheme === "dark" ? "white" : "black";
  };

  const toggleNotifications = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem("notifications", newValue);
  };

  return (
    <div>

      {/* Navbar */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#1E3A8A",
        color: "white",
        padding: "1rem",
      }}>
        <img
          src="logo.png"
          alt="Logo"
          style={{ height: "5rem", width: "5rem", borderRadius: "50%", marginRight: "1rem" }}
        />
        <h2>Settings</h2>
      </nav>

      {/* Profile Section */}
      <div style={{
        border: "1px solid grey",
        borderRadius: "1rem",
        padding: "2rem",
        margin: "1rem",
        boxShadow: "10px 10px 5px grey",
      }}>
        <h2>Teacher Profile</h2>
        <br/>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <img
            src={profileImage}
            alt="Profile"
            style={{
              height: "6rem",
              width: "6rem",
              border: "1px solid grey",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div>
            <label htmlFor="upload" style={{ color: "#0971ccff", cursor: "pointer" }}>
              Change Profile Picture
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <br />
        <hr />
        <br />

        {/* Teacher Details */}
        <div style={{ fontSize: "1.1rem", lineHeight: "1.8rem" }}>
          <div><strong>Name:</strong> Prof. {name}</div>
          <div><strong>College:</strong> {college}</div>
        </div>

        <br />
        <hr />
        <br />

        <h3>Change Name</h3>
        <p style={{ color: "gray" }}>Contact admin to change your name.</p>
      </div>

      {/* Preferences */}
      <div style={{
        border: "1px solid grey",
        borderRadius: "1rem",
        padding: "1rem",
        margin: "1rem",
        boxShadow: "10px 10px 5px grey",
      }}>
        <h2>Preferences</h2>
        <br />
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Dark Mode</span>
          <button onClick={toggleTheme} style={buttonStyle(theme === "dark" ? "#0f172a" : "#2563eb")}>
            {theme === "dark" ? "Disable" : "Enable"}
          </button>
        </div>
        
        <br />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Notifications</span>
          <button onClick={toggleNotifications} style={buttonStyle(notifications ? "#16a34a" : "#6b7280")}>
            {notifications ? "On" : "Off"}
          </button>
        </div>
      </div>

      {/* Logout */}
      <div style={{
        border: "1px solid grey",
        borderRadius: "1rem",
        padding: "1rem",
        margin: "1rem",
        boxShadow: "10px 10px 5px grey",
      }}>
        <h2>Logout</h2>
        <p>Click below to sign out.</p>
        <button
          onClick={handleLogout}
          style={{
            padding: "1rem",
            backgroundColor: "#154cb1ff",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const buttonStyle = (bg) => ({
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "0.5rem",
  backgroundColor: bg,
  color: "white",
  cursor: "pointer"
});

export default Settingst;
