package com.example.restaurant_service.service;

import com.example.restaurant_service.entity.Plat;
import com.example.restaurant_service.entity.Restaurant;
import com.example.restaurant_service.repository.PlatRepository;
import com.example.restaurant_service.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlatService {

    private final PlatRepository platRepository;
    private final RestaurantRepository restaurantRepository;

    public List<Plat> getAllPlats() {
        return platRepository.findAll();
    }

    public Optional<Plat> getPlatById(Long id) {
        return platRepository.findById(id);
    }

    public List<Plat> getPlatsByRestaurant(Long restaurantId) {
        return platRepository.findByRestaurantId(restaurantId);
    }

    public Optional<Plat> getPlatByName(String name) {
        return platRepository.findByName(name);
    }

    public Optional<Plat> createPlat(Long restaurantId, Plat plat) {
        Optional<Restaurant> restaurantOpt = restaurantRepository.findById(restaurantId);
        if (restaurantOpt.isEmpty()) {
            return Optional.empty();
        }
        plat.setId(null);
        plat.setRestaurant(restaurantOpt.get());
        return Optional.of(platRepository.save(plat));
    }

    public Optional<Plat> updatePlat(Long id, Plat platDetails) {
        return platRepository.findById(id).map(existing -> {
            existing.setName(platDetails.getName());
            existing.setDescription(platDetails.getDescription());
            existing.setPrice(platDetails.getPrice());
            existing.setImageUrl(platDetails.getImageUrl());
            existing.setAvailable(platDetails.isAvailable());
            existing.setAllergenes(platDetails.getAllergenes());

            return platRepository.save(existing);
        });
    }

    public boolean deletePlat(Long id) {
        if (!platRepository.existsById(id)) {
            return false;
        }
        platRepository.deleteById(id);
        return true;
    }
}
