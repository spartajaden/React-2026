import { useState } from "react";

function Ex01() {
  const data = [
    { id: 1, name: "홍길동", comment: "아버지를 부르지 못하고" },
    { id: 2, name: "임꺽정", comment: "하늘을 향해 웃으며" },
    { id: 3, name: "장길산", comment: "바람처럼 사라져 버리고" },
    { id: 4, name: "김삿갓", comment: "시 한 수 던져두고" },
    { id: 5, name: "전우치", comment: "술잔을 기울이며 떠난다" },
  ];

  const [items, setItems] = useState([]);

  const handleLoad = () => {
    const jdata = JSON.stringify(data);
    localStorage.setItem("test1", jdata);

    const readData = localStorage.getItem("test1");
    const odata = JSON.parse(readData);
    setItems(odata);
  };

  const handleClear = () => {
    localStorage.removeItem("test1");
    setItems([]);
  };

  return (
    <>
      <h1>Ex01. LocalStorage 연습</h1>
      <h2>데이터 쓰고 / 읽어보기</h2>

      <button onClick={handleLoad}>로드</button>
      <button onClick={handleClear}>클리어</button>

      <hr />

      {items.length > 0 && (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>코멘트</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
