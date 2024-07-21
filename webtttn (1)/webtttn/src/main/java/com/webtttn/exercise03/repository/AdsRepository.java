package com.webtttn.exercise03.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webtttn.exercise03.entity.Ads;

import java.util.UUID;

@Repository
public interface AdsRepository extends JpaRepository<Ads, UUID> {
}
