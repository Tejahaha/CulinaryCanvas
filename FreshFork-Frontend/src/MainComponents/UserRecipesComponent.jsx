"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Pencil, Trash2 } from "lucide-react";

function UserRecipesComponent() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const fetchUserRecipes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing. Please log in again.");
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.get(
        `http://localhost:8083/api/recipes/my-recipes?userId=${userId}`
      );
      setRecipes(response.data || []);
    } catch (err) {
      console.error("Error fetching user recipes:", err);
      setError("Failed to fetch your recipes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      await axios.delete(
        `http://localhost:8083/api/recipes/${recipeId}?userId=${userId}`
      );
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert("Failed to delete the recipe. Please try again.");
    }
  };

  const handleUpdate = (recipe) => {
    setEditingRecipe(recipe);
  };

  const handleUpdateSubmit = async (updatedRecipe) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const formattedRecipe = {
        ...updatedRecipe,
        ingredients: updatedRecipe.ingredients
          .split(",")
          .map((item) => item.trim()),
      };

      await axios.put(
        `http://localhost:8083/api/recipes/${updatedRecipe.id}?userId=${userId}`,
        formattedRecipe
      );
      setEditingRecipe(null);
      fetchUserRecipes();
    } catch (err) {
      console.error("Error updating recipe:", err);
      alert("Failed to update the recipe. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-main)]">
            Your saved recipes
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Edit or remove dishes you&apos;ve shared with the community.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchUserRecipes}
          className="btn btn-ghost text-[0.7rem] px-3 py-1.5"
        >
          Refresh list
        </button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 w-full rounded-2xl skeleton" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && !recipes.length && (
        <div className="rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--background)] px-6 py-10 text-center text-sm text-[var(--text-secondary)]">
          You haven&apos;t added any recipes yet. Head over to the <span className="font-semibold">Add</span> page to share your first creation.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {recipes.map((recipe) => (
          <article
            key={recipe.id}
            className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div>
              <h4 className="mb-1 text-sm font-semibold text-[var(--text-main)] group-hover:text-emerald-600">
                {recipe.name}
              </h4>
              <p className="mb-1 text-[0.7rem] uppercase tracking-wide text-[var(--text-secondary)]">
                {recipe.cuisine || "Any cuisine"} · {recipe.dietaryTag || "No dietary tag"}
              </p>
              <p className="mb-1 line-clamp-2 text-xs text-[var(--text-secondary)]">
                Ingredients: {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : recipe.ingredients}
              </p>
              <p className="line-clamp-3 text-xs text-[var(--text-secondary)]">
                {recipe.content}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[0.65rem] text-[var(--text-secondary)]">ID: {recipe.id}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(recipe)}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-[0.7rem] font-medium text-blue-600 hover:bg-blue-500/20"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-[0.7rem] font-medium text-red-600 hover:bg-red-500/20"
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {editingRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 shadow-2xl">
            <h3 className="mb-4 text-base font-semibold text-[var(--text-main)]">
              Edit recipe
            </h3>
            <RecipeForm
              initialRecipe={editingRecipe}
              onSubmit={handleUpdateSubmit}
              onCancel={() => setEditingRecipe(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function RecipeForm({ initialRecipe, onSubmit, onCancel }) {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    content: "",
  });

  useEffect(() => {
    if (initialRecipe) {
      setRecipe({
        ...initialRecipe,
        ingredients: Array.isArray(initialRecipe.ingredients)
          ? initialRecipe.ingredients.join(", ")
          : initialRecipe.ingredients || "",
      });
    }
  }, [initialRecipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(recipe);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <div>
        <label className="block text-[0.7rem] font-medium uppercase tracking-wide text-[var(--text-secondary)]">
          Recipe name
        </label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--text-main)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-[0.7rem] font-medium uppercase tracking-wide text-[var(--text-secondary)]">
          Ingredients
        </label>
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--text-main)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-[0.7rem] font-medium uppercase tracking-wide text-[var(--text-secondary)]">
          Instructions
        </label>
        <textarea
          name="content"
          value={recipe.content}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--text-main)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost text-[0.7rem] px-3 py-1.5"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary text-[0.7rem] px-4 py-1.5"
        >
          Save changes
        </button>
      </div>
    </form>
  );
}

export default UserRecipesComponent;
