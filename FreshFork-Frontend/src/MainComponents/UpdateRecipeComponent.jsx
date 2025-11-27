"use client"

import { useState } from "react"
import axios from "axios"
import { RefreshCw, AlertCircle, CheckCircle } from "lucide-react"

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function UpdateRecipeComponent() {
  const [recipeId, setRecipeId] = useState("")
  const [recipeDetails, setRecipeDetails] = useState({
    name: "",
    content: "",
    ingredients: "",
    cuisine: "",
    dietaryTag: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: null, message: "" })
  const [step, setStep] = useState(1)

  const handleChange = (e) => {
    const { name, value } = e.target
    setRecipeDetails({ ...recipeDetails, [name]: value })
  }

  const handleIdChange = (e) => {
    setRecipeId(e.target.value)
    // Reset status when changing ID
    if (status.type) setStatus({ type: null, message: "" })
  }

  const fetchRecipe = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: "" })

    try {
      const response = await axios.get(`${API_BASE}/recipes/${recipeId}`);
      const recipe = response.data

      setRecipeDetails({
        name: recipe.name,
        content: recipe.content,
        ingredients: recipe.ingredients.join(", "),
        cuisine: recipe.cuisine,
        dietaryTag: recipe.dietaryTag,
      })

      setStep(2)
    } catch (error) {
      console.error("Error fetching recipe:", error)
      setStatus({
        type: "error",
        message: "Recipe not found. Please check the ID and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: "" })

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication token is missing. Please log in again.")
      }

      const userId = JSON.parse(atob(token.split(".")[1])).id // Decode user ID from token

      // Format ingredients as array before sending
      const formattedRecipe = {
        ...recipeDetails,
        ingredients: recipeDetails.ingredients.split(",").map((item) => item.trim()),
      }

      const response = await axios.put(`${API_BASE}/recipes/${recipeId}?userId=${userId}`, formattedRecipe, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("Recipe updated:", response.data)

      setStatus({
        type: "success",
        message: "Recipe updated successfully!",
      })

      // Reset to step 1 after success
      setTimeout(() => {
        setStep(1)
        setRecipeId("")
        setRecipeDetails({
          name: "",
          content: "",
          ingredients: "",
          cuisine: "",
          dietaryTag: "",
        })
        setStatus({ type: null, message: "" })
      }, 3000)
    } catch (error) {
      console.error("Error updating recipe:", error)
      setStatus({
        type: "error",
        message: "Failed to update recipe. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      {status.type && (
        <div
          className={`${
            status.type === "success" ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
          } border-l-4 p-4 rounded-md animate-fadeIn`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {status.type === "success" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm ${status.type === "success" ? "text-green-700" : "text-red-700"}`}>
                {status.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={fetchRecipe} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe ID</label>
            <input
              type="text"
              value={recipeId}
              onChange={handleIdChange}
              placeholder="Enter the ID of the recipe you want to update"
              className="w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5 hover:shadow-lg ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:from-emerald-600 hover:to-amber-500"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Fetching Recipe..." : "Find Recipe"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-orange-50 p-4 rounded-xl mb-4">
            <p className="text-sm text-orange-800">
              <span className="font-medium">Editing Recipe:</span> {recipeId}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
            <input
              type="text"
              name="name"
              value={recipeDetails.name}
              onChange={handleChange}
              placeholder="Enter the recipe name"
              className="w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Instructions</label>
            <textarea
              name="content"
              value={recipeDetails.content}
              onChange={handleChange}
              className="w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all min-h-[120px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
            <textarea
              name="ingredients"
              value={recipeDetails.ingredients}
              onChange={handleChange}
              placeholder="Separate ingredients with commas"
              className="w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine</label>
              <input
                type="text"
                name="cuisine"
                value={recipeDetails.cuisine}
                onChange={handleChange}
                className="w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Tag</label>
              <input
                type="text"
                name="dietaryTag"
                value={recipeDetails.dietaryTag}
                onChange={handleChange}
                className="w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-200 transition-all"
            >
              Back
            </button>

            <button
              type="submit"
              className={`flex-1 flex justify-center items-center bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5 hover:shadow-lg ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:from-emerald-600 hover:to-amber-500"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                  Updating...
                </>
              ) : (
                "Update Recipe"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default UpdateRecipeComponent
