package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.entity.Category;
import com.webtttn.exercise03.entity.Gallery;

public interface CategoryService {

    Category addCategory(Category category);
    
    Category saveImage(UUID productId, MultipartFile file,int i);
    
    List<Category> saveImages(UUID productId, MultipartFile[] files);

    Category getCategoryById(UUID categoryId);

    List<Category> getAllCategories();

    Category updateCategory(UUID categoryId, Category category);

    void deleteCategory(UUID categoryId);

    List<Category> getCategoriesByParentId(UUID parentId);

    List<Category> getRootCategories();

    void deleteImageFile(String imagePath);
}
