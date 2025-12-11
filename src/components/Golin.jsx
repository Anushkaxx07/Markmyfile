import React, { useState } from 'react';
import './Register.css'; // Reuse same styles
import Barnav from './Barnav';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Golin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate('/upload');

  }
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Later you can send this data to backend for authentication
  };

  return (
    <div className='main'>
      <Barnav />
      <div className='box'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type='submit'
          onClick={handleClick}
          
          >Login</button>
        </form>
      </div>
      <Footer/>

    </div>
  );
};

export default Golin;
