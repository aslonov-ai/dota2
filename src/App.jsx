<<<<<<< HEAD
import Users from "./pages/Users";
import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";
=======
import Heros from "./pages/Heros"
import Users from "./pages/Users"
import Main from "./pages/Main"
import Users from "./pages/Users"
import axios from "axios"


>>>>>>> 75c0438dd8008e71362e021dda6ba8475600dfe0

function App() {
  return (
<<<<<<< HEAD
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/users" element={<Users />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
=======
      <Routes>
        <Route path='/users' element={<Users/>}/>
      </Routes>

    <div>
      <Heros />
      <Routes>
        <Route path='/' element={Users}/>
        <Route path='/Main' element={Main}/>
      </Routes>

    </div>
  )
>>>>>>> 75c0438dd8008e71362e021dda6ba8475600dfe0
}

export default App;
