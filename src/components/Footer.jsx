import React from 'react';


const Footer = () => {
  return (
    <div 
    style={
        {
            display:'flex',
            flexDirection:'row',
            position:'fixed',
            gap:'4rem',
            bottom:'0',
            backgroundColor: "#1E3A8A",
            color:'white',
            width:'100vw',
            padding:'1rem',
            fontSize:'1.3rem',
            fontFamily:'cursive'


        }
    }
    className="footer ">
      <p 
      
      >© All Rights Reserved</p>
      <div className="socials"
      style={
        {
            display:'flex',
            gap:'2rem',
            position:'fixed',
            right:'1rem'
            
        }
      }>
        
      <i class="fa-brands fa-facebook"></i> 
    
     
      <i class="fa-brands fa-linkedin"></i> 
    
    
      <i class="fa-brands fa-instagram"></i> 
    
       
       
      </div>
    </div>
  );
};

export default Footer;
