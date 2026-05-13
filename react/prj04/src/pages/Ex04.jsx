import { useState } from "react";

function Ex04() {
  const [in1, setIn1] = useState(0);
  const [in2, setIn2] = useState(0);
  const handleIn1 = (e) => setIn1(e.target.value);
  const handleIn2 = (e) => setIn2(e.target.value);

  return (
    <>
      <div style={{ padding: "20px", border: "1px soild #ccc" }}>
        <h1>4. Input을 이용한 실시간 계산</h1>
        <div>
          <input type="text" onChange={handleIn1} placeholder="0" value={in1} /> +{" "}
          <input type="text" onChange={handleIn2} placeholder="0" value={in2} /> ={" "}
          {in1 * 1 + in2 * 1}
        </div>
        <div>
          <input type="text" onChange={handleIn1} placeholder="0" value={in1} /> -{" "}
          <input type="text" onChange={handleIn2} placeholder="0" value={in2} /> ={" "}
          {in1 * 1 - in2 * 1}
        </div>
        <div>
          <input type="text" onChange={handleIn1} placeholder="0" value={in1} /> x{" "}
          <input type="text" onChange={handleIn2} placeholder="0" value={in2} /> =
          {in1 * 1 * in2 * 1}
        </div>
        <div>
          <input type="text" onChange={handleIn1} placeholder="0" value={in1} /> /{" "}
          <input type="text" onChange={handleIn2} placeholder="0" value={in2} /> =
          {((in1 * 1) / in2) * 1}
        </div>
        <hr />
        {in1} + {in2} = {in1 * 1 + in2 * 1} <br />
        {in1} - {in2} = {in1 * 1 - in2 * 1} <br />
        {in1} x {in2} = {in1 * 1 * in2 * 1} <br />
        {in1} / {in2} = {((in1 * 1) / in2) * 1} <br />
      </div>
    </>
  ); 
}

export default Ex04;

