import React, { useState } from 'react';
import './Register.css';
import Footer from './Footer';
import Barnav from './Barnav';
import Creg from './Creg';
import Cregt from './Cregt';
import API from "../api/api";

const Registe = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    collegeName: ""
  });

  const [showNext, setShowNext] = useState(false);

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/user/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        collegeName: formData.collegeName,
      });

      console.log("REGISTER SUCCESS:", res.data);
      setShowNext(true);

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  if (showNext) {
    return formData.role === "student"
      ? <Creg formData={formData} />
      : <Cregt formData={formData} />;
  }

  return (
    <div className='main'>
      <Barnav />
      <div className='box'>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input 
            name='name'
            placeholder='Enter your name'
            value={formData.name}
            onChange={handleChange}
            type="text"
            required
          />

          <input
            type="email"
            name='email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name='password'
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select 
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <input
            type="text"
            placeholder='Enter your college name'
            name='collegeName'
            value={formData.collegeName}
            onChange={handleChange}
            required
          />

          <button type='submit'>Register</button>

        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Registe;
