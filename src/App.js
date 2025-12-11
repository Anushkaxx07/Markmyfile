import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registe from "./components/Registe";
import Golin from "./components/Golin";
import Upload from "./components/Upload"
import Classgo from "./components/Classgo";
import Settings from "./components/Settings";
import Uploadt from "./components/Uploadt"
import Createlab from "./components/Createlab";
import Updatelab from "./components/Updatelab";
import Lab from "./components/Lab";
import CreateAssignment from "./components/CreateAssignment";
import Assessment from "./components/Assessment";
import Settingst from "./components/Settingst";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registe />} />
        <Route path="/login" element={<Golin />} />
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/uploadt" element={<Uploadt/>}/>
        <Route path="/classgo" element={<Classgo/>}/>
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-lab" element={<Createlab/>}/>
        <Route path="/update-lab" element={<Updatelab/>}/>
        <Route path="/lab" element={<Lab/>}/>
        <Route path="/create-assignment" element={<CreateAssignment/>}/>
        <Route path="/assessment/:assignmentId" element={<Assessment/>}/>
        <Route path="/settingst" element={<Settingst/>}/>


        
      </Routes>
    </Router>
  );
}

export default App;
