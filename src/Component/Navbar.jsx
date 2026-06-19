import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark "
      style={{
        backgroundColor: "#0d6efd",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold fs-4 d-flex align-items-center"
          to="/dashboard"
        >
          CalorieX{" "}
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link
            className={`nav-link text-white ${
              location.pathname === "/dashboard" ? "fw-bold" : ""
            }`}
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className={`nav-link text-white ${
              location.pathname === "/goals" ? "fw-bold" : ""
            }`}
            to="/goals"
          >
            Goals
          </Link>
          <Link
            className={`nav-link px-4 py-3 ${
              location.pathname.startsWith("/meals") ? "meals-active" : ""
            }`}
            to="/meals/search"
          >
            Meals
          </Link>
          <Link
            className={`nav-link text-white ${
              location.pathname === "/weight" ? "fw-bold" : ""
            }`}
            to="/weight"
          >
            Weight
          </Link>

          <button className="btn btn-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
