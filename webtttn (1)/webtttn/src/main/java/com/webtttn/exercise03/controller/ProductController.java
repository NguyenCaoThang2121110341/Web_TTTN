package com.webtttn.exercise03.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.webtttn.exercise03.DTOs.ProductDTO;
import com.webtttn.exercise03.entity.Product;
import com.webtttn.exercise03.service.ProductService;

import jakarta.websocket.Decoder.Binary;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin({"http://localhost:3000", "http://localhost:3001"})

@RequestMapping("api/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @GetMapping("/tag/{tagName}")
    public ResponseEntity<List<ProductDTO>> getProductsByTagName(@PathVariable("tagName") String tagName) {
        List<Product> products = productService.getProductsByTagName(tagName);
        if (products != null && !products.isEmpty()) {
            List<ProductDTO> productDTOs = products.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(productDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/categories/{categoryName}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategoryName(@PathVariable("categoryName") String categoryName) {
        List<Product> products = productService.getProductsByCategoryName(categoryName);
        if (products != null && !products.isEmpty()) {
            List<ProductDTO> productDTOs = products.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(productDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductDTO> productDTOs = products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") UUID productId) {
        Product product = productService.getProductById(productId);
        if (product != null) {
            ProductDTO productDTO = convertToDTO(product);
            return ResponseEntity.ok(productDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        Product addedProduct = productService.addProduct(product);
        ProductDTO addedProductDTO = convertToDTO(addedProduct);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedProductDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable("id") UUID productId,
            @RequestBody ProductDTO updateProductDTO) {
        Product product = convertToEntity(updateProductDTO);
        Product updatedProduct = productService.updateProduct(productId, product);
        if (updatedProduct != null) {
            ProductDTO updatedProductDTO = convertToDTO(updatedProduct);
            return ResponseEntity.ok(updatedProductDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") UUID productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }
    

    // Phương thức chuyển đổi từ Entity sang DTO
    private ProductDTO convertToDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        BeanUtils.copyProperties(product, productDTO);
        return productDTO;
    }

    // Phương thức chuyển đổi từ DTO sang Entity
    private Product convertToEntity(ProductDTO productDTO) {
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        return product;
    }
}
