import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Barnav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // gives current route (e.g. /login or /register)

  // Decide button behavior based on current route
  const isLoginPage = location.pathname === "/login";

  const handleClick = () => {
    if (isLoginPage) {
      navigate("/"); // if inside Golin (login page), go home
    } else {
      navigate("/login"); // if inside Register, go to login
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1E3A8A",
        position:"fixed",
        top:'0',
        padding: "0.5rem 2rem",
        width: "100vw",
        color: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Left: Logo + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem",marginLeft:'2rem' }}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            height: "4rem",
            width: "4rem",
            objectFit: "fill",
            borderRadius: "2rem",
          }}
        />
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
          }}
        >
          MarkMyFile
        </h1>
      </div>

      {/* Right: Button (dynamic text & link) */}
      <div>
        <button
          onClick={handleClick}
          style={{
            backgroundColor: "#3B82F6",
            color: "white",
            border: "none",
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",
            marginRight:'2rem'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2563EB")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3B82F6")}
        >
          {isLoginPage ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Barnav;
