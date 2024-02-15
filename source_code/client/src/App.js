import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hp from "./Home";
import Pp from "./Myprofile";
import Ap from "./Myadd";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Hp />} />
          <Route path="/MyProfile" element={<Pp />} />
          <Route path="/Myadd" element={<Ap />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;