import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Goal from "./Pages/Goal";

import MealsSearch from "./Pages/MealsSearch";
import Meals from "./Pages/Meals";
import CustomFoods from "./Pages/CustomFoods";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<Goal />} />
        <Route path="/meals/search" element={<MealsSearch />} />
        <Route path="/meals/my-meals" element={<Meals />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/meals/custom-foods" element={<CustomFoods />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
