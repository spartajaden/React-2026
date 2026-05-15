import { useState, useEffect } from "react";
import "./Ex10.css";

function Ex10() {
  const [inData, setIndata] = useState("");
  const [arr, setArr] = useState([]);
  const handleInput = (e) => setIndata(e.target.value);
  const handleAdd = () => {
    setArr([...arr, { text: inData, checked: false }]);
    setIndata("");
  };
  const handleDel = () => {
    setArr([]);
  };

  // 🎯 도전 1: 엔터로 입력
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  // 🎯 도전 3: 체크박스 토글
  const handleCheck = (idx) => {
    setArr(
      arr.map((v, i) => (i === idx ? { ...v, checked: !v.checked } : v))
    );
  };

  // 🎯 도전 4: LocalStorage 저장/읽기
  useEffect(() => {
    const saved = localStorage.getItem("todo-list");
    if (saved) setArr(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(arr));
  }, [arr]);

  return (
    <>
      <h1>10. ToDolist 만들기</h1>
      <label htmlFor="inin">배열요소입력</label>
      <input
        type="text"
        id="inin"
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        value={inData}
      />
      <br />
      <button onClick={handleAdd}>추가</button>
      <button onClick={handleDel} disabled={arr.length <= 0}>
        모두삭제
      </button>
      <hr />
      <div>{inData}</div>
      <hr />
      {/* <div>{arr}</div> */}
      {arr.map((v, i) => {
        return (
          <div key={i} className={v.checked ? "done" : ""}>
            <input
              type="checkbox"
              checked={v.checked}
              onChange={() => handleCheck(i)}
            />
            {`${i + 1}번째 / ${v.text}`}
          </div>
        );
      })}
    </>
  );
}

export default Ex10;