package com.webtttn.exercise03.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "galleries")
public class Gallery extends DateTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @JsonIgnore
    private Product product;

    @Column(name = "image_path") // BLOB là kiểu dữ liệu nhị phân
    private String imagePath;

    // @Column(name = "display_order")
    // private int displayOrder;

    // @ManyToOne
    // @JoinColumn(name = "created_by")
    // private StaffAccount createdBy;

    // @ManyToOne
    // @JoinColumn(name = "updated_by")
    // private StaffAccount updatedBy;
}
