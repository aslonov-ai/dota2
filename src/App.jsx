import Heros from "./pages/Heros"
import Users from "./pages/Users"
import Main from "./pages/Main"
import Users from "./pages/Users"
import axios from "axios"



function App() {

  return (
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
}

export default App
