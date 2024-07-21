package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtttn.exercise03.entity.Admin;
import com.webtttn.exercise03.entity.User;
import com.webtttn.exercise03.repository.AdminRepository;
import com.webtttn.exercise03.repository.UserRepository;
import com.webtttn.exercise03.service.AdminService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository AdminRepository;

    @Override
    public Admin addAdmin(Admin Admin) {
        return AdminRepository.save(Admin);
    }

    @Override
    public Admin getAdminById(UUID AdminId) {
        Optional<Admin> optionalAdmin = AdminRepository.findById(AdminId);
        return optionalAdmin.orElse(null);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return AdminRepository.findAll();
    }

    @Override
    public Admin updateAdmin(UUID AdminId, Admin updatedAdmin) {
        Admin existingAdmin = AdminRepository.findById(AdminId).orElse(null);

        if (existingAdmin != null) {
            existingAdmin.setFirstName(updatedAdmin.getFirstName());
            existingAdmin.setLastName(updatedAdmin.getLastName());
            existingAdmin.setPhone(updatedAdmin.getPhone());
            existingAdmin.setEmail(updatedAdmin.getEmail());
            existingAdmin.setPasswordHash(updatedAdmin.getPasswordHash());
            existingAdmin.setActive(updatedAdmin.isActive());
            existingAdmin.setRegisteredAt(updatedAdmin.getRegisteredAt());
            // You may need to handle addresses, carts, and orders here
            return AdminRepository.save(existingAdmin);
        }

        return null;
    }

    @Override
    public void deleteAdmin(UUID AdminId) {
        AdminRepository.deleteById(AdminId);
    }

      @Override
    public Admin getAdminByEmail(String email) {
        return AdminRepository.findByEmail(email);
    }
}
