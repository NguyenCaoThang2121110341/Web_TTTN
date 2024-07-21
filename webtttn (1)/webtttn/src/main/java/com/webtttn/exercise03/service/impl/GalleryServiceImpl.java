package com.webtttn.exercise03.service.impl;

import jakarta.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.context.support.ServletContextResource;
import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.entity.Gallery;
import com.webtttn.exercise03.entity.Product;
import com.webtttn.exercise03.repository.GalleryRepository;
import com.webtttn.exercise03.repository.ProductRepository;
import com.webtttn.exercise03.service.GalleryService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class GalleryServiceImpl implements GalleryService {
    @Autowired
    private ServletContext servletContext;
    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private ProductRepository productRepository;

    private final String UPLOAD_DIR = "D:/TTTN/webtttn (1)/webtttn/src/main/resources/static/upload/";

    @Override
    public Gallery saveImage(UUID productId, MultipartFile file, int i) {
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

            // Tìm sản phẩm dựa trên productId
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // Tạo đối tượng Gallery và lưu vào cơ sở dữ liệu
            Gallery gallery = new Gallery();
            gallery.setProduct(product);
            gallery.setImagePath(newFileName); // Sử dụng tên tệp tin mới
            return galleryRepository.save(gallery);
        } catch (IOException e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Gallery> saveImages(UUID productId, MultipartFile[] files) {
        List<Gallery> galleries = new ArrayList<>();
        int i = 0;
        for (MultipartFile file : files) {
            galleries.add(saveImage(productId, file, i));
            i++;
        }
        return galleries;
    }

    @Override
    public List<Gallery> getImagesByProductId(UUID productId) {
        return galleryRepository.findByProductId(productId);
    }

    @Override
    public void deleteGalleryByProductId(UUID productId) {
        List<Gallery> galleries = galleryRepository.findByProductId(productId);
        for (Gallery gallery : galleries) {
            deleteImage(gallery.getImagePath());
            galleryRepository.delete(gallery);
        }
    }

    @Override
    public void update(UUID productId, MultipartFile[] newFiles) {
        // Xóa toàn bộ ảnh cũ của sản phẩm
        deleteGalleryByProductId(productId);

        // Lưu ảnh mới
        saveImages(productId, newFiles);
    }

    private void deleteImage(String imagePath) {
        // Xóa ảnh từ thư mục hoặc lưu trữ ảnh bên ngoài
        Path imagePathToDelete = Paths.get(UPLOAD_DIR).resolve(imagePath);
        try {
            Files.deleteIfExists(imagePathToDelete);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete image: " + imagePath, e);
        }
    }
}
