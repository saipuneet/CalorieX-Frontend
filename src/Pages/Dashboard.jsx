import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";
import { FaAppleAlt, FaClipboardList, FaFire } from "react-icons/fa";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [recentMeals, setRecentMeals] = useState([]);

  const navigate = useNavigate();
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

        const recentMealsResponse = await axios.get(
          "http://localhost:8080/api/meals/recent",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(recentMealsResponse);
        setRecentMeals(recentMealsResponse.data);
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

  function getBadgeColor(mealType) {
    switch (mealType) {
      case "BREAKFAST":
        return "#0d6efd"; //blue
      case "LUNCH":
        return "#198754"; //green
      case "DINNER":
        return "#ffc107"; //yellow

      default:
        return "#212529";
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div
              className="card shadow-sm dashboard-card"
              style={{
                height: "200px",
                borderRadius: "20px",
                border: "none",
              }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4 d-flex align-items-center">
                  <FaFire className="text-danger me-2" />
                  Today's Calories
                </h5>

                <div className="d-flex justify-content-between">
                  <h3 className="fw-bold text-center mb-2">
                    {dashboard.totalCalories}
                    <span className="text-muted">
                      {" "}
                      / {dashboard.goalCalories} kcal
                    </span>
                  </h3>

                  <p className="mb-0">
                    {dashboard.remainingCalories}
                    <span className="text-muted"> kcal left</span>
                  </p>
                </div>

                <div
                  className="progress mt-4 "
                  style={{
                    height: "12px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{
                      width: `${Math.min(
                        (dashboard.totalCalories / dashboard.goalCalories) *
                          100,
                        100,
                      )}%`,
                    }}
                  ></div>
                </div>

                <small className="text-muted d-block mt-2">
                  {Math.round(
                    (dashboard.totalCalories / dashboard.goalCalories) * 100,
                  )}
                  % completed
                </small>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {/* Macros Summary */}
            <div
              className="card shadow-sm dashboard-card"
              style={{
                height: "270px",
                borderRadius: "20px",
                border: "none",
              }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4 d-flex align-items-center">
                  <FaAppleAlt className="text-success me-2" />
                  Macros Summary
                </h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Protein</span>

                  <span>
                    {dashboard.proteinConsumed.toFixed(1)}g
                    <span className="text-muted">
                      {" "}
                      / {dashboard.proteinGoal.toFixed(0)}g
                    </span>
                  </span>
                </div>
                <div
                  className="progress mt-2 mb-3"
                  style={{
                    height: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="progress-bar bg-success"
                    style={{
                      width: `${Math.min((dashboard.proteinConsumed / dashboard.proteinGoal) * 100, 100)}%`,
                    }}
                  ></div>
                </div>

                {/*Fat */}

                <div className="d-flex justify-content-between mb-2 mt-2">
                  <span>Fats</span>

                  <span>
                    {dashboard.fatsConsumed.toFixed(1)}g
                    <span className="text-muted">
                      {" "}
                      / {dashboard.fatsGoal.toFixed(0)}g
                    </span>
                  </span>
                </div>
                <div
                  className="progress mt-2 mb-3"
                  style={{
                    height: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="progress-bar bg-warning"
                    style={{
                      width: `${Math.min((dashboard.fatsConsumed / dashboard.fatsGoal) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between mt-2 mb-2">
                  <span>Carbs</span>
                  <span>
                    {dashboard.carbsConsumed.toFixed(1)}g{" "}
                    <span className="text-muted">
                      /{dashboard.carbsGoal.toFixed(0)}g
                    </span>
                  </span>
                </div>
                <div
                  className="progress mt-2 mb-3"
                  style={{
                    height: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="progress-bar bg-primary"
                    style={{
                      width: `${Math.min((dashboard.carbsConsumed / dashboard.carbsGoal) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/*Recent Activity */}
          <div className="row mt-2">
            <div className="col-md-5">
              <div className="card shadow mt-4 dashboard-card">
                <div
                  className="card-body"
                  style={{
                    borderRadius: "20px",
                    border: "none",
                  }}
                >
                  <h5 className="fw-bold mb-3 d-flex align-items-center">
                    <FaClipboardList className="text-primary me-2" />
                    Recent Activity
                  </h5>
                  {recentMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className="d-flex justify-content-between align-items-center border-bottom py-2"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: getBadgeColor(meal.mealType),
                            display: "inline-block",
                          }}
                        ></span>
                        <span className="fw-medium">
                          {meal.mealType.charAt(0) +
                            meal.mealType.slice(1).toLowerCase()}
                        </span>
                      </div>
                      <span className="fw-semibold">{meal.mealName}</span>
                    </div>
                  ))}
                </div>
                <div className="text-end mt-3 p-3">
                  <span
                    style={{
                      cursor: "pointer",
                      color: "#0d6efd",
                      fontWeight: "600",
                      borderRadius: "10px",
                    }}
                    onClick={() => navigate("/meals")}
                  >
                    View All Meals{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
