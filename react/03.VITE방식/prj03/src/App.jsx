import { useState } from "react";
import "./App.css";

const lessons = [
  { id: 1, title: "Component", desc: "UI를 작은 함수 단위로 나눕니다." },
  { id: 2, title: "Props", desc: "부모가 자식에게 데이터를 전달합니다." },
  { id: 3, title: "Children", desc: "태그 사이의 내용 컴포넌트에 전달합니다." },
  { id: 4, title: "Map함수", desc: "랜더링을 위해 배열을 재구성을 합니다." },
];

const buttons = [
  "웃음버튼",
  "슬픈버튼",
  "재밌는버튼",
  "깜짝버튼",
  "잠오는 버튼",
];

function Card({ title, desc, children }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{desc}</p>
      <small>{children}</small>
    </article>
  );
}

function App() {
  return (
    <main className="page">
      <h1>Map 함수와 key</h1>
      <div className="box">
        {lessons.map((v) => {
          return (
            <Card key={v.id} title={v.title} desc={v.desc}>
              실습{v.id}
            </Card>
          );
        })}
      </div>
      <div>{"버튼은 여기에"}</div>
    </main>
  );
}

export default App;
