package com.example.restaurant_service.service;

import com.example.restaurant_service.entity.Restaurant;
import com.example.restaurant_service.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Optional<Restaurant> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }

    public Optional<Restaurant> getRestaurantByName(String name) {
        return restaurantRepository.findByName(name);
    }

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Optional<Restaurant> updateRestaurant(Restaurant restaurant) {
        if (!restaurantRepository.existsById(restaurant.getId())) {
            return Optional.empty();
        }
        return Optional.of(restaurantRepository.save(restaurant));
    }

    public Optional<Restaurant> deleteRestaurant(Long id) {
        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        restaurant.ifPresent(r -> restaurantRepository.deleteById(id));
        return restaurant;
    }
}
