import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import "./Upload.css";

const Upload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = (location && location.state) || {};

  // ------------------------------------
  // DEFAULT CLASSES (With Resources)
  // ------------------------------------
  const [info, setInfo] = useState([
    {
      className: "Web Development",
      teacher: "Riya Sharma",
      code: "WD123",
      assignments: [
        {
          id: 1,
          title: "HTML Basics",
          details: "Learn basic HTML tags",
          endTime: "2025-12-11T18:30",
          submitted: false,
          file: null,

          // NEW: Resources
          resources: [
            {
              name: "HTML Notes PDF",
              url: "https://www.w3schools.com/html/html_intro.asp",
            },
            {
              name: "HTML Tutorial Video",
              url: "https://youtu.be/pQN-pnXPaVg",
            },
          ],
        },
        {
          id: 2,
          title: "CSS Styling",
          details: "Styling with CSS",
          endTime: "2025-12-11T20:00",
          submitted: false,
          file: null,

          resources: [
            {
              name: "CSS Cheatsheet",
              url: "https://web.stanford.edu/group/csp/cs21/csscheatsheet.pdf",
            },
            {
              name: "CSS Video Guide",
              url: "https://youtu.be/yfoY53QXEnI",
            },
          ],
        },
      ],
    },

    { className: "DBMS", teacher: "Neha Gupta", code: "DB456", assignments: [] },
    { className: "OS & CN", teacher: "Suman Singh", code: "OS789", assignments: [] },
  ]);

  // ------------------------------------
  // JOINED CLASSES (with field fix)
  // ------------------------------------
  const [joined, setJoined] = useState(() => {
    const raw = localStorage.getItem("joinedClasses");
    const parsed = raw ? JSON.parse(raw) : [];

    return parsed.map((c) => ({
      className: c.className || "New Class",
      teacher: c.teacher || "Unknown Teacher",
      code: c.code || "N/A",
      assignments: Array.isArray(c.assignments) ? c.assignments : [],
    }));
  });

  const [selectedIndex, setSelectedIndex] = useState(-1);

  // ------------------------------------
  // COMBINED LIST
  // ------------------------------------
  const combined = [
    ...info.map((c) => ({
      ...c,
      teacher: c.teacher || "Unknown Teacher",
      code: c.code || "N/A",
      assignments: Array.isArray(c.assignments) ? c.assignments : [],
      source: "default",
    })),

    ...joined.map((c) => ({
      ...c,
      teacher: c.teacher || "Unknown Teacher",
      code: c.code || "N/A",
      assignments: Array.isArray(c.assignments) ? c.assignments : [],
      source: "joined",
    })),
  ];

  const selectedClass = combined[selectedIndex] || null;

  // ------------------------------------
  // SUBMIT ASSIGNMENT
  // ------------------------------------
  const submitAssignment = (assignmentId, fileName) => {
    const updatedClass = { ...combined[selectedIndex] };

    updatedClass.assignments = updatedClass.assignments.map((a) =>
      a.id === assignmentId ? { ...a, submitted: true, file: fileName } : a
    );

    let newCombined = combined.map((c, i) =>
      i === selectedIndex ? updatedClass : c
    );

    const newInfo = newCombined
      .filter((c) => c.source === "default")
      .map(({ source, ...rest }) => rest);

    const newJoined = newCombined
      .filter((c) => c.source === "joined")
      .map(({ source, ...rest }) => rest);

    setInfo(newInfo);
    setJoined(newJoined);
    localStorage.setItem("joinedClasses", JSON.stringify(newJoined));
  };

  const isPastEndTime = (endTime) => new Date() > new Date(endTime);

  // ------------------------------------
  // UI START
  // ------------------------------------
  return (
    <div className="theme-root">
      {/* TOPBAR */}
      <header className="topbar">
        <div className="top-left">
          <div className="brand">
            <img src="/logo.png" alt="logo" className="brand-logo" />
            <div className="brand-text">
              <div className="brand-title">MarkMyFile</div>
            </div>
          </div>
        </div>

        <div className="top-right" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button className="btn ghost" onClick={() => navigate("/settings")}>
            <FiSettings size={20} />
          </button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="slide-sidebar visible">
        <div className="slide-title">Enrolled Classes</div>

        <button
          className={`slide-item ${selectedIndex === -1 ? "active" : ""}`}
          onClick={() => setSelectedIndex(-1)}
        >
          All classes
        </button>

        {combined.map((c, i) => (
          <div key={i} className="side-row">
            <button
              className={`slide-item ${selectedIndex === i ? "active" : ""}`}
              onClick={() => setSelectedIndex(i)}
            >
              {c.className}
            </button>
          </div>
        ))}
      </aside>

      {/* MAIN PANEL */}
      <main className="main-panel">
        <div className="container">
          {selectedClass ? (
            <>
              <h2 className="title blue-heading">{selectedClass.className}</h2>
              <p className="subtitle">
                {selectedClass.teacher} • {selectedClass.code}
              </p>

              <div className="assignments-grid">
                {(!selectedClass.assignments || selectedClass.assignments.length === 0) ? (
                  <p>No assignments yet.</p>
                ) : (
                  selectedClass.assignments.map((a) => {
                    const past = isPastEndTime(a.endTime);
                    return (
                      <div key={a.id} className="assignment-card">
                        <h3>{a.title}</h3>
                        <p>{a.details}</p>

                        <p>
                          <strong>End Time:</strong>{" "}
                          {new Date(a.endTime).toLocaleString()}
                        </p>

                        {/* RESOURCES SECTION */}
                        {a.resources && a.resources.length > 0 && (
                          <div className="resources-box">
                            <strong>Resources:</strong>
                            <ul className="resource-list">
                              {a.resources.map((r, idx) => (
                                <li key={idx}>
                                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                                    {r.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* SUBMISSION LOGIC */}
                        {a.submitted ? (
                          <button className="status-btn submitted" disabled>
                            Submitted
                          </button>
                        ) : past ? (
                          <button className="status-btn missed" disabled>
                            Assignment Missed!
                          </button>
                        ) : (
                          <div className="submit-area">
                            <input
                              type="file"
                              onChange={(e) => {
                                if (e.target.files.length > 0) {
                                  submitAssignment(a.id, e.target.files[0].name);
                                }
                              }}
                            />
                          </div>
                        )}

                        {a.file && <p className="file-name">Uploaded: {a.file}</p>}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className="title blue-heading">All Classes</h2>
              <div className="grid">
                {combined.map((c, i) => (
                  <article className="card" key={i}>
                    <div className="card-img">
                      <img src="/back.jpeg" alt="banner" />
                    </div>
                    <div className="card-body">
                      <div className="card-title">{c.className}</div>
                      <div className="card-mid">{c.teacher}</div>
                      <div className="code">Code: {c.code}</div>

                      <button
                        className="btn primary open-btn"
                        onClick={() => setSelectedIndex(i)}
                      >
                        Open
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Upload;
