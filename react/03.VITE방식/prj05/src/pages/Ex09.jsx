import { useState } from "react";
import passStyle from "./Ex09.module.css";
const students = [
  { id: 1, name: "김한솔", score: 88 },
  { id: 2, name: "이지은", score: 92 },
  { id: 3, name: "박준호", score: 35 },
  { id: 4, name: "최민지", score: 55 },
  { id: 5, name: "정태호", score: 90 },
  { id: 6, name: "윤서희", score: 68 },
  { id: 7, name: "강동욱", score: 58 },
  { id: 8, name: "조은희", score: 95 },
  { id: 9, name: "허준영", score: 52 },
  { id: 10, name: "양현지", score: 91 },
];
const Inp = () => <h2>저는 정보에요!!! 기대해봐요!</h2>;

function Ex09() {
  const [onlyPassed, setOnlyPassed] = useState(false);
  const passStudent = onlyPassed
    ? students.filter((s) => s.score >= 60)
    : students;

  return (
    <>
      <h1>조건부 랜더링과 리스트</h1>
      <input
        type="checkbox"
        checked={onlyPassed}
        onChange={(e) => setOnlyPassed(e.target.checked)}
      />
      <label htmlFor="" className="toggle">
        합격자만 보기
      </label>
      <div>{onlyPassed && <Inp />}</div>
      <ul className="list">
        {passStudent.map((student) => {
          return (
            <li key={student.id}>
              <span>{student.name}</span>{" "}
              <string
                className={
                  student.score >= 60 ? passStyle.pass : passStyle.fail
                }
              >
                {" "}
                {student.score}점{" "}
              </string>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Ex09;
