package com.webtttn.exercise03.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.webtttn.exercise03.entity.Post;
import com.webtttn.exercise03.entity.Topic;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private UUID id;
    // private String productName;
    // private BigDecimal regularPrice;
    // private BigDecimal discountPrice;
    // private String productDescription;
    // private int quantity;
    // private Boolean published;
    // private String shortDescription;
    // private BigDecimal productWeight;
    // private String productNote;
    // private String sku;
    private Topic topic;
    private String Name;
    private String Description;
    private LocalDateTime registeredAt;
    private String imageUrl;
    // private Set<Category> categories = new HashSet<>();
    // private Set<Tag> tags = new HashSet<>();
    // private Set<Gallery> galleries  = new HashSet<>();
}
