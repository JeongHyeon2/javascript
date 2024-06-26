import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Login from "./login/Login";
import MyPageOwnerRegister from "./my-page-owner/MyPageOwnerRegister";
import MyPageOwnerCampings from "./my-page-owner/MyPageOwnerCampings";
import MyPageOwnerEdit from "./my-page-owner/MyPageOwnerEdit";
import MainPage from "./main-page/MainPage";
import CampingDetail from "./common/CampingDetail";
import SiteDetail from "./common/SiteDetail";
import MyPage from "./my-page-customer/MyPage";
import "./App.css";
import Review from "./common/Review";
import OwnerReservationList from "./my-page-owner/OwnerReservationList";
import Appbar from "./common/Appbar";
function App() {
  return (
    <div className="rootContainer">
      <Router>
        <Appbar></Appbar>
        <div className="rootContent">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/owner-register" element={<MyPageOwnerRegister />} />
            <Route path="/owner-campings" element={<MyPageOwnerCampings />} />
            <Route path="/owner-edit" element={<MyPageOwnerEdit />} />
            <Route path="/main-page" element={<MainPage />} />
            <Route path="/camping-detail" element={<CampingDetail />} />
            <Route path="/site-detail" element={<SiteDetail />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/review" element={<Review />} />
            <Route
              path="/owner-reservations"
              element={<OwnerReservationList />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
