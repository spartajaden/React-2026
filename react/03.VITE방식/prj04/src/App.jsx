import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Ex01 from "./pages/Ex01";
import Ex02 from "./pages/Ex02";
import Ex03 from "./pages/Ex03";
import Ex04 from "./pages/Ex04";
import Ex05 from "./pages/Ex05";
import Ex06 from "./pages/Ex06";
import Ex07 from "./pages/Ex07";

function App() {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/ex01">예제1</Link> |{" "}
      <Link to="/ex02">예제2</Link> | <Link to="/ex03">예제3</Link> |{" "}
      <Link to="/ex04">예제4</Link> | <Link to="/ex05">예제5</Link> |{" "}
      <Link to="/ex06">예제6</Link> | <Link to="/ex07">예제7</Link> |{" "}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/ex01" element={<Ex01 />}></Route>
        <Route path="/ex02" element={<Ex02 />}></Route>
        <Route path="/ex03" element={<Ex03 />}></Route>
        <Route path="/ex04" element={<Ex04 />}></Route>
        <Route path="/ex05" element={<Ex05 />}></Route>
        <Route path="/ex06" element={<Ex06 />}></Route>
        <Route path="/ex07" element={<Ex07 />}></Route>
      </Routes>
    </>
  );
}

export default App;
