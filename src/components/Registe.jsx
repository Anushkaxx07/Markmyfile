import React,{useState} from 'react';
import './Register.css';
import Footer from './Footer';
import Barnav from './Barnav';
import Creg from './Creg';
import Cregt from './Cregt';
const Registe = () => {
    const [formData,setformData]=useState({
    name:"",
    email:"",
    password:"",
    role:"",
    collegename:""
});
const [showNext, setShowNext] = useState(false);
const handleChange=(e)=>{
    setformData({
        ...formData,
        [e.target.name]:e.target.value,

 } );

};
const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("User Data:", formData);
   setShowNext(true);
};

if(showNext){
  if(formData.role==='student'){
    return <Creg formData={formData}/>

  }
  else{
    return <Cregt formData={formData}/>
  }
}

  return (
    <div className='main'>
      <Barnav/>
    <div className='box'>
      
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input name='name'
             placeholder='Enter your name'
              value={formData.name} 
              onChange={handleChange} 
              type="text" 
              required/>
              <input type="email" 
              name='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
              required/>
              <input type="password" 
              name='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              required
              />
              <select name="role" id="role" value={formData.role} onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="facility">Faculty</option>
              </select>
              <input type="text"
              placeholder='Enter your college name'
               name='collegename' 
               value={formData.collegename}
               onChange={handleChange}
               required />

               <button type='submit'>Register</button>

        </form>
      
    </div>
    <Footer/>
    </div>
  )
}

export default Registe
