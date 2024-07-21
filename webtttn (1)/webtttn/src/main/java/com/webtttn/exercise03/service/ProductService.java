package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.webtttn.exercise03.entity.Product;

import jakarta.websocket.Decoder.Binary;

public interface ProductService {
    Product addProduct(Product product);

    Product getProductById(UUID productId);

    List<Product> getAllProducts();

    Product updateProduct(UUID productId, Product updatedProduct);

    void deleteProduct(UUID productId);
    List<Product> getProductsByTagName(String tagName);
    List<Product> getProductsByCategoryName(String categoryName);
    Product updateProduct(Product product);

    
}
