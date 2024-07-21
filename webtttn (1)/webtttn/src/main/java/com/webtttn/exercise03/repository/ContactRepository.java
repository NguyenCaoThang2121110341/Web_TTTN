package com.webtttn.exercise03.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webtttn.exercise03.entity.Contact;

import java.util.UUID;

public interface ContactRepository extends JpaRepository<Contact, UUID> {
    // Bạn có thể thêm các phương thức truy vấn tùy chỉnh nếu cần
}
