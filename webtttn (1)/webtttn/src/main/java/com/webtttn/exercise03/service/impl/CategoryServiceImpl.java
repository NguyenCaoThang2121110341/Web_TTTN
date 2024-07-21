package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.entity.Category;
import com.webtttn.exercise03.repository.CategoryRepository;
import com.webtttn.exercise03.service.CategoryService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        if (category.getId() != null) {
            category.setId(null);
        }
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategoryById(UUID categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        return optionalCategory.orElse(null);
    }

    @Override
    public List<Category> getAllCategories() {
        // Sort sort = Sort.by(Sort.Direction.ASC, "name");
        return categoryRepository.findAllByOrderByCreatedAtDesc();
    }

    // @Override
    // public List<Category> getRootCategories() {
    //     return categoryRepository.findRootCategories();
    // }

    @Override
    public List<Category> getCategoriesByParentId(UUID parentId) {
        return categoryRepository.findByParentId(parentId);
    }


    @Override
    public Category updateCategory(UUID categoryId, Category updatedCategory) {
        Category existingCategory = categoryRepository.findById(categoryId).orElse(null);
    
        if (existingCategory != null) {
            String oldImagePath = existingCategory.getImagePath();
            String newImagePath = updatedCategory.getImagePath();
            if (newImagePath != null) {
                existingCategory.setImagePath(newImagePath);
            }
            
            existingCategory.setCategoryName(updatedCategory.getCategoryName());
            existingCategory.setParentId(updatedCategory.getParentId());
            existingCategory.setCategoryDescription(updatedCategory.getCategoryDescription());
            existingCategory.setIcon(updatedCategory.getIcon());
            existingCategory.setActive(updatedCategory.getActive());
    
            Category updatedCategoryResult = categoryRepository.save(existingCategory);
            if (newImagePath != null && !newImagePath.equals(oldImagePath)) {
                deleteImageFile(oldImagePath);
            }
    
            return updatedCategoryResult;
        }
    
        return null;
    }
    @Override
    public void deleteCategory(UUID categoryId) {
        Category existingCategory = categoryRepository.findById(categoryId).orElse(null);
        if (existingCategory != null) {
            String imagePath = existingCategory.getImagePath();
            deleteImageFile(imagePath);
            categoryRepository.deleteById(categoryId);
        }
    }

    // xóa hình ảnh của category 1h23 18-5
    @Override
    public void deleteImageFile(String imagePath) {
        if (imagePath != null && !imagePath.isEmpty()) {
            Path imageFilePath = Paths.get(UPLOAD_DIR, imagePath);
            try {
                Files.deleteIfExists(imageFilePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    //
    private final String UPLOAD_DIR = "D:/a/webtttn/webtttn/src/main/resources/static/upload/";

/**
 * Saves the image file associated with a category.
 *
 * @param categoryId The ID of the category.
 * @param file       The image file to be saved.
 * @param index      The index of the file (used for unique file naming).
 * @return The updated category object.
 */
@Override
public Category saveImage(UUID categoryId, MultipartFile file, int index) {
    try {
        String originalFileName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String newFileName = index + uuid + fileExtension;
        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(newFileName);
        Files.write(filePath, file.getBytes());

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setImagePath(newFileName);
        categoryRepository.save(category);

    } catch (IOException e) {
        throw new RuntimeException("Could not store the file. Error: " + e.getMessage(), e);
    }
    return null;
}

    @Override
    public List<Category> saveImages(UUID productId, MultipartFile[] files) {
        List<Category> categories = new ArrayList<>();
        int i = 0;
        for (MultipartFile file : files) {
            categories.add(saveImage(productId, file, i));
            i++;
        }
        return categories;
    }

    @Override
    public List<Category> getRootCategories() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getRootCategories'");
    }


}