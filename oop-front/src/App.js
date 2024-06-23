import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import "./App.css"; // CSS 파일은 따로 만들어서 스타일링을 해줍니다.
import RegisterWorkEx from "./workEx/RegisterWorkEx";
import GetWorkEx from "./workEx/GetWorkEx";
import RegisterContract from "./contract/RegisterContract";
import Contract from "./contract/Contract";
import RegisterCardUsage from "./cardUsage/RegisterCardUsage";
import CardUsage from "./cardUsage/CardUsage";
import ApprovalPage from "./budget/react/ApprovalPage";
import BudgetRequest from "./budget/react/BudgetRequest";
import Retirement from "./retirement/Retirement";
import GetRetirement from "./retirement/GetRetirement";
import Asset from "./asset/Asset";
import GetAsset from "./asset/GetAsset";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/register-work">경력등록</Link>
            </li>
            <li>
              <Link to="/work">경력 조회</Link>
            </li>
            <li>
              <Link to="/register-contract">계약 등록</Link>
            </li>
            <li>
              <Link to="/contract">계약 조회</Link>
            </li>
            <li>
              <Link to="/register-cardusage">카드 사용 내역 등록</Link>
            </li>
            <li>
              <Link to="/cardusage">카드 사용 내역 조회</Link>
            </li>
            <li>
              <Link to="/approval">예산 승인 내역 조회</Link>
            </li>
            <li>
              <Link to="/budget-request">예산 승인 신청</Link>
            </li>
            <li>
              <Link to="/retirement">퇴직금 계산</Link>
            </li>
            <li>
              <Link to="/get-retirement">퇴직금 조회</Link>
            </li>
            <li>
              <Link to="/asset">자산명세서</Link>
            </li>
            <li>
              <Link to="/get-asset">자산명세서 조회</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/register-work" element={<RegisterWorkEx />}></Route>
          <Route path="/work" element={<GetWorkEx />}></Route>
          <Route
            path="/register-contract"
            element={<RegisterContract />}
          ></Route>
          <Route path="/contract" element={<Contract />}></Route>
          <Route
            path="/register-cardusage"
            element={<RegisterCardUsage />}
          ></Route>

          <Route path="/cardusage" element={<CardUsage />}></Route>
          <Route path="/approval" element={<ApprovalPage />}></Route>
          <Route path="/budget-request" element={<BudgetRequest />}></Route>
          <Route path="/retirement" element={<Retirement />}></Route>
          <Route path="/get-retirement" element={<GetRetirement />}></Route>
          <Route path="/asset" element={<Asset />}></Route>
          <Route path="/get-asset" element={<GetAsset />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
