import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hp from "./Home";
import Pp from "./Myprofile";
import Ap from "./Myadd";
import Ip from "./MyInventory";
import Apip from "./MyAPI";
import Lp from "./Mylogin";
import Sp from "./Mysignup";
import Dp from "./Mydetails";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Lp />} />
          <Route path="/Mysignup" element={<Sp />} />
          <Route path="/Mydetails" element={<Dp />}/>
          <Route path="/Home" element={<Hp />}/>
          <Route path="/MyProfile" element={<Pp />} />
          <Route path="/Myadd" element={<Ap />} />
          <Route path="/MyInventory" element={<Ip />}/>
          <Route path="/MyAPI" element={<Apip />}/>
        </Routes>
      </Router>
    </div>
  );
};
export default App;