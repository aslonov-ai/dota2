import Users from "./pages/Users"

function App() {

  return (
      <Routes>
        <Route path='/users' element={<Users/>}/>
      </Routes>

  )
}

export default App
