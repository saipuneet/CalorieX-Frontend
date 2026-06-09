import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          CalorieX{" "}
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/goals">
            Goals
          </Link>

          <Link className="nav-link" to="/meals">
            Meals
          </Link>

          <Link className="nav-link" to="/weight">
            WeightLogs
          </Link>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
