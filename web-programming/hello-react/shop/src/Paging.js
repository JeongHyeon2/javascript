import { useState } from "react";
export default function Paging() {
  let [pageNum, setPageNum] = useState(1);
  return (
    <div>
      <button
        onClick={() => {
          setPageNum((prev) => prev - 1);
          setPageNum((prev) => prev - 1);
          console.log(pageNum);
        }}
      >
        ◀
      </button>
      {pageNum}
      <button
        onClick={() => {
          setPageNum((prev) => prev + 1);
          setPageNum((prev) => prev + 1);

          console.log(pageNum);
        }}
      >
        ▶
      </button>
    </div>
  );
}
