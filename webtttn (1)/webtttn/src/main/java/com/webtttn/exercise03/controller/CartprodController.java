package com.webtttn.exercise03.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.webtttn.exercise03.entity.CartProd;
import com.webtttn.exercise03.service.CartprodService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/cart-prod")
public class CartprodController {

    @Autowired
    private CartprodService CartProdService;

    @GetMapping
    public ResponseEntity<List<CartProd>> getAllCartProds() {
        List<CartProd> CartProds = CartProdService.getAllCartProds();
        return ResponseEntity.ok(CartProds);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartProd> getCartProdById(@PathVariable("id") UUID CartProdId) {
        CartProd CartProd = CartProdService.getCartProdById(CartProdId);
        if (CartProd != null) {
            return ResponseEntity.ok(CartProd);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CartProd> addCartProd(@RequestBody CartProd CartProd) {
        CartProd addedCartProd = CartProdService.addCartProd(CartProd);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedCartProd);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartProd> updateCartProd(@PathVariable("id") UUID CartProdId,
            @RequestBody CartProd updatedCartProd) {
        CartProd CartProd = CartProdService.updateCartProd(CartProdId, updatedCartProd);
        if (CartProd != null) {
            return ResponseEntity.ok(CartProd);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartProd(@PathVariable("id") UUID CartProdId) {
        CartProdService.deleteCartProd(CartProdId);
        return ResponseEntity.noContent().build();
    }
}
