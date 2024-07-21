package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.webtttn.exercise03.entity.User;

public interface UserService {
    User addUser(User user);

    User getUserById(UUID userId);

    List<User> getAllUsers();

    User updateUser(UUID userId, User updatedUser);

    void deleteUser(UUID userId);

    User getUserByEmail(String email);
}
