import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApprovalPage.css";
export default function ApprovalPage() {
  const [approvedRequests, setApprovedRequests] = useState([]);

  // Dummy data for testing
  useEffect(() => {
    const dummyData = [
      {
        departmentId: "001",
        status: "승인 완료",
        budgetItems: [
          {
            category: "운영비",
            subcategory: "사무용품",
            allocated_amount: 500000,
            executed_amount: 300000,
          },
          {
            category: "인건비",
            subcategory: "임원",
            allocated_amount: 1000000,
            executed_amount: 800000,
          },
        ],
      },
      {
        departmentId: "002",
        status: "승인 대기",
        budgetItems: [
          {
            category: "자재비",
            subcategory: "원자재",
            allocated_amount: 800000,
            executed_amount: 600000,
          },
          {
            category: "운반비",
            subcategory: "차량유지",
            allocated_amount: 400000,
            executed_amount: 200000,
          },
        ],
      },
    ];

    setApprovedRequests(dummyData);

    // If fetching from server is needed, use axios.get instead:
    // fetchApprovedRequests();
  }, []);

  // Use axios to fetch data from the server
  const fetchApprovedRequests = () => {
    axios
      .get("http://localhost:8080/team/approvedRequests")
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
