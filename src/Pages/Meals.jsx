import axios from "axios";
import { useState } from "react";
import Navbar from "../Component/Navbar";

function Meals() {
  const [query, setQuery] = useState("");
  const [foods, SetFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [mealType, setMealType] = useState("BREAKFAST");
  const [amount, setAmount] = useState(20);

  async function searchFood() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/foods/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
      SetFoods(response.data);
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

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Search Food</h1>

        <div className="row justify-content-center mb-4">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search Food..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={searchFood}>
              Search
            </button>
          </div>
        </div>
        <div className="row">
          {foods.map((food) => (
            <div className="col-md-3 mb-3" key={food.id}>
              <div className="card shadow h-100">
                <img
                  src={`https://img.spoonacular.com/ingredients_100x100/${food.image}`}
                  className="card-img-top"
                  alt={food.name}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{food.name}</h5>
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => setSelectedFood(food)}
                >
                  Add To Meal
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedFood && (
          <div className="card shadow mt-4">
            <div className="card-body">
              <h3 className="text-center mb-4">
                Add {selectedFood.name} To Meal
              </h3>

              <div className="row justify-content-center mb-3">
                <div className="col-md-2 text-end">
                  <label className="form-label">Meal Type :</label>
                </div>

                <div className="col-md-3">
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
              </div>

              <div className="row justify-content-center mb-4">
                <div className="col-md-2 text-end">
                  <label className="form-label">Amount :</label>
                </div>

                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-center">
                <button className="btn btn-primary" onClick={saveMeal}>
                  Save Meal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Meals;
