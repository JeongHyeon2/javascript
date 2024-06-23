import React, { useState } from "react";

const BudgetRequest = () => {
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
    const newBudgetItems = budgetItems.slice();
    newBudgetItems.splice(index, 1);
    setBudgetItems(newBudgetItems);
  };

  const handleBudgetItemChange = (index, field, value) => {
    const newBudgetItems = budgetItems.slice();
    newBudgetItems[index][field] = value;
    setBudgetItems(newBudgetItems);
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("departmentId", departmentId);

    const budgetItemsData = budgetItems.map((item) => ({
      category: item.category,
      subcategory: item.subcategory,
      allocated_amount: parseFloat(item.allocated_amount),
      executed_amount: parseFloat(item.executed_amount),
    }));

    formData.append(
      "budgetRequest",
      new Blob(
        [
          JSON.stringify({
            departmentId,
            budgetItems: budgetItemsData,
          }),
        ],
        { type: "application/json" }
      )
    );
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("documentFile", files[i]);
      }
    } else {
      formData.append(
        "documentFile",
        new Blob([], { type: "application/octet-stream" })
      );
    }

    try {
      const response = await fetch(
        "http://172.30.104.63:5000/user/submitBudgetRequest",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Submit Budget Request</h1>
      <div>
        <label htmlFor="departmentId">부서 ID :</label>
        <input
          type="number"
          id="departmentId"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
        />
      </div>

      <h2>Budget Items</h2>
      <div id="budgetItemsContainer">
        {budgetItems.map((item, index) => (
          <div key={index}>
            <div>
              <label>세목 :</label>
              <input
                type="text"
                value={item.category}
                onChange={(e) =>
                  handleBudgetItemChange(index, "category", e.target.value)
                }
              />
              <label>항목 :</label>
              <input
                type="text"
                value={item.subcategory}
                onChange={(e) =>
                  handleBudgetItemChange(index, "subcategory", e.target.value)
                }
              />
              <label>예산금액 :</label>
              <input
                type="number"
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
          multiple
          onChange={handleFileChange}
        />
      </div>

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default BudgetRequest;
