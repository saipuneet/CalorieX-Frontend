import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [mealType, setMealType] = useState("BREAKFAST");
  const [amount, setAmount] = useState(5);
  const [showModal, setShowModal] = useState(false);

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

  async function searchFood(searchText) {
    console.log("Searching:", searchText);

    try {
      if (!searchText.trim()) {
        setFoods([]);
        return;
      }
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const response = await axios.get(
        `http://localhost:8080/api/foods/search?query=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      setFoods(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function saveMeal() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/meals/add-from-food",
        {
          foodId: selectedFood.id,
          amount: amount,
          mealType: mealType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Meal added successfully");
      console.log(response.data);
      setSelectedFood(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add Meal");
    }
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />
      <h2 className="text-center mt-5">Search Food</h2>
      <div className="container mt-5">
        <div className="position-relative mx-auto" style={{ width: "550px" }}>
          <input
            type="text"
            className={`form-control ${
              foods.length > 0 && query.trim() !== ""
                ? "rounded-top"
                : "rounded-pill"
            }`}
            placeholder="Search Food..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              searchFood(e.target.value);
            }}
          />

          {query.trim() !== "" && foods.length > 0 && (
            <div
              className="list-group position-absolute w-100 shadow bg-white"
              style={{
                zIndex: 1000,
                top: "98%",
                left: 0,
                borderTop: "none",
                borderRadius: "0 0 20px 20px",
              }}
            >
              {foods.slice(0, 5).map((food) => (
                <button
                  key={food.id}
                  type="button"
                  className="list-group-item list-group-item-action text-start"
                  onClick={() => {
                    setSelectedFood(food);
                    setQuery("");
                    setFoods([]);
                    setShowModal(true);
                  }}
                >
                  {food.name}
                </button>
              ))}
            </div>
          )}
        </div>
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
      {showModal && selectedFood && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add {selectedFood.name} To Meal</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="card bg-light mb-3">
                  <div className="card-body">
                    <h5>{selectedFood.name}</h5>
                    <p className="mb-1">Calories: {selectedFood.calories}</p>
                    <p className="mb-1">Protein: {selectedFood.protein}g</p>
                    <p className="mb-1">Carbs: {selectedFood.carbs}g</p>
                    <p className="mb-1">Fat: {selectedFood.fat}g</p>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Meal Type:</label>
                  <select
                    className="form-select"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                  >
                    <option value="BREAKFAST">Breakfast</option>
                    <option value="LUNCH">Lunch</option>
                    <option value="DINNER">Dinner</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={saveMeal}>
                  Save Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
