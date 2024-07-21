package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.entity.Post;
import com.webtttn.exercise03.entity.SlideShow;
import com.webtttn.exercise03.repository.PostRepository;
import com.webtttn.exercise03.service.PostService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository PostRepository;

    @Override
    public Post addPost(Post Post) {
        return PostRepository.save(Post);
    }

    @Override
    public Post getPostById(UUID PostId) {
        Optional<Post> optionalPost = PostRepository.findById(PostId);
        return optionalPost.orElse(null);
    }

    @Override
    public List<Post> getAllPosts() {
        return PostRepository.findAll();
    }
    @Override
    public List<Post> getPostsByTopicId(UUID topicId) {
        return PostRepository.findByTopicId(null);
    }

    @Override   
    public Post updatePost(UUID PostId, Post updatedPost) {
        Post existingPost = PostRepository.findById(PostId).orElse(null);
    
        if (existingPost != null) {
            // Lưu đường dẫn của hình ảnh cũ
            String oldImageUrl = existingPost.getImageUrl();
    
            // Kiểm tra xem có đường dẫn hình ảnh mới được cung cấp hay không
            String updatedImageUrl = updatedPost.getImageUrl();
            if (updatedImageUrl != null) {
                existingPost.setImageUrl(updatedImageUrl); // Cập nhật đường dẫn hình ảnh mới
            }
            existingPost.setName(updatedPost.getName());
            existingPost.setTopic(updatedPost.getTopic());
            existingPost.setDescription(updatedPost.getDescription());    
            existingPost.setImageUrl(updatedPost.getImageUrl());
            // Lưu danh mục đã cập nhật
            Post updatedPostResult = PostRepository.save(existingPost);
    if (updatedImageUrl != null && !updatedImageUrl.equals(oldImageUrl)) {
        deleteImageFile(oldImageUrl);
    }
    
            return updatedPostResult;
        }
    
        return null;
    }
    @Override
    public void deleteImageFile(String imageUrl) {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            Path imageFilePath = Paths.get(UPLOAD_DIR, imageUrl);
            try {
                Files.deleteIfExists(imageFilePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    @Override
    public void deletePost(UUID PostId) {
        PostRepository.deleteById(PostId);
    }


    private final String UPLOAD_DIR = "D:/TTTN/webtttn (1)/webtttn/src/main/resources/static/upload/";

    @Override
    public Post saveImage(UUID postId, MultipartFile file, int i) {
        try {
            // Lấy tên gốc của tệp tin ảnh
            String originalFileName = file.getOriginalFilename();

            // Tạo một UUID để thêm vào tên tệp tin để đảm bảo tính duy nhất
            String uuid = UUID.randomUUID().toString();

            // Lấy phần mở rộng của tên tệp tin (ví dụ: .jpg, .png)
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

            // Tạo tên tệp tin mới bằng cách kết hợp UUID và phần mở rộng của tệp tin gốc
            String newFileName = i + uuid + fileExtension;

            // Tạo đường dẫn tuyệt đối tới thư mục upload
            Path uploadPath = Paths.get(UPLOAD_DIR);

            // Kiểm tra nếu thư mục upload không tồn tại, tạo mới
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Tạo đường dẫn đến tệp tin ảnh
            Path filePath = uploadPath.resolve(newFileName);

            // Ghi dữ liệu từ file được upload vào đường dẫn đã tạo
            Files.write(filePath, file.getBytes());

            // Tìm category dựa trên categoryId
            Post post = PostRepository.findById(postId)
                    .orElseThrow(() -> new RuntimeException("Post not found"));
            // Gán giá trị đường dẫn vào trường image của đối tượng Category
            post.setImageUrl(newFileName);
            // Lưu lại đối tượng Category đã được cập nhật
            PostRepository.save(post);

        } catch (IOException e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage(), e);
        }
        return null;
    }


        @Override
    public List<Post> saveImages(UUID postId, MultipartFile[] files) {
        List<Post> posts = new ArrayList<>();
        int i = 0;
        for (MultipartFile file : files) {
            posts.add(saveImage(postId, file, i));
            i++;
        }
        return posts;
    }

}
