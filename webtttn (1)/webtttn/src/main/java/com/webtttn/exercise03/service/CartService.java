package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.webtttn.exercise03.entity.Cart;

public interface CartService {
    Cart addCart(Cart cart);

    Cart getCartById(UUID cartId);

    List<Cart> getAllCarts();

    Cart updateCart(UUID cartId, Cart updatedCart);

    void deleteCart(UUID cartId);
}
