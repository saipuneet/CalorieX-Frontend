import Navbar from "../Component/Navbar";
import MealsNavbar from "../Component/MealsNavbar";

function MealsSearch() {
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
          <div className="card-body p-4">
            <h4 className="fw-bold mb-4 text-center">Search Food</h4>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for food..."
                  />

                  <button className="btn btn-primary">Search</button>
                </div>
                <div className="text-center mt-5">
                  <h5 className="text-muted">Search for a food to begin</h5>
                  <p className="text-muted">
                    Find the Calories and macros for your meals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MealsSearch;
