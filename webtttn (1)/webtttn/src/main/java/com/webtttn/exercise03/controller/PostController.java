package com.webtttn.exercise03.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.DTOs.PostDTO;
import com.webtttn.exercise03.DTOs.ProductDTO;
import com.webtttn.exercise03.entity.Post;
import com.webtttn.exercise03.entity.Product;
import com.webtttn.exercise03.entity.SlideShow;
import com.webtttn.exercise03.service.PostService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/Posts")
public class PostController {

    @Autowired
    private PostService PostService;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> Posts = PostService.getAllPosts();
        return ResponseEntity.ok(Posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable("id") UUID PostId) {
        Post Post = PostService.getPostById(PostId);
        if (Post != null) {
            return ResponseEntity.ok(Post);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    //
    @GetMapping("/topic/{topicId}")
    public List<Post> getPostsByTopicId(@PathVariable UUID topicId) {
        return PostService.getPostsByTopicId(topicId);
    }

    @PostMapping
    public ResponseEntity<PostDTO> addProduct(@RequestBody PostDTO postDTO) {
        Post post = convertToEntity(postDTO);
        Post addedPost = PostService.addPost(post);
        PostDTO addedPostDTO = convertToDTO(addedPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedPostDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") UUID PostId,
            @RequestBody Post updatedPost) {
        Post Post = PostService.updatePost(PostId, updatedPost);
        if (Post != null) {
            return ResponseEntity.ok(Post);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") UUID PostId) {
        PostService.deletePost(PostId);
        return ResponseEntity.noContent().build();
    }

        @PostMapping("/uploadImages/{PostId}")
    public List<Post> uploadImages(@PathVariable UUID PostId, @RequestParam("files") MultipartFile[] files) {
        return PostService.saveImages(PostId, files);
    }
    // Phương thức chuyển đổi từ Entity sang DTO
    private PostDTO convertToDTO(Post post) {
        PostDTO postDTO = new PostDTO();
        BeanUtils.copyProperties(post, postDTO);
        return postDTO;
    }

    // Phương thức chuyển đổi từ DTO sang Entity
    private Post convertToEntity(PostDTO postDTO) {
        Post post = new Post();
        BeanUtils.copyProperties(postDTO, post);
        return post;
    }

}
