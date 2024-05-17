import { Fragment, useRef, useState } from "react";
function Search() {
  const [inputs, setInputs] = useState({
    searchTitle: "",
    searchWriter: "",
  });
  const nameInput = useRef([]);

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onClick = (e) => {
    nameInput.current[0].focus();
    nameInput.current[0].value = "";
    nameInput.current[1].value = "";
  };
  return (
    <Fragment>
      <div className="search">
        <div>
          <input
            ref={(el) => (nameInput.current[0] = el)}
            name="searchTitle"
            placeholder="글제목"
            onChange={onChange}
          />
          <input
            name="searchWriter"
            placeholder="글쓴이"
            onChange={onChange}
            ref={(el) => (nameInput.current[1] = el)}
          />
          <button onClick={onClick}>찾기</button>
        </div>
        <p id="search_para">
          검색 문자열: {inputs.searchTitle}+{inputs.searchWriter}
        </p>
      </div>
    </Fragment>
  );
}
export default Search;
