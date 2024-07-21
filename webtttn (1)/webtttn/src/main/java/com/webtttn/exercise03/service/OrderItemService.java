package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.webtttn.exercise03.entity.OrderItem;

public interface OrderItemService {
    OrderItem addOrderItem(OrderItem orderItem);

    OrderItem getOrderItemById(UUID orderItemId);

    List<OrderItem> getAllOrderItems();

    OrderItem updateOrderItem(UUID orderItemId, OrderItem updatedOrderItem);

    void deleteOrderItem(UUID orderItemId);
}