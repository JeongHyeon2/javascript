import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Login from "./login/Login";
import MyPageOwnerRegister from "./my-page-owner/MyPageOwnerRegister";
import MyPageOwnerCampings from "./my-page-owner/MyPageOwnerCampings";
import MyPageOwnerEdit from "./my-page-owner/MyPageOwnerEdit";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/owner-register" element={<MyPageOwnerRegister />} />
          <Route path="/owner-campings" element={<MyPageOwnerCampings />} />
          <Route path="/owner-edit" element={<MyPageOwnerEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
