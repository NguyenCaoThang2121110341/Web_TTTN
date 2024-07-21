package com.webtttn.exercise03.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.webtttn.exercise03.entity.Category;
import com.webtttn.exercise03.entity.Post;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {

    @Query("SELECT c FROM Post c WHERE c.topic.id = :id")
    List<Post> findByTopicId(@Param("id") UUID id);
}
