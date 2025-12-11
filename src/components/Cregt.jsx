import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Creg.css";

const Cregt = ({ formData }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extraData, setExtraData] = useState({
    email: "",
    course: "",
  });

  const navigate = useNavigate();

  // ✅ Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setExtraData({ ...extraData, [e.target.name]: e.target.value });
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/uploadt", {
      state: {
        name: formData.name,
        college: formData.collegename,
        imagePreview: preview,
        email: extraData.email,
        course: extraData.course,
      },
    });
  };

  return (
    <div className="creg-container">
      <div className="box">
        <h2>
          Hello, Prof. <span>{formData.name}</span> from {formData.collegename}
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

          {/* <select name="course" id="course" value={extraData.course} onChange={handleChange}>
            <option value="">Select Subject</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Computer Networks">Computer Networks</option>
            <option value="Discrete Structures">Discrete Structures</option>
            <option value="Object Oriented Programming">Object Oriented Programming</option>
          </select> */}

          <input
            type="number"
            name="number"
            value={extraData.number}
            onChange={handleChange}
            placeholder="Enter your Phone number"
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Cregt;
