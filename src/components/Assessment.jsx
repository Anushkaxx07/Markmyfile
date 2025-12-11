import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Assessment = () => {
  const { assignmentId } = useParams(); // Getting id from URL
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    // Dummy data temporarily (replace with backend later)
    const dummyAssignments = [
      {
        id: "1",
        title: "Assignment 1",
        submissions: [
          { id: 1, name: "Anushka Upadhyay", file: "assignment1.pdf", submitted: true, marks: "" },
          { id: 2, name: "Akshat Varshney", file: null, submitted: false, marks: "0" },
          { id: 3, name: "Sneha Kumari", file: "assignment2.docx", submitted: true, marks: "" },
        ],
      },
      {
        id: "2",
        title: "Assignment 2",
        submissions: [
          { id: 4, name: "Anushka Upadhyay", file: "assignment2.pdf", submitted: true, marks: "" },
          { id: 5, name: "Akshat Varshney", file: null, submitted: false, marks: "0" },
        ],
      },
    ];

    const selected = dummyAssignments.find(a => a.id === assignmentId);
    setAssignment(selected);
  }, [assignmentId]);

  const updateMarks = (studentId, newMarks) => {
    setAssignment(prev => ({
      ...prev,
      submissions: prev.submissions.map(s =>
        s.id === studentId ? { ...s, marks: newMarks } : s
      )
    }));
  };

  if (!assignment) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "#1e3a8a", marginBottom: "10px" }}>
        {assignment.title} - Assessment
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "white" }}>
            <th style={{ padding: "12px" }}>Student</th>
            <th style={{ padding: "12px" }}>File</th>
            <th style={{ padding: "12px" }}>Marks</th>
          </tr>
        </thead>

        <tbody>
          {assignment.submissions.map((s) => (
            <tr key={s.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "12px" }}>{s.name}</td>

              <td style={{ padding: "12px" }}>
                {s.submitted ? (
                  <a href="#" style={{ color: "#2563eb" }}>
                    {s.file}
                  </a>
                ) : (
                  <span style={{ color: "red" }}>Not Submitted</span>
                )}
              </td>

              <td style={{ padding: "12px" }}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={s.marks}
                  disabled={!s.submitted}
                  onChange={(e) => updateMarks(s.id, e.target.value)}
                  style={{
                    padding: "6px",
                    width: "70px",
                    borderRadius: "6px",
                    border: "1px solid #aaa",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assessment;
