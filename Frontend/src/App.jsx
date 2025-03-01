import { Router, Routes,Route } from "react-router-dom"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import ForgetPassword from "./Pages/ForgetPassword"
import ResetPassword from "./Pages/ResetPassword"


const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgetPassword/>}/>
      <Route  path="/reset-password" element={<ResetPassword/>}/>
    </Routes>
  )
}

export default App