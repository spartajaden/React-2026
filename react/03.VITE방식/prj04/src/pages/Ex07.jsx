import { useState } from "react";
import "./Ex07.css";
import list from "./ex06_sample";

function Ex07() {
  // 1. 초기 객체 생성 (전부 false)
  const initialObj = {};
  list.forEach((v) => (initialObj[v] = false));

  // 2. 객체 자체를 상태로 관리
  const [info, setInfo] = useState(initialObj);

  // 3. 체크박스 토글 핸들러
  const handleInfo = (e) => {
    const { value, checked } = e.target;
    setInfo((prev) => ({ ...prev, [value]: checked }));
  };

  // 4. 선택된 항목만 문자열로 표시
  const selectedItems = list.filter((v) => info[v]).join(", ");

  return (
    <div className="ex07-container">
      <h1 className="ex07-title">
        📋 7. 체크박스 (다중 선택)
      </h1>

      <div className="ex07-result">
        <span className="ex07-result-label">선택 결과:</span>
        <span className="ex07-result-value">
          {selectedItems || "선택된 항목이 없습니다."}
        </span>
      </div>

      <div className="ex07-list">
        {list.map((v, i) => (
          <label key={i} className={`ex07-item ${info[v] ? "checked" : ""}`}>
            <input
              type="checkbox"
              className="ex07-checkbox"
              value={v}
              checked={info[v]}
              onChange={handleInfo}
            />
            <span className="ex07-item-text">{v}</span>
            <span className="ex07-checkmark">{info[v] ? "✅" : "⬜"}</span>
          </label>
        ))}
      </div>

      <div className="ex07-json">
        <span className="ex07-json-label">상태 데이터:</span>
        <code>{JSON.stringify(info)}</code>
      </div>
    </div>
  );
}

export default Ex07;