import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // Using the usesatate for storing the data and updating the data and re-rendering the page
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    //call the api
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        },
      );

      //Storing the token in localstorage
      localStorage.setItem("token", response.data.token);

      //After successful login and token is storage in localstorage we need to naviagate to dashbaord that mean it open the dashboard page
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to connect to server");
      }
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
}
export default Login;
