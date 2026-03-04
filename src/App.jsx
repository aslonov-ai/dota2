<<<<<<< HEAD
import Users from "./pages/Users"
=======
import Main from "./pages/Main"
import Users from "./pages/Users"
import axios from "axios"


>>>>>>> 3841a379701c9d20b30beb3f1780e410bdcb2ab7

function App() {

  return (
<<<<<<< HEAD
      <Routes>
        <Route path='/users' element={<Users/>}/>
      </Routes>

=======
    <div>
      <Routes>
        <Route path='/' element={Users}/>
        <Route path='/Main' element={Main}/>
      </Routes>

    </div>
>>>>>>> 3841a379701c9d20b30beb3f1780e410bdcb2ab7
  )
}

export default App
