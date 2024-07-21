package com.webtttn.exercise03.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product extends DateTime {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "id")
        private UUID id;

        @Column(name = "product_name", length = 255)
        private String productName;

        @Column(name = "sku", length = 255)
        private String sku;

        @Column(name = "regular_price", columnDefinition = "numeric")
        private BigDecimal regularPrice;

        @Column(name = "discount_price", columnDefinition = "numeric")
        private BigDecimal discountPrice;

        @Column(name = "quantity")
        private int quantity;

        @Column(name = "short_description", length = 165)
        private String shortDescription;

        @Column(name = "product_description")
        private String productDescription;

        @Column(name = "product_weight", columnDefinition = "numeric")
        private BigDecimal productWeight;

        @Column(name = "product_note")
        private String productNote;

        @Column(name = "published")
        private Boolean published;

        // @ManyToOne
        // @JoinColumn(name = "created_by")
        // private StaffAccount createdBy;
    
        // @ManyToOne
        // @JoinColumn(name = "updated_by")
        // private StaffAccount updatedBy;
        ///5

        ///5
        @ManyToMany
        @JoinTable(name = "product_categories", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
        private Set<Category> categories = new HashSet<>();
        ////5
        @ManyToMany
        @JoinTable(name = "product_tags", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
        private Set<Tag> tags = new HashSet<>();
        
        @OneToMany(mappedBy = "product")
        @JsonIgnore
        private Set<Gallery> galleries = new HashSet<>();
     

      
    
        ///5
        @OneToMany(mappedBy = "product")
        private Set<CartProd> CartProd;
        ////5
 
        ///5
    


}
