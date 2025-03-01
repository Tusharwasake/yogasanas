import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/HomePage";
// import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
