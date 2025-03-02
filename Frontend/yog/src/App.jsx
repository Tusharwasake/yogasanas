import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Hero from "./pages/HomePage";
// import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register"
import Login from "./pages/Login"
import ForgetPassword from "./pages/ForgetPassword"
import ResetPassword from "./pages/ResetPassword"
import PrivateRoute from "./components/PrivateRoute";
import Leaderboard from "./pages/Leaderboard";

import Settings from "./pages/Settings";
import AsanasLibrary from "./pages/AsanasLibrary";
import AsanaDetails from "./pages/AsanaDetails";
import AddAsanaForm from "./pages/AddAsanaForm";
import EditAsanaForm from "./pages/EditAsanaForm";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgetPassword/>}/>
      <Route  path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      
        

      <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings/>
            </PrivateRoute>
          }
        />
        <Route path="/asana-library" element={<PrivateRoute><AsanasLibrary/></PrivateRoute>} />
<Route path="/asanas/:asanaId" element={<PrivateRoute><AsanaDetails /></PrivateRoute>} />
<Route path="/add-asana" element={<PrivateRoute><AddAsanaForm /></PrivateRoute>} />
<Route path="/edit-asana/:asanaId" element={<PrivateRoute><EditAsanaForm /></PrivateRoute>} />
<Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </Router>
  );
}

export default App;
