package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtttn.exercise03.entity.User;
import com.webtttn.exercise03.repository.UserRepository;
import com.webtttn.exercise03.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository UserRepository;

    @Override
    public User addUser(User User) {
        return UserRepository.save(User);
    }

    @Override
    public User getUserById(UUID UserId) {
        Optional<User> optionalUser = UserRepository.findById(UserId);
        return optionalUser.orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        return UserRepository.findAll();
    }

    @Override
    public User updateUser(UUID UserId, User updatedUser) {
        User existingUser = UserRepository.findById(UserId).orElse(null);

        if (existingUser != null) {
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPasswordHash(updatedUser.getPasswordHash());
            existingUser.setActive(updatedUser.isActive());
            existingUser.setRegisteredAt(updatedUser.getRegisteredAt());
            // You may need to handle addresses, carts, and orders here
            return UserRepository.save(existingUser);
        }

        return null;
    }

    @Override
    public void deleteUser(UUID UserId) {
        UserRepository.deleteById(UserId);
    }

    @Override
    public User getUserByEmail(String email) {
        return UserRepository.findByEmail(email);
    }
}
