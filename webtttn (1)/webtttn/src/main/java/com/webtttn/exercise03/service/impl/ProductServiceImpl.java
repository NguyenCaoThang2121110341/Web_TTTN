package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtttn.exercise03.entity.Category;
import com.webtttn.exercise03.entity.Product;
import com.webtttn.exercise03.entity.Tag;
import com.webtttn.exercise03.repository.CategoryRepository;
import com.webtttn.exercise03.repository.ProductRepository;
import com.webtttn.exercise03.repository.TagRepository;
import com.webtttn.exercise03.service.GalleryService;
import com.webtttn.exercise03.service.ProductService;

import jakarta.websocket.Decoder.Binary;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private GalleryService galleryService;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Product> getProductsByTagName(String tagName) {
        Tag tag = tagRepository.findByName(tagName);
        if (tag != null) {
            List<Product> products = tag.getProducts();
            // Sắp xếp danh sách sản phẩm theo id lớn hơn
            Collections.sort(products, Comparator.comparing(Product::getId).reversed());
            return products;
        }
        return null;
    }
    @Override
    public List<Product> getProductsByCategoryName(String categoryName) {
        Category cat = categoryRepository.findByCategoryName(categoryName);
        if (cat != null) {
            List<Product> products = cat.getProducts();
            // Sắp xếp danh sách sản phẩm theo id lớn hơn
            Collections.sort(products, Comparator.comparing(Product::getId).reversed());
            return products;
        }
        return null;
    }

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product getProductById(UUID productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.orElse(null);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Product updateProduct(UUID productId, Product updatedProduct) {
        Product existingProduct = productRepository.findById(productId).orElse(null);

        if (existingProduct != null) {
            existingProduct.setProductName(updatedProduct.getProductName());
            existingProduct.setSku(updatedProduct.getSku());
            existingProduct.setRegularPrice(updatedProduct.getRegularPrice());
            existingProduct.setDiscountPrice(updatedProduct.getDiscountPrice());
            existingProduct.setQuantity(updatedProduct.getQuantity());
            existingProduct.setShortDescription(updatedProduct.getShortDescription());
            existingProduct.setProductDescription(updatedProduct.getProductDescription());
            existingProduct.setCategories(updatedProduct.getCategories());
            existingProduct.setTags(updatedProduct.getTags());
            existingProduct.setProductWeight(updatedProduct.getProductWeight());
            existingProduct.setProductNote(updatedProduct.getProductNote());
            existingProduct.setPublished(updatedProduct.getPublished());
            // existingProduct.setCreatedBy(updatedProduct.getCreatedBy());
            // existingProduct.setUpdatedBy(updatedProduct.getUpdatedBy());
            // You may need to handle other relationships here
            return productRepository.save(existingProduct);
        }

        return null;
    }

    @Override
    public void deleteProduct(UUID productId) {
        galleryService.deleteGalleryByProductId(productId); // Gọi phương thức để xóa các gallery dựa trên productId
        productRepository.deleteById(productId);
    }
    @Override
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

}
