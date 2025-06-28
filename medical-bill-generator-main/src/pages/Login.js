import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any autofill or stored session values on mount
    setUsername("");
    setPassword("");
  }, []);

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      sessionStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
