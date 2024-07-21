package com.webtttn.exercise03.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tags")
public class Tag extends DateTime  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @Column(name = "tag_name")
    private String name;

    @Column(name = "icon")
    private String icon;

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private List<Product> products;

    // @ManyToOne
    // @JoinColumn(name = "created_by")
    // private StaffAccount createdBy;

    // @ManyToOne
    // @JoinColumn(name = "updated_by")
    // private StaffAccount updatedBy;
    // @ManyToMany(mappedBy = "tags")
    // private Set<Product> products;

}
