import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePass = (e) => setPassword(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/user/login",
        // "https://reels-rover-server.onrender.com/user/login" , 
        { email, password },
        { withCredentials: true }
      );
      if (response) {
        navigate("/home");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <h3>Email</h3>
      <input type="text" value={email} onChange={handleEmail} />
      <h3>Password</h3>
      <input type="password" value={password} onChange={handlePass} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
