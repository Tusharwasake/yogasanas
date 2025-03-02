import { Routes, Route, Navigate,} from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import Home from "./Pages/Home"; // Add this import
import AsanasLibrary from "./Pages/AsanasLibrary";
import AsanaDetails from "./Pages/AsanaDetails";
import AddAsanaForm from "./Pages/AddAsanaForm";
import EditAsanaForm from "./Pages/EditAsanaForm";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgetPassword/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/home" element={<Home/>}/>
      
      {/* Fix the path name to be consistent - use "asanas" instead of "asana" */}
      <Route path="/asanas" element={<AsanasLibrary/>}/>
      <Route path="/asanas/:asanaId" element={<AsanaDetails />} />
      <Route path="/add-asana" element={<AddAsanaForm />} />
      <Route path="/edit-asana/:asanaId" element={<EditAsanaForm />} />
      
      {/* Root path - decide where you want users to land first */}
      <Route path="/" element={<Navigate to="/home" />} />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default App;