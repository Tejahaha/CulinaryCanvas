"use client";

import { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function GetRecipeComponent() {
  const [recipe, setRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (recipe) setRecipe(null);
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_BASE}/recipes/search/by-name?name=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        setRecipe(data[0]);
      } else {
        setRecipe(null);
        setError("No recipe found with that name yet. Try a different keyword.");
      }
    } catch (err) {
      console.error("Error fetching recipe:", err);
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          Quick lookup
        </p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Find a specific recipe by name. We&apos;ll show you the closest match
          from the community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-[var(--text-secondary)]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Type a recipe name (e.g. Truffle pasta, Ramen bowl)"
            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-main)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Find recipe"}
        </button>
      </form>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {recipe && (
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 text-sm text-[var(--text-secondary)]">
          <h3 className="mb-1 text-base font-semibold text-[var(--text-main)]">
            {recipe.name}
          </h3>
          <p className="mb-1 text-[0.7rem] uppercase tracking-wide text-[var(--text-secondary)]">
            {recipe.cuisine || "Any cuisine"} · {recipe.dietaryTag || "No dietary tag"}
          </p>
          <p className="mb-2">
            <span className="font-semibold text-[var(--text-main)]">Ingredients:</span>{" "}
            {Array.isArray(recipe.ingredients)
              ? recipe.ingredients.join(", ")
              : recipe.ingredients}
          </p>
          <p>
            <span className="font-semibold text-[var(--text-main)]">Instructions:</span>{" "}
            {recipe.content}
          </p>
        </div>
      )}
    </div>
  );
}

export default GetRecipeComponent;
