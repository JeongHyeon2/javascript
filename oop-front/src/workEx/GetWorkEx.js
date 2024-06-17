import { useState, useRef, useEffect } from "react";
import "./GetWorkEx.css";

export default function GetWorkEx() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const inputRefs = useRef({});

  const testMembers = [
    {
      employeeNumber: 12345,
      name: "김정현",
      classification: "인사팀",
      workExperience: {
        소속변동: "변동없음",
        발령사항: "없음",
        학력: "대학교 졸업",
        수행업무: "인사 관리",
        평가: "우수",
        근속기간: "5년",
        교육이수: "인사관리 교육",
        자격증: "인사관리사",
        포상: "우수사원",
        징계: "없음",
        희망직무: "인사팀장",
      },
    },
    {
      employeeNumber: 12346,
      name: "김정현",
      classification: "인사팀",
      workExperience: {
        소속변동: "변동없음",
        발령사항: "없음",
        학력: "대학교 졸업",
        수행업무: "인사 관리",
        평가: "우수",
        근속기간: "5년",
        교육이수: "인사관리 교육",
        자격증: "인사관리사",
        포상: "우수사원",
        징계: "없음",
        희망직무: "인사팀장",
      },
    },
  ];

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
  ];

  const onSelect = (memberNum) => {
    setSelectedNumber(memberNum);
  };

  const selectedMember = testMembers.find(
    (member) => member.employeeNumber === selectedNumber
  );

  useEffect(() => {
    if (selectedMember) {
      inputFields.forEach((field) => {
        if (inputRefs.current[field]) {
          inputRefs.current[field].value =
            selectedMember.workExperience[field] || "";
        }
      });
    }
  }, [selectedMember, inputFields]);

  const onClickRegister = () => {
    console.log(selectedNumber);
    inputFields.forEach((field) => {
      console.log(`${field}: ${inputRefs.current[field].value}`);
    });
  };

  return (
    <div className="RegisterWorkExContainer">
      <div>
        <h1>경력조회</h1>
        <div className="memberList">
          {testMembers.map((member) => (
            <MemberRow
              key={member.employeeNumber}
              member={member}
              selectedNumber={selectedNumber}
              onClick={onSelect}
            />
          ))}
        </div>
        <div className="memberDetail">
          {selectedMember && (
            <div>
              <div className="MemberInfoRow">
                <div>사원번호: {selectedMember.employeeNumber}</div>
                <div>이름: {selectedMember.name}</div>
                <div>소속 부서: {selectedMember.classification}</div>
              </div>
              {inputFields.map((field, index) => (
                <div key={index}>
                  <label className="inputLabel">
                    {field}{" "}
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
      <div>소속 부서: {member.classification}</div>
    </div>
  );
};
