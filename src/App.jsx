import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Goal from "./Pages/Goal";
import Meals from "./Pages/Meals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<Goal />} />
        <Route path="/meals" element={<Meals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
