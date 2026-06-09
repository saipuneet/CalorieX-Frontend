import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  // useeffect is used when the page loads the useefffect reload immediately.
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8080/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setDashboard(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      }
    }

    fetchDashboard();
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Welcome to CalorieX Dashboard</h1>
      <p>Goal Calories: {dashboard.goalCalories}</p>
      <p>Total Calories: {dashboard.totalCalories}</p>
      <p>Remaining Calories: {dashboard.remainingCalories}</p>
      <p>Current Weight: {dashboard.currentWeight} kg</p>
      <p>Weight Change: {dashboard.weightChange} kg</p>
      <p>Meals Logged Today: {dashboard.mealsLoggedToday}</p>
    </div>
  );
}

export default Dashboard;
