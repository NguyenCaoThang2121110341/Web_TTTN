package com.webtttn.exercise03.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "topic")
public class Topic extends DateTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;
    

    @Column(name = "name")
    private String Name;

    @Column(name = "description")
    private String Description;


    @Column(name = "registered_at")
    private LocalDateTime registeredAt;

    @Column(name = "image_url")
    private String imageUrl;
    
    @OneToMany(mappedBy = "topic")
    @JsonIgnore
    private Set<Post> Post;

  
}
