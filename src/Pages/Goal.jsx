import axios from "axios";
import { useEffect, useState } from "react";

function Goal() {
  const [goal, setGoal] = useState({
    targetCalories: "",
    targetProtein: "",
    targetFats: "",
    targetCarbs: "",
  });
  console.log(goal);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGoal() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/goals/getGoal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setGoal(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load Goal page");
      }
    }
    fetchGoal();
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  async function saveGoal() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/goals/setGoal",
        goal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to save goal");
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">CalorieX Goal</h1>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Target Calories</h5>
              <h2>{goal.targetCalories}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Target Protein</h5>
              <h2>{goal.targetProtein} gr</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Target Fats</h5>
              <h2>{goal.targetFats} gr</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Target Carbs</h5>
              <h2>{goal.targetCarbs} gr</h2>
            </div>
          </div>
        </div>

        <div className="card shadow mt-4">
          <div className="card-body">
            <h3 className="text-center mb-4">Update Goal</h3>

            {/* Target Calories */}
            <div className="row justify-content-center mb-3">
              <div className="col-md-2 text-end">
                <label className="form-label">Target Calories :</label>
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={goal.targetCalories}
                  onChange={(e) =>
                    setGoal({
                      ...goal,
                      targetCalories: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Target Protein */}
            <div className="row justify-content-center mb-3">
              <div className="col-md-2 text-end">
                <label className="form-label">Target Protein :</label>
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={goal.targetProtein}
                  onChange={(e) =>
                    setGoal({
                      ...goal,
                      targetProtein: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Target Fats */}
            <div className="row justify-content-center mb-3">
              <div className="col-md-2 text-end">
                <label className="form-label">Target Fats :</label>
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={goal.targetFats}
                  onChange={(e) =>
                    setGoal({
                      ...goal,
                      targetFats: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Target Carbs */}
            <div className="row justify-content-center mb-4">
              <div className="col-md-2 text-end">
                <label className="form-label">Target Carbs :</label>
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={goal.targetCarbs}
                  onChange={(e) =>
                    setGoal({
                      ...goal,
                      targetCarbs: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="text-center">
              <button className="btn btn-primary px-4" onClick={saveGoal}>
                Save Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Goal;
