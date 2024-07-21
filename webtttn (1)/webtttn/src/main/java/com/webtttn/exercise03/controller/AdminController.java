package com.webtttn.exercise03.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.webtttn.exercise03.entity.Admin;
import com.webtttn.exercise03.entity.User;
import com.webtttn.exercise03.service.AdminService;
import com.webtttn.exercise03.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("api/Admins")
public class AdminController {

    @Autowired
    private AdminService AdminService;

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> Admin = AdminService.getAllAdmins();
        return ResponseEntity.ok(Admin);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable("id") UUID AdminId) {
        Admin Admin = AdminService.getAdminById(AdminId);
        if (Admin != null) {
            return ResponseEntity.ok(Admin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin Admin) {
        Admin addedAdmin = AdminService.addAdmin(Admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedAdmin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable("id") UUID AdminId,
            @RequestBody Admin updatedAdmin) {
        Admin Admin = AdminService.updateAdmin(AdminId, updatedAdmin);
        if (Admin != null) {
            return ResponseEntity.ok(Admin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable("id") UUID AdminId) {
        AdminService.deleteAdmin(AdminId);
        return ResponseEntity.noContent().build();
    }


      @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String passwords = loginRequest.get("passwordHash");

        Admin admin = AdminService.getAdminByEmail(email);

        if (admin != null && admin.getPassword().equals(passwords) ) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("admin", admin);
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
