"use client"

import { useState } from "react"
import axios from "axios"
import { Trash2, AlertTriangle, CheckCircle } from "lucide-react"

function DeleteRecipeComponent() {
  const [recipeId, setRecipeId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: null, message: "" })
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [recipe, setRecipe] = useState(null)

  const handleChange = (e) => {
    setRecipeId(e.target.value)
    // Reset confirmation and status when changing ID
    if (confirmDelete) setConfirmDelete(false)
    if (status.type) setStatus({ type: null, message: "" })
    if (recipe) setRecipe(null)
  }

  const fetchRecipe = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: "" })

    try {
      const response = await axios.get(`http://localhost:8083/api/recipes/${recipeId}`)
      setRecipe(response.data)
      setConfirmDelete(true)
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

  const handleDelete = async () => {
    setIsSubmitting(true)
    setStatus({ type: null, message: "" })

    try {
      await axios.delete(`http://localhost:8083/api/recipes/${recipeId}`)
      setStatus({
        type: "success",
        message: "Recipe deleted successfully!",
      })

      // Reset form after success
      setTimeout(() => {
        setRecipeId("")
        setConfirmDelete(false)
        setRecipe(null)
        setStatus({ type: null, message: "" })
      }, 3000)
    } catch (error) {
      console.error("Error deleting recipe:", error)
      setStatus({
        type: "error",
        message: "Failed to delete recipe. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const cancelDelete = () => {
    setConfirmDelete(false)
    setRecipe(null)
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
                <AlertTriangle className="h-5 w-5 text-red-500" />
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

      {!confirmDelete ? (
        <form onSubmit={fetchRecipe} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe ID</label>
            <input
              type="text"
              value={recipeId}
              onChange={handleChange}
              placeholder="Enter the ID of the recipe you want to delete"
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
            {isSubmitting ? "Finding Recipe..." : "Find Recipe"}
          </button>
        </form>
      ) : (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-red-50 border border-red-100 rounded-xl p-5">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-red-700">Confirm Deletion</h3>
            </div>

            <p className="text-red-600 mb-4">
              Are you sure you want to delete this recipe? This action cannot be undone.
            </p>

            {recipe && (
              <div className="bg-white rounded-lg p-4 mb-4 border border-red-100">
                <h4 className="font-medium text-gray-900 mb-2">Recipe Details:</h4>
                <p className="text-gray-700">
                  <span className="font-medium">Content:</span> {recipe.content}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Cuisine:</span> {recipe.cuisine}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Dietary Tag:</span> {recipe.dietaryTag}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={cancelDelete}
                className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className={`flex-1 flex justify-center items-center bg-red-600 text-white font-medium py-3 px-4 rounded-xl hover:bg-red-700 transition-all ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Deleting..."
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Recipe
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteRecipeComponent
