import Navbar from "../Component/Navbar";
import MealsNavbar from "../Component/MealsNavbar";
import { useState } from "react";
import axios from "axios";

function MealsSearch() {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(100);
  const [unit, setUnit] = useState("Gram");
  const [mealType, setMealType] = useState("BREAKFAST");
  const [nutrition, setNutrition] = useState(null);

  const searchFoods = async (searchText) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/foods/search?query=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFoods(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMeal = async () => {
    try {
      const token = localStorage.getItem("token");
      const request = {
        foodId: selectedFood.id,
        amount: Number(quantity),
        mealType: mealType,
      };

      const response = await axios.post(
        "http://localhost:8080/api/meals/add-from-food",
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
      alert("Meal Added successfully");
      setShowModal(false);
      setQuantity(100);
    } catch (error) {
      console.error(error);
      alert("Failed to add meal");
    }
  };

  const fetchFoodDetals = async (foodId, amount) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/foods/${foodId}?amount=${amount}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Nutrition Response:", response.data);
      setNutrition(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Navbar />
      <MealsNavbar />

      <div className="container mt-4">
        <div
          className="card shadow-sm border-0"
          style={{
            borderRadius: "20px",
          }}
        >
          <div
            className="card-body p-2"
            style={{
              minHeight: "400px",
            }}
          >
            <h1
              className="fw-bold text-center mb-5 text-dark"
              style={{
                color: "#1f2937",
                fontSize: "3rem",
              }}
            >
              Search Food
            </h1>

            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="d-flex gap-2">
                  <div className="position-relative flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for food..."
                      value={query}
                      onChange={(e) => {
                        const value = e.target.value;
                        setQuery(value);

                        if (value.length >= 2) {
                          console.log("Searching:", value);
                          searchFoods(value);
                        }
                      }}
                    />

                    {foods.length > 0 && (
                      <div className="search-dropdown">
                        {foods.map((food) => (
                          <div
                            key={food.id}
                            className="search-item"
                            onClick={() => {
                              setSelectedFood(food);
                              setQuantity(100);
                              setShowModal(true);
                              fetchFoodDetals(food.id, 100);
                            }}
                          >
                            {food.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className="btn btn-primary px-4">Search</button>
                </div>
              </div>
            </div>

            {foods.length === 0 && (
              <div className="text-center mt-5">
                <h5 className="text-muted">Search for a food to begin</h5>

                <p className="text-muted">
                  Find calories and macros for your meals
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/*Modal Her */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "20px" }}
        >
          <div
            className="modal-dialog"
            style={{
              maxWidth: "500px",
            }}
          >
            <div
              className="modal-content"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="modal-header position-relative">
                <h5 className="modal-title w-100 text-center fw-bold">
                  Add Food
                </h5>
                <button
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setQuantity(100);
                  }}
                ></button>
              </div>

              <div className="modal-body px-4 py-3">
                <div>
                  <label className="form-label fw-bold">Food</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedFood?.name || ""}
                    disabled
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={quantity}
                      onChange={(e) => {
                        const value = e.target.value;
                        setQuantity(value);
                        if (selectedFood && value > 0) {
                          fetchFoodDetals(selectedFood.id, value);
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Unit</label>
                    <select
                      className="form-select"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    >
                      <option value="GRAM">Gram</option>
                      <option value="ML">ML</option>
                      <option value="SERVING">Serving</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label fw-bold">Meal Type</label>
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
                <hr />

                <h6 className="fw-bold mb-3">Nutrition Information</h6>
                <div className="row">
                  <div className="col-6">
                    <p>
                      <strong>Calories : </strong> {nutrition?.calories}Kcal
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      <strong>Protein:</strong> {nutrition?.protein?.toFixed(1)}{" "}
                      g
                    </p>
                  </div>
                  <div className="col-6 ">
                    <p>
                      <strong>Carbs:</strong> {nutrition?.carbs?.toFixed(1)}g
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      <strong>Fats:</strong> {nutrition?.fat?.toFixed(1)}g
                    </p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn" btn-success onClick={addMeal}>
                  Add Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MealsSearch;
