package com.webtttn.exercise03.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.entity.SlideShow;
import com.webtttn.exercise03.service.SlideShowService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/slideshows")
public class SlideShowController {

    @Autowired
    private SlideShowService slideShowService;

    @GetMapping
    public ResponseEntity<List<SlideShow>> getAllSlideShows() {
        List<SlideShow> slideShows = slideShowService.getAllSlideShows();
        return ResponseEntity.ok(slideShows);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SlideShow> getSlideShowById(@PathVariable("id") UUID slideShowId) {
        SlideShow slideShow = slideShowService.getSlideShowById(slideShowId);
        if (slideShow != null) {
            return ResponseEntity.ok(slideShow);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<SlideShow> addSlideShow(@RequestBody SlideShow slideShow) {
        SlideShow addedSlideShow = slideShowService.addSlideShow(slideShow);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedSlideShow);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SlideShow> updateSlideShow(@PathVariable("id") UUID slideShowId,
            @RequestBody SlideShow updatedSlideShow) {
        SlideShow slideShow = slideShowService.updateSlideShow(slideShowId, updatedSlideShow);
        if (slideShow != null) {
            return ResponseEntity.ok(slideShow);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private final String UPLOAD_DIR = "./src/main/resources/static/upload/";


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlideShow(@PathVariable("id") UUID slideShowId) {
        slideShowService.deleteSlideShow(slideShowId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/image/{fileName:.+}")
    public ResponseEntity<String> getImageUrl(@PathVariable String fileName) {
        try {
            String imageUrl = "/upload/slideshows/" + fileName; // Tạo đường dẫn URL của ảnh
            return ResponseEntity.ok().body(imageUrl); // Trả về URL của ảnh
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/uploadImage/{slideShowId}")
    public SlideShow uploadImage(@PathVariable UUID slideShowId, @RequestParam("file") MultipartFile file) {
        return slideShowService.saveImage(slideShowId, file,0);
    }

    @PostMapping("/uploadImages/{slideShowId}")
    public List<SlideShow> uploadImages(@PathVariable UUID slideShowId, @RequestParam("files") MultipartFile[] files) {
        return slideShowService.saveImages(slideShowId, files);
    }
}
