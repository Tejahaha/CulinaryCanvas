package com.demo.FoodRecipe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.FoodRecipe.model.Recipe;
import com.demo.FoodRecipe.service.RecipeService;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    @Autowired
    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping
    public Recipe addRecipe(@RequestBody Recipe recipe, @RequestParam Long userId) {
        return recipeService.addRecipe(recipe, userId); // Pass userId to the service
    }

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }

    @GetMapping("/search/by-name") // Change the endpoint to avoid ambiguity
    public List<Recipe> searchRecipesByName(@RequestParam String name) {
        return recipeService.searchRecipesByName(name);
    }

    @GetMapping("/search")
    public List<Recipe> searchRecipes(
        @RequestParam(required = false) String ingredient,
        @RequestParam(required = false) String cuisine,
        @RequestParam(required = false) String dietaryTag
    ) {
        return recipeService.searchRecipes(ingredient, cuisine, dietaryTag);
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe recipeDetails, @RequestParam Long userId) {
        return recipeService.updateRecipe(id, recipeDetails, userId); // Pass userId to enforce ownership
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id, @RequestParam Long userId) {
        recipeService.deleteRecipe(id, userId); // Pass userId to enforce ownership
    }

    @GetMapping("/my-recipes")
    public List<Recipe> getUserRecipes(@RequestParam Long userId) {
        return recipeService.getRecipesByUserId(userId); // Fetch recipes for the specific user
    }

    @GetMapping("/all") // Public route to fetch all recipes
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }
}