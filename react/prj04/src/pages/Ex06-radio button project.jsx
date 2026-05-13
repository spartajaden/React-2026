// 응용_모든 값을 false로 초기화한 뒤 클릭한 키만 true로 만드는 객체를 새로 생성하여 상태를 업데이트 할 때(ex. 라디오 버튼)
import { useState } from "react";
import list from "./ex06_sample";

function Ex06() {
  // 1. 초기 객체 생성 (전부 false)
  const initialObj = {};
  list.forEach((v) => (initialObj[v] = false));

  // 2. 객체 자체를 상태(infoObj)로 관리
  const [infoObj, setInfoObj] = useState(initialObj);
  const [selectedText, setSelectedText] = useState("원하는 도구를 고르세요.");

  const handleInfo = (e) => {
    const selectedValue = e.target.value; // 클릭된 값 (예: "HTML")

    // 3. 새로운 객체 생성 (불변성 유지)
    const updatedObj = {};
    list.forEach((v) => {
      // 순회하면서 클릭된 값과 같으면 true, 다르면 false 할당
      updatedObj[v] = v === selectedValue;
    });

    setInfoObj(updatedObj); // 상태 업데이트
    setSelectedText(selectedValue); // 화면에 보여지는 텍스트(제목)를 사용자가 방금 클릭한 값으로 업데이트

    // 콘솔 확인
    console.log(updatedObj);
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h1>6. 라디오 버튼</h1>
      <h2>{selectedText}</h2>

      {list.map((v, i) => (
        <div key={i}>
          <input type="radio" name="one" value={v} onChange={handleInfo} />
          {v}
          <br />
        </div>
      ))}

      <hr />
      {/* 4. 상태 변화를 화면에서 직접 확인 */}
      <h3>결과 데이터:</h3>
      <code>{JSON.stringify(infoObj)}</code>
    </div>
  );
}

export default Ex06;
