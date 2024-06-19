import { useState, useRef, useEffect } from "react";
import "./RegisterWorkEx.css";
import axios from "axios";

export default function RegisterWorkEx() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const inputRefs = useRef({});
  const [users, setUsers] = useState([]);
  const [workEx, setWorkEx] = useState(null);

  const inputFields = [
    "소속변동",
    "발령사항",
    "학력",
    "수행업무",
    "평가",
    "근속기간",
    "교육이수",
    "자격증",
    "포상",
    "징계",
    "희망직무",
    "처벌",
  ];

  const fieldMapping = {
    소속변동: "classification",
    발령사항: "appointment",
    학력: "education",
    수행업무: "work",
    평가: "rating",
    근속기간: "seniority",
    교육이수: "positionExperience",
    자격증: "trainingCourses",
    포상: "certificate",
    징계: "prize",
    희망직무: "jobObjective",
    처벌: "punishment",
  };

  useEffect(() => {
    axios.get("http://172.30.104.63:5000/getAllEmployees").then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  const onSelect = (memberNum) => {
    setSelectedNumber(memberNum);
    axios
      .get(`http://172.30.104.63:5000/getWorkExperience/${memberNum}`)
      .then((res) => {
        console.log(res.data);
        setWorkEx(res.data);
        inputFields.forEach((field) => {
          if (inputRefs.current[field]) {
            const mappedField = fieldMapping[field];
            inputRefs.current[field].value = res.data[mappedField] || "";
          }
        });
      })
      .catch((e) => {
        setWorkEx(null);
        inputFields.forEach((field) => {
          if (inputRefs.current[field]) {
            inputRefs.current[field].value = "";
          }
        });
      });
  };

  const onClickRegister = () => {
    const formData = { employeeNumber: selectedNumber };

    inputFields.forEach((field) => {
      if (inputRefs.current[field]) {
        const mappedField = fieldMapping[field];
        formData[mappedField] = inputRefs.current[field].value;
      }
    });

    console.log("Sending data:", formData);

    axios
      .post(
        `http://172.30.104.63:5000/createWorkExperience/${selectedNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const selectedMember = users.find(
    (member) => member.employeeNumber === selectedNumber
  );

  return (
    <div className="RegisterWorkExContainer">
      <div>
        <h1>경력등록</h1>
        <div className="memberList">
          {users.map((member) => (
            <MemberRow
              key={member.employeeNumber}
              member={member}
              selectedNumber={selectedNumber}
              onClick={onSelect}
            />
          ))}
        </div>
        <div className="memberDetail">
          {selectedNumber && (
            <div>
              <div className="MemberInfoRow">
                <div>사원번호: {selectedMember.employeeNumber}</div>
                <div>이름: {selectedMember.name}</div>
                <div>소속 부서: {selectedMember.personnelAppointmentInfo}</div>
              </div>
              {inputFields.map((field, index) => (
                <div key={index}>
                  <label className="inputLabel">
                    {field}
                    <input
                      disabled={true}
                      ref={(el) => (inputRefs.current[field] = el)}
                    />
                  </label>
                  <br />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="btn">
          <button onClick={onClickRegister}>경력 등록</button>
        </div>
      </div>
    </div>
  );
}

const MemberRow = ({ member, selectedNumber, onClick }) => {
  const isSelected = member.employeeNumber === selectedNumber;

  return (
    <div
      className={`MemberRowContainer ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(member.employeeNumber)}
    >
      <div>사원번호: {member.employeeNumber}</div>
      <div>이름: {member.name}</div>
      <div>소속 부서: {member.personnelAppointmentInfo}</div>
    </div>
  );
};
