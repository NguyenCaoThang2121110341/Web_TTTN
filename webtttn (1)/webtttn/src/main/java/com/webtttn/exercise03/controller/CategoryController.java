package com.webtttn.exercise03.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.webtttn.exercise03.DTOs.CategoryDTO;
import com.webtttn.exercise03.DTOs.ProductDTO;
import com.webtttn.exercise03.entity.Category;
import com.webtttn.exercise03.entity.Gallery;
import com.webtttn.exercise03.entity.Product;
import com.webtttn.exercise03.service.CategoryService;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin({"http://localhost:3000", "http://localhost:3001"})


@RequestMapping("/api/categories")
public class CategoryController {                            

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @GetMapping("/root")
    public ResponseEntity<List<Category>> getRootCategories() {
        List<Category> rootCategories = categoryService.getRootCategories();
        if (rootCategories != null && !rootCategories.isEmpty()) {
            return new ResponseEntity<>(rootCategories, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<Category>> getCategoriesByParentId(@PathVariable("parentId") UUID parentId) {
        List<Category> categories = categoryService.getCategoriesByParentId(parentId);
        if (categories != null && !categories.isEmpty()) {
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") UUID id) {
        Category category = categoryService.getCategoryById(id);
        if (category != null) {
            return new ResponseEntity<>(category, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.addCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable("id") UUID id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //



     private final String UPLOAD_DIR = "./src/main/resources/static/upload/categories/";


    @GetMapping("/image/{fileName:.+}")
    public ResponseEntity<String> getImageUrl(@PathVariable String fileName) {
        try {
            String imageUrl = "/upload/categories/" + fileName; // Tạo đường dẫn URL của ảnh
            return ResponseEntity.ok().body(imageUrl); // Trả về URL của ảnh
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/uploadImage/{categoryId}")
    public Category uploadImage(@PathVariable UUID categoryId, @RequestParam("file") MultipartFile file) {
        return categoryService.saveImage(categoryId, file,0);
    }

    @PostMapping("/uploadImages/{categoryId}")
    public List<Category> uploadImages(@PathVariable UUID categoryId, @RequestParam("files") MultipartFile[] files) {
        return categoryService.saveImages(categoryId, files);
    }
    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable("categoryId") UUID categoryId, @RequestBody Category updatedCategory) {
        Category category = categoryService.updateCategory(categoryId, updatedCategory);
        if (category != null) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}