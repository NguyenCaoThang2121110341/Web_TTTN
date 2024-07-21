package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtttn.exercise03.entity.CartProd;
import com.webtttn.exercise03.repository.CartProdRepository;
import com.webtttn.exercise03.service.CartprodService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CartprodServiceImpl implements CartprodService {

    @Autowired
    private CartProdRepository CartProdRepository;

    @Override
    public CartProd addCartProd(CartProd CartProd) {
        return CartProdRepository.save(CartProd);
    }

    @Override
    public CartProd getCartProdById(UUID CartProdId) {
        Optional<CartProd> optionalCartProd = CartProdRepository.findById(CartProdId);
        return optionalCartProd.orElse(null);
    }

    @Override
    public List<CartProd> getAllCartProds() {
        return CartProdRepository.findAll();
    }

    @Override
    public CartProd updateCartProd(UUID CartProdId, CartProd updatedCartProd) {
        CartProd existingCartProd = CartProdRepository.findById(CartProdId).orElse(null);

        if (existingCartProd != null) {
            existingCartProd.setCart(updatedCartProd.getCart());
            existingCartProd.setProduct(updatedCartProd.getProduct());
            existingCartProd.setQuantity(updatedCartProd.getQuantity());
            return CartProdRepository.save(existingCartProd);
        }

        return null;
    }

    @Override
    public void deleteCartProd(UUID CartProdId) {
        CartProdRepository.deleteById(CartProdId);
    }
}
