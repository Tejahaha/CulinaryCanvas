package com.demo.FoodRecipe.controller;

import com.demo.FoodRecipe.model.User;
import com.demo.FoodRecipe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin(origins ="*")
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService us;

    @PostMapping("/signup")
    public String addUser(@RequestBody User user) {
        return us.addUser(user);
    }

    @PostMapping("/signin")
    public String signin(@RequestBody User user) {
        return us.ValidateUser(user.getEmail(), user.getPassword());
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
       return us.getUserById(id); 
    }
    
}