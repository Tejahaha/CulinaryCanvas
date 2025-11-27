import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { ChefHat, ArrowRight } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // kept for compatibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8083/user/signin",
        { email, password }
      );
      localStorage.setItem("token", response.data);
      navigate("/explore");
    } catch (error) {
      setError(error.response?.data || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#faf7f2] text-slate-900">
      {/* Left side – gradient / brand */}
      <div className="hidden w-1/2 md:flex relative items-center justify-center bg-gradient-to-br from-emerald-500 via-emerald-600 to-amber-500 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Kitchen counter with fresh ingredients"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-md space-y-4 px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-50 backdrop-blur">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
            CulinaryCanvas · Community recipes
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Discover, cook, and share recipes that feel like home.
          </h1>
          <p className="text-sm text-emerald-50/90">
            Log in to access your saved dishes, manage your creations, and see
            what the community is cooking tonight.
          </p>
        </div>
      </div>

      {/* Right side – login form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-10 md:px-10">
        <div className="w-full max-w-md">
          {/* Logo / brand row */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 text-white shadow-md">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">
                CulinaryCanvas
              </p>
              <p className="text-xs text-slate-500">
                Community-driven recipe hub
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-amber-100 bg-white/95 p-7 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                Welcome back
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Sign in to continue your culinary journey.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium uppercase tracking-wide text-slate-600"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium uppercase tracking-wide text-slate-600"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? "Signing in…" : "Sign in"}
                {!isLoading && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
              <span>Don&apos;t have an account? </span>
              <Link
                to="/signup"
                className="font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Create one in seconds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;