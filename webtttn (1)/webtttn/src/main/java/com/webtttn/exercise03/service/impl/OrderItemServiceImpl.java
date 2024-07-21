package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtttn.exercise03.entity.OrderItem;
import com.webtttn.exercise03.entity.Product;
import com.webtttn.exercise03.repository.OrderItemRepository;
import com.webtttn.exercise03.service.OrderItemService;
import com.webtttn.exercise03.service.ProductService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductService productService;

   @Override
    public OrderItem addOrderItem(OrderItem orderItem) {
        // Lưu OrderItem
        OrderItem savedOrderItem = orderItemRepository.save(orderItem);

        // Cập nhật số lượng sản phẩm
        updateProductQuantity(orderItem);

        return savedOrderItem;
    }

    private void updateProductQuantity(OrderItem orderItem) {
        // Lấy sản phẩm
        Product product = productService.getProductById(orderItem.getProductId());

        // Cập nhật số lượng sản phẩm
        product.setQuantity(product.getQuantity() - orderItem.getQuantity());

        // Lưu sản phẩm đã cập nhật
        productService.updateProduct(product);
    }

    @Override
    public OrderItem getOrderItemById(UUID orderItemId) {
        Optional<OrderItem> optionalOrderItem = orderItemRepository.findById(orderItemId);
        return optionalOrderItem.orElse(null);
    }

    @Override
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    @Override
    public OrderItem updateOrderItem(UUID orderItemId, OrderItem updatedOrderItem) {
        OrderItem existingOrderItem = orderItemRepository.findById(orderItemId).orElse(null);

        if (existingOrderItem != null) {
            existingOrderItem.setProduct(updatedOrderItem.getProduct());
            existingOrderItem.setOrder(updatedOrderItem.getOrder());
            existingOrderItem.setPrice(updatedOrderItem.getPrice());
            existingOrderItem.setQuantity(updatedOrderItem.getQuantity());
            existingOrderItem.setShippingId(updatedOrderItem.getShippingId());
            return orderItemRepository.save(existingOrderItem);
        }

        return null;
    }

    @Override
    public void deleteOrderItem(UUID orderItemId) {
        orderItemRepository.deleteById(orderItemId);
    }
    
}