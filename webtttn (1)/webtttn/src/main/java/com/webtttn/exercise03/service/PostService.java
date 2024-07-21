package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.entity.Post;
import com.webtttn.exercise03.entity.SlideShow;

public interface PostService {
    Post addPost(Post Post);

    Post getPostById(UUID PostId);

    List<Post> getAllPosts();

    Post updatePost(UUID PostId, Post updatedPost);

    void deletePost(UUID PostId);

    List<Post> saveImages(UUID postId, MultipartFile[] files);

    Post saveImage(UUID postId, MultipartFile file, int i);

    void deleteImageFile(String imageUrl);

    List<Post> getPostsByTopicId(UUID topicId);
}
