package com.example.restaurant_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class Plat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name =  "restaurant_id")
    private Restaurant restaurant;

    private BigDecimal price;

    private String imageUrl;

    private boolean available = true;

}
