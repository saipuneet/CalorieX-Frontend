import { Link, useLocation } from "react-router-dom";

function MealsNavbar() {
  const location = useLocation();
  return (
    <div className="meals-subnav">
      <div className="container p-2">
        <div className="d-flex gap-5 py-1">
          <Link
            to="/meals/search"
            className={`text-decoration-none ${
              location.pathname === "/meals/search" ? "active-subnav" : ""
            }`}
          >
            Search Food
          </Link>
          <Link
            to="/meals/my-meals"
            className={`text-decoration-none ${
              location.pathname === "/meals/my-meals" ? "active-subnav" : ""
            }`}
          >
            My Meals
          </Link>
          <Link
            to="/meals/custom-foods"
            className={`text-decoration-none ${
              location.pathname === "/meals/custom-foods" ? "active-subnav" : ""
            }`}
          >
            Custom Foods
          </Link>
        </div>
      </div>
    </div>
  );
}
export default MealsNavbar;
