import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";

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
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">CalorieX Dashboard</h1>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5 className="card-title">Goal Calories</h5>
                <h2>{dashboard.goalCalories}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5 className="card-title">Total Calories</h5>
                <h2>{dashboard.totalCalories}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5 className="card-title">Remaining Calories</h5>
                <h2>{dashboard.remainingCalories}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5 className="card-title">Current Weight</h5>
                <h2>{dashboard.currentWeight} kg</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5 className="card-title">Weight Change</h5>
                <h2>{dashboard.weightChange} kg</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5 className="card-title">Meals Logged Today</h5>
                <h2>{dashboard.mealsLoggedToday}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
