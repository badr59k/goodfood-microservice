package com.example.restaurant_service.repository;

import com.example.restaurant_service.entity.Allergene;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface AllergeneRepository extends JpaRepository<Allergene,Long> {
}
