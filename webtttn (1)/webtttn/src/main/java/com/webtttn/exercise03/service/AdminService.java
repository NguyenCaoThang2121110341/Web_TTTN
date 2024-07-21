package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.webtttn.exercise03.entity.Admin;
import com.webtttn.exercise03.entity.User;

public interface AdminService {
    Admin addAdmin(Admin Admin);

    Admin getAdminById(UUID AdminId);

    List<Admin> getAllAdmins();

    Admin updateAdmin(UUID AdminId, Admin updatedAdmin);

    void deleteAdmin(UUID AdminId);

    Admin getAdminByEmail(String email);
}
