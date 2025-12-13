package com.example.restaurant_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String address;

    private String city;

    private String zip;

    private String email;

    private String phone;

    @ManyToMany
    @JoinTable(
        name="restaurant_category",
        joinColumns = @JoinColumn(name="restaurant_id"),
        inverseJoinColumns = @JoinColumn(name="category_id")
    )
    private List<Category> categories;

    private String description;

    @ElementCollection
    @CollectionTable(
        name = "restaurant_service_time",
        joinColumns = @JoinColumn(name = "restaurant_id")
    )
    private List<String> serviceTime;


    @OneToMany(
            mappedBy = "restaurant",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Plat> plats;

    private String image;

    @OneToMany(
            mappedBy = "restaurant",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Avis> avis;

    private int note;
}
