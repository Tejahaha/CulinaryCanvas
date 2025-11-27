"use client"

import { useState } from "react"
import axios from "axios"
import { PlusCircle, ChevronDown, ChevronUp } from "lucide-react"

function AddRecipeComponent() {
  const [recipe, setRecipe] = useState({
    name: "", // Add name field
    content: "",
    ingredients: "",
    cuisine: "",
    dietaryTag: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showTips, setShowTips] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setRecipe({ ...recipe, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication token is missing. Please log in again.")
      }

      let userId
      try {
        const payload = token.split(".")[1]
        userId = JSON.parse(atob(payload)).id // Decode the user ID from the token
      } catch (decodeError) {
        throw new Error("Failed to decode authentication token. Please log in again.")
      }

      const formattedRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
      }

      const response = await axios.post(
        `http://localhost:8083/api/recipes?userId=${userId}`, // Pass userId as a query parameter
        formattedRecipe,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      console.log("Recipe added:", response.data)
      setIsSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setRecipe({
          name: "", // Reset name field
          content: "",
          ingredients: "",
          cuisine: "",
          dietaryTag: "",
        })
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error adding recipe:", error)
      alert(error.message) // Display error message to the user
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleTips = () => {
    setShowTips(!showTips)
  }

  return (
    <div className="w-full space-y-6">
      {isSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md animate-fadeIn">
          <div className="flex">
            <div className="flex-shrink-0">
              <PlusCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Recipe added successfully! Your culinary creation is now part of our collection.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-orange-50 rounded-xl p-4">
        <button type="button" onClick={toggleTips} className="flex justify-between items-center w-full text-left">
          <span className="font-medium text-orange-800">Recipe Writing Tips</span>
          {showTips ? (
            <ChevronUp className="h-5 w-5 text-orange-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-orange-500" />
          )}
        </button>

        {showTips && (
          <div className="mt-2 text-sm text-orange-700 space-y-1 animate-fadeIn">
            <p>• Be clear and specific with your instructions</p>
            <p>• List ingredients in order of use</p>
            <p>• Include cooking times and temperatures</p>
            <p>• Separate ingredients with commas</p>
            <p>• Add helpful tips for preparation</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
          <input
            type="text"
            name="name"
            value={recipe.name}
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
            value={recipe.content}
            onChange={handleChange}
            placeholder="Write detailed cooking instructions..."
            className="w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all min-h-[120px]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            placeholder="List ingredients separated by commas (e.g., 2 cups flour, 1 tsp salt, 3 eggs)"
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
              value={recipe.cuisine}
              onChange={handleChange}
              placeholder="Italian, Mexican, Thai..."
              className="w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Tag</label>
            <input
              type="text"
              name="dietaryTag"
              value={recipe.dietaryTag}
              onChange={handleChange}
              placeholder="Vegetarian, Vegan, Gluten-free..."
              className="w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full flex justify-center items-center bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5 hover:shadow-lg ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:from-emerald-600 hover:to-amber-500"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Recipe..." : "Add Recipe"}
        </button>
      </form>
    </div>
  )
}

export default AddRecipeComponent
