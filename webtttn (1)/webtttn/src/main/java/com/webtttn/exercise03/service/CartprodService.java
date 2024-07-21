package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.webtttn.exercise03.entity.CartProd;

public interface CartprodService {
    CartProd addCartProd(CartProd CartProd);

    CartProd getCartProdById(UUID CartProdId);

    List<CartProd> getAllCartProds();

    CartProd updateCartProd(UUID CartProdId, CartProd updatedCartProd);

    void deleteCartProd(UUID CartProdId);
}
