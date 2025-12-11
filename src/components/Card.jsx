import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data, onRemove }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate=useNavigate();
  
  const classgo=()=>{
    navigate('/classgo',{ state: { className: data.className, teacher: data.teacher } });

  }
  // Close menu if clicked outside
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
      className="card"
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

      {/* Dropdown menu */}
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
              onRemove();
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
            Remove Class
          </button>
        </div>
      )}

      {/* Card content */}
     <div className="card1" style={{
    backgroundImage: "url('/back.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
    padding: "3rem",
    minHeight: "120px",
  }}
>
   </div>
         <h2 style={{ color: "#2563eb", fontSize: "1.5rem", cursor: "pointer" }} onClick={classgo}>
        {data.className}
      </h2>
      <p style={{ color: "#555" }}>Teacher: {data.teacher}</p>

     </div>
      
        
     
     
   
  );
};

export default Card;
