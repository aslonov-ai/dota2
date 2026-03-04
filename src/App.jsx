import Main from "./pages/Main"
import Users from "./pages/Users"
import axios from "axios"



function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={Users}/>
        <Route path='/Main' element={Main}/>
      </Routes>

    </div>
  )
}

export default App
