import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://your-api.com/api/auth/login", { email, password });
      login(response.data.user);
      navigate(getRedirectPath(response.data.user.role));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const getRedirectPath = (role: string) => {
    switch (role) {
      case "VISITOR": return "/visitor";
      case "SECURITY": return "/security";
      case "ADMIN": return "/reception";
      case "EMPLOYEE": return "/employee";
      default: return "/";
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
