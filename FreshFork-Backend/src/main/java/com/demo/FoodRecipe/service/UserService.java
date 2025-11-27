package com.demo.FoodRecipe.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.demo.FoodRecipe.model.User;
import com.demo.FoodRecipe.repository.UserRepository;



@Service
public class UserService {
    @Autowired
    UserRepository ur;

    @Autowired
    JWTService jwtService;

    public String addUser(@RequestBody User user) {
        ur.save(user);
        return "User added";
    }

    public String ValidateUser(@RequestParam("email") String email, @RequestParam("password") String password) {
        if (ur.validateCredentials(email, password) > 0) {
            User user = ur.findByEmailAndPassword(email, password);
            if (user != null) {
                return jwtService.generateToken(user); // Generate token for valid user
            }
        }
        return "Invalid Credentials"; // Return error if credentials are invalid
    }

    public User getUserById(int id) {
        return ur.findById(id).orElse(null);
    }
}