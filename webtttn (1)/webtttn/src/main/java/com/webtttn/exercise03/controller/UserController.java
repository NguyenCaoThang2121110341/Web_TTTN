package com.webtttn.exercise03.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.webtttn.exercise03.entity.User;
import com.webtttn.exercise03.service.UserService;



import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController

@RequestMapping("api/Users")
public class UserController {

    @Autowired
    private UserService UserService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> user = UserService.getAllUsers();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") UUID UserId) {
        User User = UserService.getUserById(UserId);
        if (User != null) {
            return ResponseEntity.ok(User);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User User) {
        User addedUser = UserService.addUser(User);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") UUID UserId,
            @RequestBody User updatedUser) {
        User User = UserService.updateUser(UserId, updatedUser);
        if (User != null) {
            return ResponseEntity.ok(User);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") UUID UserId) {
        UserService.deleteUser(UserId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String passwords = loginRequest.get("passwordHash");

        User user = UserService.getUserByEmail(email);

        if (user != null && user.getPassword().equals(passwords) ) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", user);
            // response.put("token", generateToken(customer));
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

  
}
