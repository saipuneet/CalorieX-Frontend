import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { FaTrash } from "react-icons/fa";
import MealsNavbar from "../Component/MealsNavbar";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [mealTypeFilter, setMealTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  //fetch the meals from the backend when the component mounts
  const fetchMeals = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/meals/getMeal",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMeals(response.data.meals);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadMeals = async () => {
      await fetchMeals();
    };

    void loadMeals();
  }, []);

  // function to get the badge color based on the meal type
  function getMealBadgeColor(mealType) {
    switch (mealType) {
      case "BREAKFAST":
        return "bg-warning text-dark";
      case "LUNCH":
        return "bg-primary";
      case "DINNER":
        return "bg-dark";

      default:
        return "bg-secondary";
    }
  }

  //function to delete a meal

  async function deleteMeal(mealId) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/meals/${mealId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMeals();
    } catch (error) {
      console.error(error);
    }
  }

  //create filter function according to meal type and date and both

  async function applyFilter() {
    try {
      const token = localStorage.getItem("token");
      let response;

      //Mealtype + Date
      if (mealTypeFilter && dateFilter) {
        response = await axios.get(
          `http://localhost:8080/api/meals/filter/mealtype-date?mealType=${mealTypeFilter}&date=${dateFilter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      //only Meal type
      else if (mealTypeFilter) {
        response = await axios.get(
          `http://localhost:8080/api/meals/filter?mealType=${mealTypeFilter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      //Only date
      else if (dateFilter) {
        response = await axios.get(
          `http://localhost:8080/api/meals/filter/date?date=${dateFilter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      //No filters
      else {
        fetchMeals();
        return;
      }
      setMeals(response.data.meals);
      setMealTypeFilter("");
      setDateFilter("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar />
      <MealsNavbar />

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-end">
            <div className="col-md-4">
              <label className="form-label">Meal Type</label>
              <select
                className="form-select"
                value={mealTypeFilter}
                onChange={(e) => {
                  setMealTypeFilter(e.target.value);
                }}
              >
                <option value="">All Meals</option>
                <option value="BREAKFAST">Breakfast</option>
                <option value="LUNCH">Lunch</option>
                <option value="DINNER">Dinner</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                }}
              />
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary w-100" onClick={applyFilter}>
                ApplyFilter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {meals.map((meal) => (
          <div className="col-md-3 mb-3" key={meal.id}>
            <div
              className="card shadow-sm h-100 border-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="card-title">{meal.mealName}</h6>
                  <FaTrash
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${meal.mealName}?`,
                        )
                      ) {
                        deleteMeal(meal.id);
                      }
                    }}
                  />
                </div>

                <span
                  className={`badge ${getMealBadgeColor(meal.mealType)} mb-2`}
                >
                  {meal.mealType}
                </span>

                <h5 className="text-success fw-bold mb-2">
                  {meal.calories} kcal
                </h5>

                <p className="mb-1">
                  <strong>Protein:</strong> {meal.protein.toFixed(1)} g
                </p>

                <p className="mb-1">
                  <strong>Carbs:</strong> {meal.carbs.toFixed(1)} g
                </p>

                <p className="mb-1">
                  <strong>Fats:</strong> {meal.fats.toFixed(1)} g
                </p>

                <p className="mb-1">
                  <strong>Date:</strong> {meal.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Meals;
