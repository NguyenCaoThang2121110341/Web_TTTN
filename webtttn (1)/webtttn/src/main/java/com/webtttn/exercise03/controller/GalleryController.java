package com.webtttn.exercise03.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.entity.Gallery;
import com.webtttn.exercise03.service.GalleryService;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin({"http://localhost:3000", "http://localhost:3001"})

@RequestMapping("/api/galleries")
public class GalleryController {
    @Autowired
    private GalleryService galleryService;

    private final String UPLOAD_DIR = "./src/main/resources/static/upload/";
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Gallery>> getImagesByProductId(@PathVariable UUID productId) {
        List<Gallery> galleries = galleryService.getImagesByProductId(productId);
        return ResponseEntity.ok(galleries);
    }

    @GetMapping("/image/{fileName:.+}")
    public ResponseEntity<String> getImageUrl(@PathVariable String fileName) {
        try {
            String imageUrl = "/upload/" + fileName; // Tạo đường dẫn URL của ảnh
            return ResponseEntity.ok().body(imageUrl); // Trả về URL của ảnh
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PostMapping("/uploadImage/{productId}")
    public Gallery uploadImage(@PathVariable UUID productId, @RequestParam("file") MultipartFile file) {
        return galleryService.saveImage(productId, file,0);
    }

    @PostMapping("/uploadImages/{productId}")
    public List<Gallery> uploadImages(@PathVariable UUID productId, @RequestParam("files") MultipartFile[] files) {
        return galleryService.saveImages(productId, files);
    }
    
    @PostMapping("/update/{productId}")
    public ResponseEntity<String> updateGallery(@PathVariable UUID productId, @RequestParam("files") MultipartFile[] newFiles) {
        try {
            // Xóa toàn bộ ảnh cũ của sản phẩm
            galleryService.deleteGalleryByProductId(productId);

            // Lưu ảnh mới
            galleryService.saveImages(productId, newFiles);

            return ResponseEntity.ok("Update gallery successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update gallery");
        }
    }
}