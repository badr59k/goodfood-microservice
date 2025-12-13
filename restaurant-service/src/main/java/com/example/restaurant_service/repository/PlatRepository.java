package com.example.restaurant_service.repository;

import com.example.restaurant_service.entity.Plat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PlatRepository extends JpaRepository<Plat,Long> {

    List<Plat> findByRestaurantId(Long restaurantId);

    Optional<Plat> findByName(String name);
}
