package com.webtttn.exercise03.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart_prod")
public class CartProd {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    // Marking cartId as not insertable and updatable
    @Column(name = "cart_id", insertable = false, updatable = false)
    private UUID cartId;

    @ManyToOne
    @JoinColumn(name = "cart_id") // Specify the foreign key column
    private Cart cart;

    @Column(name = "product_id", insertable = false, updatable = false)
    private UUID productId;

    @ManyToOne
    @JoinColumn(name = "product_id") // Specify the foreign key column
    private Product product;

    @Column(name = "quantity")
    private int quantity;
}
