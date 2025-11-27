package com.demo.FoodRecipe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.FoodRecipe.model.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long>{

    
        // Find recipes where any ingredient matches
        List<Recipe> findByIngredientsIn(List<String> ingredients);
        
        // Find by cuisine
        List<Recipe> findByCuisineIgnoreCase(String cuisine);
    
        // Find by dietary tag
        List<Recipe> findByDietaryTagIgnoreCase(String dietaryTag);

        // Find by name
        List<Recipe> findByNameIgnoreCase(String name);
    
        // Find by creator
        List<Recipe> findByCreatedBy(Long userId);
}