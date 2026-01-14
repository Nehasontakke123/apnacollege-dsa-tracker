/**
 * Login Page
 * Authenticates user and stores JWT token
 */

import { useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";   // install: npm i lucide-react

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          ApnaCollege DSA Tracker
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue your DSA journey
        </p>

        <input
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD WITH EYE ICON */}
        <div className="relative mt-4">
          <input
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-5 py-3 rounded-lg font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-3">
          Demo credentials will be shared with the hiring team
        </p>

        <p className="text-xs text-gray-500 text-center mt-3">
          Built for Apna College Assignment
        </p>
      </div>
    </div>
  );
}

