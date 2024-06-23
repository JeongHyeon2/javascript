import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApprovalPage.css";
export default function ApprovalPage() {
  const [approvedRequests, setApprovedRequests] = useState([]);

  useEffect(() => {}, []);

  // Use axios to fetch data from the server
  const fetchApprovedRequests = () => {
    axios
      .get("http://172.30.104.63:5000/team/approvedRequests")
      .then((response) => {
        setApprovedRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching approved requests:", error);
      });
  };

  return (
    <div className="ApprovedRequestsContainer">
      <h1>승인된 요청 조회</h1>
      <button type="button" onClick={fetchApprovedRequests}>
        승인조회
      </button>
      <div id="approvedRequestsContainer">
        {approvedRequests.map((request, index) => (
          <div key={index} className="approvedRequestBox">
            <h3>부서팀: {request.departmentId}</h3>
            <p>상태: {request.status}</p>
            <h4>예산정보:</h4>
            <ul>
              {request.budgetItems.map((item, idx) => (
                <li key={idx}>
                  세목: {item.category}, 항목: {item.subcategory}, 예산금액:{" "}
                  {item.allocated_amount}, 집행금액: {item.executed_amount}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
