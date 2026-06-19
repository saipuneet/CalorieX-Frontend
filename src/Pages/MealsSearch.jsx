import Navbar from "../Component/Navbar";
import MealsNavbar from "../Component/MealsNavbar";
import { useState } from "react";
import axios from "axios";

function MealsSearch() {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);

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
                          searchFoods(value);
                        } else {
                          setFoods([]);
                        }
                      }}
                    />

                    {foods.length > 0 && (
                      <div className="search-dropdown">
                        {foods.map((food) => (
                          <div key={food.id} className="search-item">
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
    </>
  );
}

export default MealsSearch;
