import React, { useState } from "react";
import axios from "axios";
import "./BudgetRequest.css";
export default function BudgetRequest() {
  const [departmentId, setDepartmentId] = useState("");
  const [budgetItems, setBudgetItems] = useState([]);
  const [files, setFiles] = useState([]);

  const handleAddBudgetItem = () => {
    setBudgetItems([
      ...budgetItems,
      {
        category: "",
        subcategory: "",
        allocated_amount: "",
        executed_amount: "",
      },
    ]);
  };

  const handleRemoveBudgetItem = (index) => {
    setBudgetItems(budgetItems.filter((_, i) => i !== index));
  };

  const handleBudgetItemChange = (index, field, value) => {
    const newBudgetItems = budgetItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setBudgetItems(newBudgetItems);
  };

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("departmentId", departmentId);

    formData.append(
      "예산",
      new Blob([JSON.stringify({ departmentId, budgetItems })], {
        type: "application/json",
      })
    );

    files.forEach((file, index) => {
      formData.append(`documentFile`, file);
    });

    axios
      .post("http://localhost:8080/user/submitBudgetRequest", formData)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="BudgetRequestContainer">
      <h1>Submit Budget Request</h1>
      <form
        id="budgetForm"
        encType="multipart/form-data"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="departmentId">부서 ID :</label>
          <input
            type="number"
            id="departmentId"
            name="departmentId"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          />
        </div>

        <h2>예산 </h2>
        <div id="budgetItemsContainer">
          {budgetItems.map((item, index) => (
            <div key={index}>
              <label>세목 :</label>
              <input
                type="text"
                className="category"
                value={item.category}
                onChange={(e) =>
                  handleBudgetItemChange(index, "category", e.target.value)
                }
              />
              <label>항목 :</label>
              <input
                type="text"
                className="subcategory"
                value={item.subcategory}
                onChange={(e) =>
                  handleBudgetItemChange(index, "subcategory", e.target.value)
                }
              />
              <label>예산금액 :</label>
              <input
                type="number"
                className="allocated_amount"
                value={item.allocated_amount}
                onChange={(e) =>
                  handleBudgetItemChange(
                    index,
                    "allocated_amount",
                    e.target.value
                  )
                }
              />
              <label>집행내역 :</label>
              <input
                type="number"
                className="executed_amount"
                value={item.executed_amount}
                onChange={(e) =>
                  handleBudgetItemChange(
                    index,
                    "executed_amount",
                    e.target.value
                  )
                }
              />
              <button
                type="button"
                onClick={() => handleRemoveBudgetItem(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddBudgetItem}>
          Add Budget Item
        </button>

        <div>
          <label htmlFor="documentFile">File:</label>
          <input
            type="file"
            id="documentFile"
            name="documentFile"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
