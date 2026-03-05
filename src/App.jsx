
import Users from "./pages/Users";
import Main from "./pages/Main";
import { Routes, Route, Link } from "react-router-dom";
import Heros from "./pages/Heros"
<<<<<<< Updated upstream
import UserInfos from "./pages/UserInfos"
import Live from "./pages/Live"
// import Users from "./pages/Users"
// import Main from "./pages/Main"
// import Users from "./pages/Users"
import axios from "axios"
=======
>>>>>>> Stashed changes



function App() {
  return (
<<<<<<< Updated upstream
    <Routes>

      <Route path="/" element={<Main />} />
      <Route path="/users" element={<Users />} />
      <Route path="/main" element={<Main />} />
      <Route path="/heros" element={<Heros />} />
      <Route path="/userinfos" element={<UserInfos />} />
      <Route path="/live" element={<Live />} />
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
  
=======
    <div>
      <Heros />
    </div>
  )
>>>>>>> Stashed changes
}

export default App;
