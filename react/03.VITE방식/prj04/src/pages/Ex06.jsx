// 예제
import { useEffect, useState } from "react";
import list from "./ex06_sample";

function Ex06() {
  const [info, setInfo] = useState("내용을 작성하세요");
  useEffect(()=>setInfo(),)

  /* obj false */
  const obj = {};
  list.forEach((v, i) => {
    obj[v] = false;
  });
  // {"HTML":false,"CSS":false,"JAVASCRIPT":false,"JAVA":false,"PYTHON":false}

  /* 방법1. 클릭한 대상 true */
  const handleInfo = (e) => {
    const { value , checked } = e.target;

    /* 방법1-a */
    // const obj = {};
    // list.forEach((v, i) => {
    //    if(v === value) {
    //   obj[v] = true;
    //    } else {
    //   obj[v] = false;
    //    }
    // });

    /* 방법1-b */
    // const obj = list.reduce((a, c)=>{
    //     a[c]= c === value;
    //   return a
    // },{});
    // setInfo(obj);

    /* 방법2-a */
    // obj[value] = checked;
    // setInfo(obj);

    /* 방법2-b */
    setInfo(obj);
    selInfo((data) => ({ ...data, [value]: checked }));
  };

  // {"HTML":false,"CSS":false,"JAVASCRIPT":false,"JAVA":false,"PYTHON":false}

  return (
    <div style={{ padding: "20px", border: "1px soild #ccc" }}>
      <h1>6. 라디오 버튼</h1>
      <h2>{JSON.stringify(info)}</h2>
      {list.map((v, i) => {
        return (
          <div key={i}>
            <input type="radio" name="one" value={v} onChange={handleInfo} />
            {v}
            <br />
          </div>
        );
      })}
      <h3>{JSON.stringify(obj)}</h3>
    </div>
  );
}

export default Ex06;


// // 응용_모든 값을 false로 초기화한 뒤 클릭한 키만 true로 만드는 객체를 새로 생성하여 상태를 업데이트 할 때(ex. 라디오 버튼)
// import { useState } from "react";
// import list from "./ex06_sample";

// function Ex06() {
//   // 1. 초기 객체 생성 (전부 false)
//   const initialObj = {};
//   list.forEach((v) => (initialObj[v] = false));

//   // 2. 객체 자체를 상태(infoObj)로 관리
//   const [infoObj, setInfoObj] = useState(initialObj);
//   const [selectedText, setSelectedText] = useState("원하는 도구를 고르세요.");

//   const handleInfo = (e) => {
//     const selectedValue = e.target.value; // 클릭된 값 (예: "HTML")

//     // 3. 새로운 객체 생성 (불변성 유지)
//     const updatedObj = {};
//     list.forEach((v) => {
//       // 순회하면서 클릭된 값과 같으면 true, 다르면 false 할당
//       updatedObj[v] = v === selectedValue;
//     });

//     setInfoObj(updatedObj); // 상태 업데이트
//     setSelectedText(selectedValue);

//     // 콘솔 확인
//     console.log(updatedObj);
//   };

//   return (
//     <div style={{ padding: "20px", border: "1px solid #ccc" }}>
//       <h1>6. 라디오 버튼</h1>
//       <h2>{selectedText}</h2>

//       {list.map((v, i) => (
//         <div key={i}>
//           <input type="radio" name="one" value={v} onChange={handleInfo} />
//           {v}
//           <br />
//         </div>
//       ))};

//       <hr />
//       {/* 4. 상태 변화를 화면에서 직접 확인 */}
//       <h3>결과 데이터:</h3>
//       <code>{JSON.stringify(infoObj)}</code>
//     </div>
//   );
// }

// export default Ex06;
