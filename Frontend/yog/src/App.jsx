import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/HomePage";
// import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyProgress from "./pages/MyProgress";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/progress" element={<MyProgress/>} />
      </Routes>
    </Router>
  );
}

export default App;
