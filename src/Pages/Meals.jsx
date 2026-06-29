import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import MealsNavbar from "../Component/MealsNavbar";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [mealTypeFilter, setMealTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editQuantity, setEditQuantity] = useState("");

  const [editMealType, setEditMealType] = useState("");

  const [editCalories, setEditCalories] = useState(0);

  const [editProtein, setEditProtein] = useState(0);

  const [editCarbs, setEditCarbs] = useState(0);

  const [editFats, setEditFats] = useState(0);

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

  const handleQuantityChange = async (e) => {
    const value = e.target.value;

    setEditQuantity(value);

    if (value === "") {
      return;
    }

    const quantity = Number(value);

    if (quantity <= 0) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/foods/${selectedMeal.foodId}?amount=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditCalories(response.data.calories);
      setEditProtein(response.data.protein);
      setEditCarbs(response.data.carbs);
      setEditFats(response.data.fat);
    } catch (error) {
      console.error(error);
    }
  };

  const updateMeal = async () => {
    try {
      const token = localStorage.getItem("token");

      const request = {
        quantity: Number(editQuantity),
        mealType: editMealType,
      };

      const response = await axios.put(
        `http://localhost:8080/api/meals/${selectedMeal.id}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data);
      setShowEditModal(false);
      fetchMeals();
    } catch (error) {
      console.error(error);
      alert("Unable to update the meal");
    }
  };

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
      {showEditModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Meal</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Meal Name</label>

                  <input
                    type="text"
                    className="form-control"
                    value={selectedMeal?.mealName || ""}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Quantity (g)</label>

                  <input
                    type="number"
                    className="form-control"
                    value={editQuantity}
                    onChange={handleQuantityChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Meal Type</label>

                  <select
                    className="form-select"
                    value={editMealType}
                    onChange={(e) => setEditMealType(e.target.value)}
                  >
                    <option value="BREAKFAST">Breakfast</option>
                    <option value="LUNCH">Lunch</option>
                    <option value="DINNER">Dinner</option>
                  </select>
                </div>

                <div className="card bg-light">
                  <div className="card-body">
                    <h6>Nutrition</h6>

                    <p>Calories : {editCalories.toFixed(1)}</p>

                    <p>Protein : {editProtein.toFixed(1)} g</p>

                    <p>Carbs : {editCarbs.toFixed(1)} g</p>

                    <p>Fats : {editFats.toFixed(1)} g</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={updateMeal}>
                  Update Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
                  <div className="d-flex gap-3">
                    <FaEdit
                      style={{
                        cursor: "pointer",
                        color: "blue",
                      }}
                      onClick={() => {
                        setSelectedMeal(meal);
                        setEditQuantity(meal.quantity);

                        setEditMealType(meal.mealType);

                        setEditCalories(meal.calories);

                        setEditProtein(meal.protein);

                        setEditCarbs(meal.carbs);

                        setEditFats(meal.fats);
                        setShowEditModal(true);
                      }}
                    />
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
