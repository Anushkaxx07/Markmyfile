import React, { useEffect, useState } from "react";

const Assign = ({ info, className, teacher }) => {
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPast, setIsPast] = useState(false);
  const [remainingTime, setRemainingTime] = useState(Number(info.time));

  // Unique keys per assignment per class
  const storageKey = `submission-${btoa(className + "-" + info.details)}`;

  // Load submission data only (not timer or past status)
  const [submission, setSubmission] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (submission) setIsSubmitted(true);
  }, [submission]);

  // ✅ Timer restarts fresh every reload
  useEffect(() => {
    let timeLeft = Number(info.time);

    const timer = setInterval(() => {
      timeLeft -= 1;
      setRemainingTime(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
        setIsPast(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [info.time]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = () => {
    if (!file) return alert("Upload a file first!");
    if (remainingTime <= 0) return alert("Time over!");

    const newSubmission = {
      fileName: file.name,
      submittedAt: new Date().toLocaleString(),
    };

    setSubmission(newSubmission);
    setIsSubmitted(true);
    localStorage.setItem(storageKey, JSON.stringify(newSubmission));
  };

  return (
    <div
      style={{
        border: "1px solid grey",
        borderRadius: "1rem",
        padding: "1rem",
        margin: "1rem",
        backgroundColor: isPast ? "#e8e8e8" : "#f8f9fa",
      }}
    >
      <h4>{teacher}</h4>
      <h3>{isPast ? "Past Assignment" : "New Assignment"}</h3>
      <p>{info.details}</p>

      <p>
        <strong>Time Remaining:</strong>{" "}
        <span style={{ color: remainingTime <= 0 ? "red" : "green" }}>
          {remainingTime <= 0 ? "Time Over!" : formatTime(remainingTime)}
        </span>
      </p>

      {!isPast && (
        <>
          <input type="file" onChange={handleFileChange} disabled={isSubmitted} />
          <br />
          <button
            onClick={handleSubmit}
            disabled={isSubmitted || remainingTime <= 0}
            style={{
              backgroundColor: isSubmitted ? "green" : "#1481e7ff",
              color: "white",
              border: "none",
              padding: "0.8rem 1.5rem",
              borderRadius: "0.5rem",
              cursor: isSubmitted ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
        </>
      )}

      {submission && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Submission</h4>
          <p>
            {submission.fileName} — <small>{submission.submittedAt}</small>
          </p>
        </div>
      )}
    </div>
  );
};

export default Assign;
