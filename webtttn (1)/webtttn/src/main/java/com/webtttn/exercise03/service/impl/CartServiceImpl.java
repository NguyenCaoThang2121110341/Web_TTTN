package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtttn.exercise03.entity.Cart;
import com.webtttn.exercise03.repository.CartRepository;
import com.webtttn.exercise03.service.CartService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart addCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart getCartById(UUID cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        return optionalCart.orElse(null);
    }

    @Override
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @Override
    public Cart updateCart(UUID cartId, Cart updatedCart) {
        Cart existingCart = cartRepository.findById(cartId).orElse(null);

        if (existingCart != null) {
          
            // You may need to handle cartItems here
            return cartRepository.save(existingCart);
        }

        return null;
    }

    @Override
    public void deleteCart(UUID cartId) {
        cartRepository.deleteById(cartId);
    }
}
