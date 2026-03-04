import Main from "./pages/Main"
import Users from "./pages/Users"
function App() {

  return (
    <div>
      <Main/>
      <Routes>
        <Route path='/' element={Users}/>
      </Routes>
    </div>
  )
}

export default App
