"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search, SlidersHorizontal } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function SearchRecipesComponent() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryTag, setDietaryTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE}/api/recipes/all`);
        if (Array.isArray(response.data)) {
          setRecipes(response.data);
        } else {
          setError("Unexpected response format from the server.");
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("name", searchTerm);

      const response = await axios.get(
        searchTerm
          ? `${API_BASE}/api/recipes/search/by-name?${params.toString()}`
          : `${API_BASE}/api/recipes/all`
      );
      const data = Array.isArray(response.data) ? response.data : [];

      const filtered = data.filter((recipe) => {
        const byCuisine = cuisine
          ? recipe.cuisine?.toLowerCase().includes(cuisine.toLowerCase())
          : true;
        const byDiet = dietaryTag
          ? recipe.dietaryTag?.toLowerCase().includes(dietaryTag.toLowerCase())
          : true;
        return byCuisine && byDiet;
      });

      setRecipes(filtered);
      if (!filtered.length) {
        setError("No recipes match your search yet. Try adjusting your filters.");
      }
    } catch (err) {
      console.error("Error searching recipes:", err);
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-[var(--text-secondary)]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by recipe name (e.g. carbonara, ramen, curry)"
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] py-3 pl-9 pr-3 text-sm text-[var(--text-main)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--background)] p-3 md:flex-row md:items-center">
          <div className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </div>
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="Cuisine (e.g. Italian, Indian, Japanese)"
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--text-main)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="text"
              value={dietaryTag}
              onChange={(e) => setDietaryTag(e.target.value)}
              placeholder="Dietary tag (Vegan, Gluten-free, etc.)"
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--text-main)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </form>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {isLoading && !recipes.length && (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-gradient-to-br from-[var(--primary-light)]/50 to-[var(--primary)]/30 skeleton"
              />
            ))}
          </>
        )}

        {!isLoading && !recipes.length && !error && (
          <div className="col-span-full rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--background)] px-6 py-10 text-center text-sm text-[var(--text-secondary)]">
            Start by searching for a recipe or exploring all dishes. Your results will appear here.
          </div>
        )}

        {recipes.map((recipe) => (
          <article
            key={recipe.id}
            className="group flex flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <header className="mb-2 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-[var(--text-main)] group-hover:text-emerald-600">
                  {recipe.name}
                </h3>
                <p className="mt-1 text-[0.7rem] uppercase tracking-wide text-[var(--text-secondary)]">
                  {recipe.cuisine || "Any cuisine"} · {recipe.dietaryTag || "No dietary tag"}
                </p>
              </div>
            </header>
            <p className="mb-2 line-clamp-2 text-sm text-[var(--text-secondary)]">
              Ingredients: {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : recipe.ingredients}
            </p>
            <p className="line-clamp-3 text-sm text-[var(--text-secondary)]">
              {recipe.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default SearchRecipesComponent;
