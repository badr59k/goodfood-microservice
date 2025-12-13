package com.example.restaurant_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.List;

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

    @ManyToMany
    @JoinTable(
        name="plat_allergene",
        joinColumns = @JoinColumn(name="plat_id"),
        inverseJoinColumns = @JoinColumn(name="allergene_id")
    )
    private List<Allergene> allergenes;

    private String imageUrl;

    private boolean available = true;

}
