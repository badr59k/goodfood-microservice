package com.example.restaurant_service.repository;

import com.example.restaurant_service.entity.Avis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvisRepository extends JpaRepository<Avis,Long> {
}
