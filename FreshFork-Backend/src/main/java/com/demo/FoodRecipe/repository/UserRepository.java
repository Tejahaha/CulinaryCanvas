package com.demo.FoodRecipe.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.FoodRecipe.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT COUNT(U) FROM User U WHERE U.email = :email AND U.password = :password")
    int validateCredentials(@Param("email") String email, @Param("password") String password);

    @Query("SELECT U FROM User U WHERE U.email = :email AND U.password = :password")
    User findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}