package com.webtttn.exercise03.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webtttn.exercise03.entity.CartProd;

import java.util.UUID;

@Repository
public interface CartProdRepository extends JpaRepository<CartProd, UUID> {
}
