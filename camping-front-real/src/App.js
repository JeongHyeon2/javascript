import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Login from "./login/Login";
import MyPageOwnerRegister from "./my-page-owner/MyPageOwnerRegister";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/owner-register" element={<MyPageOwnerRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
