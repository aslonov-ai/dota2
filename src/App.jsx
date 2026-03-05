
import Users from "./pages/Users";
import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";
import Heros from "./pages/Heros"
import UserInfos from "./pages/UserInfos"
// import Users from "./pages/Users"
// import Main from "./pages/Main"
// import Users from "./pages/Users"
import axios from "axios"



function App() {
  return (
    <Routes>

      <Route path="/" element={<Main />} />
      <Route path="/users" element={<Users />} />
      <Route path="/main" element={<Main />} />
      <Route path="/heros" element={<Heros />} />
      <Route path="/userinfos" element={<UserInfos />} />
    </Routes>
  );
      // <Routes>
      //   <Route path='/users' element={<Users/>}/>
      // </Routes>

    // <div>
    //   <Heros />
    //   <Routes>
    //     <Route path='/' element={Users}/>
    //     <Route path='/Main' element={Main}/>
    //   </Routes>

    // </div>
  
}

export default App;
