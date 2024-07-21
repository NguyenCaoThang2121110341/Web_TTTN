package com.webtttn.exercise03.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webtttn.exercise03.entity.Category;
import com.webtttn.exercise03.entity.Topic;

import java.util.UUID;

@Repository
public interface TopicRepository extends JpaRepository<Topic, UUID> {

}
