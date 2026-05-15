import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Ex08 from "./pages/Ex08";
import Ex09 from "./pages/Ex09";
import Ex10 from "./pages/Ex10";
import Ex11 from "./pages/Ex11";

function App() {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/ex08">예제8</Link> |{" "}
      <Link to="/ex09">예제9</Link> | <Link to="/ex10">예제10</Link> |{" "}
      <Link to="/ex11">예제11</Link> |
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/ex08" element={<Ex08 />}></Route>
        <Route path="/ex09" element={<Ex09 />}></Route>
        <Route path="/ex10" element={<Ex10 />}></Route>
        <Route path="/ex11" element={<Ex11 />}></Route>
      </Routes>
    </>
  );
}

export default App;
