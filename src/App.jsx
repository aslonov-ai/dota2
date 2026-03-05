import Users from "./pages/Users";
import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/users" element={<Users />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;
