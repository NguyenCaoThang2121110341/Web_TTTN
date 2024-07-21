package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.entity.SlideShow;
import com.webtttn.exercise03.repository.SlideShowRepository;
import com.webtttn.exercise03.service.SlideShowService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SlideShowServiceImpl implements SlideShowService {

    @Autowired
    private SlideShowRepository slideShowRepository;

    @Override
    public SlideShow addSlideShow(SlideShow slideShow) {
        return slideShowRepository.save(slideShow);
    }

    @Override
    public SlideShow getSlideShowById(UUID slideShowId) {
        Optional<SlideShow> optionalSlideShow = slideShowRepository.findById(slideShowId);
        return optionalSlideShow.orElse(null);
    }

    @Override
    public List<SlideShow> getAllSlideShows() {
        return slideShowRepository.findAll();
    }

   

    @Override
    public void deleteSlideShow(UUID slideShowId) {
        slideShowRepository.deleteById(slideShowId);
    }





    @Override   
    public SlideShow updateSlideShow(UUID slideShowId, SlideShow updatedSlideShow) {
        SlideShow existingSlideShow = slideShowRepository.findById(slideShowId).orElse(null);
    
        if (existingSlideShow != null) {
            // Lưu đường dẫn của hình ảnh cũ
            String oldImageUrl = existingSlideShow.getImageUrl();
    
            // Kiểm tra xem có đường dẫn hình ảnh mới được cung cấp hay không
            String updatedImageUrl = updatedSlideShow.getImageUrl();
            if (updatedImageUrl != null) {
                existingSlideShow.setImageUrl(updatedImageUrl); // Cập nhật đường dẫn hình ảnh mới
            }
            
            existingSlideShow.setDescriptionUrl(updatedSlideShow.getDescriptionUrl());
            // Lưu danh mục đã cập nhật
            SlideShow updatedSlideShowResult = slideShowRepository.save(existingSlideShow);
    if (updatedImageUrl != null && !updatedImageUrl.equals(oldImageUrl)) {
        deleteImageFile(oldImageUrl);
    }
    
            return updatedSlideShowResult;
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


    //
    private final String UPLOAD_DIR = "D:/TTTN/webtttn (1)/webtttn/src/main/resources/static/upload/";

    @Override
    public SlideShow saveImage(UUID slideShowId, MultipartFile file, int i) {
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
            SlideShow slideshow = slideShowRepository.findById(slideShowId)
                    .orElseThrow(() -> new RuntimeException("Slideshow not found"));
            // Gán giá trị đường dẫn vào trường image của đối tượng Category
            slideshow.setImageUrl(newFileName);
            // Lưu lại đối tượng Category đã được cập nhật
            slideShowRepository.save(slideshow);

        } catch (IOException e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage(), e);
        }
        return null;
    }

    

    @Override
    public List<SlideShow> saveImages(UUID slideShowId, MultipartFile[] files) {
        List<SlideShow> slideshows = new ArrayList<>();
        int i = 0;
        for (MultipartFile file : files) {
            slideshows.add(saveImage(slideShowId, file, i));
            i++;
        }
        return slideshows;
    }
}
