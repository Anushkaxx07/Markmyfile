import React from 'react'
import "./Barnav"
import Barnav from './Barnav'
const Labs = () => {
  return (
    <div>
      const location = useLocation();
      const navigate = useNavigate();
      const formData = location.state || {};
      const [profileImage, setProfileImage] = useState(
          formData.imagePreview || "./teacher.jpg"
        );
      
      
    </div>
  )
}

export default Labs
