import React, { useState, useRef, useEffect } from "react";

const Cart = ({ data, children, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "relative",
        transition: "transform 0.2s ease",
      }}
    >
      {/* Three dots menu */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
          fontSize: "1.2rem",
          userSelect: "none",
        }}
      >
        ⋮
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: "35px",
            right: "10px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          <button
            onClick={() => {
              onDelete(); // Delete assignment here
              setMenuOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              color: "red",
              padding: "8px 12px",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
            }}
          >
            Delete Assignment
          </button>
        </div>
      )}

      {/* Background image part */}
      <div
        style={{
          backgroundImage: "url('/back.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          padding: "3rem",
          minHeight: "150px",
        }}
      ></div>

      {/* Assignment Title */}
      <h2 style={{ color: "#2563eb", fontSize: "1.5rem" }}>
        {data.className}
      </h2>

      {/* Optional subtitle */}
      {data.teacher && <p style={{ color: "#555" }}>{data.teacher}</p>}

      {/* Slot for description + Assessment button */}
      {children}
    </div>
  );
};

export default Cart;
