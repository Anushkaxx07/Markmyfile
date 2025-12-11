import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Creg.css";

const Creg = ({ formData }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extraData, setExtraData] = useState({
    rollno: "",
    batch: "",
    branch: "",
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setExtraData({ ...extraData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/upload", {
      state: {
        name: formData.name,
        college: formData.collegename,
        imagePreview: preview,
        rollno: extraData.rollno,
        batch: extraData.batch,
        branch: extraData.branch,
      },
    });
  };

  return (
    <div className="creg-container">
      <div className="box">
        <h2>
          Hello, <span>{formData.name}</span> from {formData.collegename}
        </h2>
        <h3>Complete Your Registration!</h3>

        <form onSubmit={handleSubmit}>
          <h4>Upload Your Image</h4>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-img" />
            </div>
          )}

          <input
            placeholder="Enter your Roll No."
            type="text"
            name="rollno"
            value={extraData.rollno}
            onChange={handleChange}
          />

          <select name="batch" id="batch" onChange={handleChange}>
            <option value="">Select Batch</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>

          <select name="branch" id="branch" onChange={handleChange}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Creg;
