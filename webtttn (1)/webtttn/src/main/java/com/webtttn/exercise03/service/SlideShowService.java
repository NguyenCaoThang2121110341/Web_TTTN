package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.entity.SlideShow;

public interface SlideShowService {


    void deleteImageFile(String imageUrl);

    SlideShow saveImage(UUID slideShowId, MultipartFile file, int i);
    
    List<SlideShow> saveImages(UUID slideShowId, MultipartFile[] files);

    SlideShow addSlideShow(SlideShow slideShow);

    SlideShow getSlideShowById(UUID slideShowId);

    List<SlideShow> getAllSlideShows();

    SlideShow updateSlideShow(UUID slideShowId, SlideShow updatedSlideShow);

    void deleteSlideShow(UUID slideShowId);
}
